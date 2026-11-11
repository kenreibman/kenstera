"""
Builds and renders the Kenstera monstera in Blender (Cycles, path traced).

    blender --background --python scripts/blender/monstera.py -- \
        --out public/plant/hero.png --w 2400 --h 1800 --samples 384

Everything is procedural: leaf silhouettes, veins and relief are generated as
textures with numpy, so no external assets are needed. Lighting is three soft
area lights; shadows, translucency and depth of field are physically computed.
"""
import argparse
import math
import os
import sys
import tempfile

import bpy
import numpy as np
from mathutils import Matrix, Vector

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ap = argparse.ArgumentParser()
ap.add_argument("--out", default="//hero.png")
ap.add_argument("--w", type=int, default=1200)
ap.add_argument("--h", type=int, default=900)
ap.add_argument("--samples", type=int, default=96)
ap.add_argument("--tex", type=int, default=2048)
ap.add_argument("--cam", default="hero", choices=["hero", "portrait", "close"])
args = ap.parse_args(argv)

N_VEINS = 6.0
TEX_DIR = tempfile.mkdtemp(prefix="kenstera_leaf_")
rng = np.random.default_rng(11)

# --------------------------------------------------------------------------
# Scene reset
# --------------------------------------------------------------------------
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
col = scene.collection


def socket(node, *names):
    for n in names:
        if n in node.inputs:
            return node.inputs[n]
    raise KeyError(names)


# --------------------------------------------------------------------------
# Procedural leaf textures
# --------------------------------------------------------------------------
def value_noise(res, cells, seed):
    r = np.random.default_rng(seed).random((cells + 1, cells + 1)).astype(np.float32)
    x = np.linspace(0, cells, res, endpoint=False)
    i = x.astype(int)
    f = x - i
    f = f * f * (3 - 2 * f)
    a = r[i][:, i] * (1 - f)[None, :] + r[i][:, i + 1] * f[None, :]
    b = r[i + 1][:, i] * (1 - f)[None, :] + r[i + 1][:, i + 1] * f[None, :]
    return a * (1 - f)[:, None] + b * f[:, None]


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def make_image(name, arr, color):
    h, w = arr.shape[:2]
    img = bpy.data.images.new(name, w, h, alpha=True, float_buffer=False)
    if arr.ndim == 2:
        arr = np.repeat(arr[:, :, None], 3, axis=2)
    rgba = np.concatenate([arr, np.ones((h, w, 1), np.float32)], axis=2).astype(np.float32)
    img.pixels.foreach_set(rgba.ravel())
    # Write to disk and reload: Cycles reads file-backed images reliably in
    # background mode, where purely generated buffers can come through empty.
    path = os.path.join(TEX_DIR, name + ".png")
    img.filepath_raw = path
    img.file_format = "PNG"
    img.save()
    bpy.data.images.remove(img)
    img = bpy.data.images.load(path)
    img.colorspace_settings.name = "sRGB" if color else "Non-Color"
    return img


def leaf_maps(seed, res):
    """Returns (alpha, colour, height) images for one leaf variant."""
    u = -1 + 2 * (np.arange(res) + 0.5) / res
    v = -0.2 + 1.2 * (np.arange(res) + 0.5) / res
    U, V = np.meshgrid(u.astype(np.float32), v.astype(np.float32))
    au = np.abs(U)
    side = (U > 0).astype(int)

    n_lo = value_noise(res, 6, seed)
    n_mid = value_noise(res, 28, seed + 1)
    n_hi = value_noise(res, 160, seed + 2)

    t = np.clip((V + 0.2) / 1.2, 0, 1)
    w = 0.92 * np.maximum(np.sin(np.pi * t ** 0.6), 0) ** 0.8
    w = w * (1 + (n_lo - 0.5) * 0.05)
    rel = au / np.maximum(w, 1e-3)

    f = V - 0.7 * au + 0.3 * U * U
    k = f * N_VEINS
    cid = np.floor(k + 0.5)
    dc = np.abs(k - cid)
    idx = np.clip(cid.astype(int) + 8, 0, 31)
    r = np.random.default_rng(seed + 9)
    hs = r.random((2, 32)).astype(np.float32)[side, idx]
    hh = r.random((2, 32)).astype(np.float32)[side, idx]

    m_out = (w - au) * 0.6
    m_notch = au - 0.9 * (0.02 - V)
    inner = 0.30 + 0.22 * hs
    has_slit = ((cid >= 1) & (cid <= 6) & (hs > 0.12)).astype(np.float32)
    hw = 0.30 * np.sqrt(np.clip((rel - inner) / (1 - inner), 0, 1)) * (0.8 + 0.5 * rel) * has_slit
    m_slit = (dc - hw) / N_VEINS + np.maximum(inner - rel, 0) * 0.5 + (1 - has_slit)
    has_hole = (cid >= 1) & (cid <= 5) & (hh > 0.3)
    e = np.hypot((rel - 0.26) / (0.07 + 0.03 * hh), dc / (0.2 + 0.08 * hs))
    m_hole = np.where(has_hole, (e - 1) * 0.03, 1.0)
    m = np.minimum(np.minimum(m_out, m_notch), np.minimum(m_slit, m_hole))
    px = 1.2 / res * 1.5
    alpha = np.clip(m / px + 0.5, 0, 1).astype(np.float32)
    print("leaf", seed, "coverage", float(alpha.mean()), "terms", float((m_out > 0).mean()), float((m_notch > 0).mean()), float((m_slit > 0).mean()), float((m_hole > 0).mean()))

    # Veins: midrib, laterals, and a faint tertiary network.
    w_mid = 0.030 - 0.022 * np.clip(V, 0, 1)
    midrib = smoothstep(w_mid, w_mid * 0.2, au) * smoothstep(-0.03, 0.04, V)
    dv = (0.5 - dc) / N_VEINS
    lw = 0.0075 * (1 - 0.55 * np.clip(rel, 0, 1))
    lateral = smoothstep(lw, lw * 0.2, dv) * smoothstep(1.02, 0.8, rel) * smoothstep(-0.12, 0.0, V)
    fine = smoothstep(0.42, 0.5, np.abs((k * 5) % 1 - 0.5)) * 0.35
    cross = smoothstep(0.44, 0.5, np.abs((rel * 9 + n_mid * 1.5) % 1 - 0.5)) * 0.2
    veins = np.maximum(midrib, lateral * 0.8)

    height = (
        0.5
        + veins * 0.42
        + np.cos(dc * 2 * np.pi) * 0.10
        + (fine + cross) * 0.035
        + (n_hi - 0.5) * 0.03
        + (n_mid - 0.5) * 0.05
    )
    height = np.clip(height, 0, 1).astype(np.float32)

    shade = 0.25 + 0.55 * n_lo + 0.2 * n_mid
    deep = np.array([0.010, 0.060, 0.022], np.float32)
    mid = np.array([0.030, 0.150, 0.045], np.float32)
    colr = deep[None, None, :] * (1 - shade[:, :, None]) + mid[None, None, :] * shade[:, :, None]
    vein_col = np.array([0.20, 0.36, 0.12], np.float32)
    vmix = (veins * 0.55 + (fine + cross) * 0.12)[:, :, None]
    colr = colr * (1 - vmix) + vein_col[None, None, :] * vmix
    colr = np.clip(colr, 0, 1) ** (1 / 2.2)  # linear → sRGB for an sRGB-tagged image

    return (
        make_image(f"leaf_alpha_{seed}", alpha, False),
        make_image(f"leaf_color_{seed}", colr.astype(np.float32), True),
        make_image(f"leaf_height_{seed}", height, False),
    )


def leaf_material(seed, res):
    alpha_img, color_img, height_img = leaf_maps(seed, res)
    mat = bpy.data.materials.new(f"Leaf_{seed}")
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    N, L = nt.nodes, nt.links

    def tex(img):
        n = N.new("ShaderNodeTexImage")
        n.image = img
        n.extension = "EXTEND"
        return n

    t_col, t_alpha, t_h = tex(color_img), tex(alpha_img), tex(height_img)

    geo = N.new("ShaderNodeNewGeometry")
    under = N.new("ShaderNodeMixRGB")  # paler, matte underside
    under.blend_type = "MIX"
    under.inputs[2].default_value = (0.10, 0.20, 0.09, 1)
    L.new(t_col.outputs["Color"], under.inputs[1])
    back_amt = N.new("ShaderNodeMath")
    back_amt.operation = "MULTIPLY"
    back_amt.inputs[1].default_value = 0.6
    L.new(geo.outputs["Backfacing"], back_amt.inputs[0])
    L.new(back_amt.outputs[0], under.inputs[0])

    bump = N.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.55
    bump.inputs["Distance"].default_value = 0.012
    L.new(t_h.outputs["Color"], bump.inputs["Height"])

    rough = N.new("ShaderNodeMapRange")
    rough.inputs["To Min"].default_value = 0.30
    rough.inputs["To Max"].default_value = 0.50
    L.new(t_h.outputs["Color"], rough.inputs["Value"])

    bsdf = N.new("ShaderNodeBsdfPrincipled")
    L.new(under.outputs[0], socket(bsdf, "Base Color"))
    L.new(rough.outputs[0], socket(bsdf, "Roughness"))
    L.new(bump.outputs["Normal"], socket(bsdf, "Normal"))
    socket(bsdf, "Coat Weight", "Clearcoat").default_value = 0.12
    socket(bsdf, "Coat Roughness", "Clearcoat Roughness").default_value = 0.12
    socket(bsdf, "IOR").default_value = 1.45

    # Light passing through the blade.
    trans = N.new("ShaderNodeBsdfTranslucent")
    tcol = N.new("ShaderNodeMixRGB")
    tcol.blend_type = "MULTIPLY"
    tcol.inputs[0].default_value = 1.0
    tcol.inputs[2].default_value = (0.75, 1.0, 0.25, 1)
    L.new(t_col.outputs["Color"], tcol.inputs[1])
    boost = N.new("ShaderNodeMixRGB")
    boost.blend_type = "ADD"
    boost.inputs[0].default_value = 1.0
    boost.inputs[2].default_value = (0.10, 0.22, 0.03, 1)
    L.new(tcol.outputs[0], boost.inputs[1])
    L.new(boost.outputs[0], trans.inputs["Color"])
    L.new(bump.outputs["Normal"], trans.inputs["Normal"])

    mix_t = N.new("ShaderNodeMixShader")
    mix_t.inputs[0].default_value = 0.16
    L.new(bsdf.outputs[0], mix_t.inputs[1])
    L.new(trans.outputs[0], mix_t.inputs[2])

    clear = N.new("ShaderNodeBsdfTransparent")
    mix_a = N.new("ShaderNodeMixShader")
    L.new(t_alpha.outputs["Color"], mix_a.inputs[0])
    L.new(clear.outputs[0], mix_a.inputs[1])
    L.new(mix_t.outputs[0], mix_a.inputs[2])

    out = N.new("ShaderNodeOutputMaterial")
    L.new(mix_a.outputs[0], out.inputs["Surface"])
    return mat


def simple_material(name, color, rough, coat=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    socket(bsdf, "Base Color").default_value = (*color, 1)
    socket(bsdf, "Roughness").default_value = rough
    socket(bsdf, "Coat Weight", "Clearcoat").default_value = coat
    return mat


# --------------------------------------------------------------------------
# Geometry
# --------------------------------------------------------------------------
def leaf_mesh(name, fold, droop, wave_seed, nu=56, nv=64):
    r = np.random.default_rng(wave_seed)
    ph = r.random(4) * 6.28
    verts, uvs, faces = [], [], []
    for j in range(nv + 1):
        v = -0.2 + 1.2 * j / nv
        for i in range(nu + 1):
            u = -1 + 2 * i / nu
            s = u * 0.55
            x = s
            y = v * 1.15
            z = fold * abs(s) - droop * v * v
            # gentle undulation, stronger toward the margin
            z += 0.035 * math.sin(v * 5.0 + ph[0]) * abs(u) ** 1.5
            z += 0.02 * math.sin(u * 4.0 + v * 3.0 + ph[1]) * abs(u)
            z -= 0.10 * abs(u) ** 3 * (0.4 + 0.6 * max(v, 0))  # margins roll down a little
            verts.append((x, y, z))
            uvs.append(((u + 1) / 2, (v + 0.2) / 1.2))
    for j in range(nv):
        for i in range(nu):
            a = j * (nu + 1) + i
            faces.append((a, a + 1, a + nu + 2, a + nu + 1))
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    uv = me.uv_layers.new(name="UVMap")
    for poly in me.polygons:
        for li in poly.loop_indices:
            uv.data[li].uv = uvs[me.loops[li].vertex_index]
    for p in me.polygons:
        p.use_smooth = True
    me.update()
    return me


def basis(y_axis, z_hint):
    y = y_axis.normalized()
    z = (z_hint - y * z_hint.dot(y)).normalized()
    x = y.cross(z).normalized()
    m = Matrix((x, y, z)).transposed()
    return m.to_4x4()


def add_stem(name, start, end, end_dir, mat, radius):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = radius
    cu.bevel_resolution = 6
    cu.resolution_u = 24
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(1)
    p0, p1 = sp.bezier_points
    lift = (end - start).length * 0.45
    p0.co = start
    p0.handle_left = start - Vector((0, 0, lift))
    p0.handle_right = start + Vector((0, 0, lift))
    p1.co = end
    p1.handle_left = end - end_dir.normalized() * lift
    p1.handle_right = end + end_dir.normalized() * lift
    p0.radius, p1.radius = 1.25, 0.7
    ob = bpy.data.objects.new(name, cu)
    ob.data.materials.append(mat)
    col.objects.link(ob)
    return ob


POT_H = 0.95
POT_R = 0.62
CAM_POS = Vector((0.0, -9.5, 2.3))

stem_mat = simple_material("Stem", (0.035, 0.13, 0.04), 0.35, coat=0.2)
leaf_mats = [leaf_material(seed, args.tex) for seed in (3, 17, 29)]

# (azimuth°, reach, height, size, facing-camera bias, droop, fold)
LEAVES = [
    (-92, 0.55, 2.55, 1.75, 0.95, 0.10, 0.10),   # hero leaf, facing the lens
    (-40, 1.55, 2.05, 1.35, 0.55, 0.20, 0.16),
    (-150, 1.50, 2.20, 1.40, 0.50, 0.22, 0.14),
    (-70, 0.60, 3.75, 1.30, 0.60, 0.16, 0.12),
    (95, 1.30, 3.50, 1.45, 0.10, 0.20, 0.14),
    (-118, 1.05, 1.50, 1.00, 0.70, 0.18, 0.18),
    (-20, 1.00, 1.45, 0.95, 0.60, 0.22, 0.20),
    (60, 1.60, 2.20, 1.20, 0.10, 0.26, 0.16),
    (130, 1.50, 1.90, 1.15, 0.10, 0.24, 0.18),
]

up = Vector((0, 0, 1))
for i, (az, reach, height, size, face, droop, fold) in enumerate(LEAVES):
    a = math.radians(az)
    outward = Vector((math.cos(a), math.sin(a), 0))
    attach = outward * reach + Vector((0, 0, height))
    to_cam = (CAM_POS - attach).normalized()
    normal = (outward * 0.7 + up * 0.55).normalized().lerp(to_cam, face).normalized()
    jitter = Vector((rng.normal(0, 0.12), rng.normal(0, 0.12), 0))
    midrib = (outward * 0.85 - up * 0.55 + jitter).normalized()
    rot = basis(midrib, normal)

    me = leaf_mesh(f"LeafMesh{i}", fold, droop, 100 + i)
    ob = bpy.data.objects.new(f"Leaf{i}", me)
    ob.matrix_world = Matrix.Translation(attach) @ rot @ Matrix.Scale(size, 4)
    ob.data.materials.append(leaf_mats[i % len(leaf_mats)])
    col.objects.link(ob)

    base = Vector((outward.x * 0.12, outward.y * 0.12, POT_H - 0.05))
    add_stem(f"Stem{i}", base, attach, -midrib * 0.6 + outward * 0.4 - up * 0.1, stem_mat, 0.03 * size ** 0.5)

# Pot, soil, backdrop
bpy.ops.mesh.primitive_cone_add(vertices=96, radius1=POT_R * 0.78, radius2=POT_R, depth=POT_H, location=(0, 0, POT_H / 2))
pot = bpy.context.active_object
bpy.ops.object.shade_smooth()
bev = pot.modifiers.new("Bevel", "BEVEL")
bev.width = 0.03
bev.segments = 4
pot.data.materials.append(simple_material("Pot", (0.045, 0.05, 0.045), 0.55))

bpy.ops.mesh.primitive_circle_add(vertices=96, radius=POT_R * 0.96, fill_type="NGON", location=(0, 0, POT_H - 0.04))
bpy.context.active_object.data.materials.append(simple_material("Soil", (0.012, 0.010, 0.008), 0.95))

bpy.ops.mesh.primitive_plane_add(size=80, location=(0, 0, 0))
floor = bpy.context.active_object
floor.data.materials.append(simple_material("Floor", (0.002, 0.007, 0.0045), 0.75))
floor.is_shadow_catcher = True
# --------------------------------------------------------------------------
# Lighting: large soft key, cool rim for edge light and translucency, low fill
# --------------------------------------------------------------------------
def area(name, loc, target, size, power, color):
    li = bpy.data.lights.new(name, "AREA")
    li.shape = "DISK"
    li.size = size
    li.energy = power
    li.color = color
    ob = bpy.data.objects.new(name, li)
    ob.location = loc
    ob.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    col.objects.link(ob)


area("Key", (-5.5, -5.0, 7.5), (0, 0, 2.3), 7.0, 1000, (1.0, 0.96, 0.9))
area("Rim", (4.5, 5.5, 5.5), (0, 0, 2.6), 3.5, 900, (0.82, 1.0, 0.78))
area("Fill", (5.0, -6.0, 3.5), (0, 0, 2.4), 7.0, 45, (0.75, 0.9, 1.0))

world = bpy.data.worlds.new("World")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.002, 0.006, 0.004, 1)
scene.world = world

# --------------------------------------------------------------------------
# Camera
# --------------------------------------------------------------------------
cam_data = bpy.data.cameras.new("Camera")
cam = bpy.data.objects.new("Camera", cam_data)
col.objects.link(cam)
scene.camera = cam
FRAMES = {
    "hero": (Vector((0.0, -11.5, 2.9)), Vector((0, 0, 2.1)), 62, 8.0),
    "portrait": (Vector((0.0, -13.5, 2.9)), Vector((0, 0, 2.1)), 62, 8.0),
    "close": (Vector((0.6, -5.2, 2.5)), Vector((0.1, -0.4, 2.0)), 70, 2.8),
}
pos, look, lens, fstop = FRAMES[args.cam]
cam.location = pos
cam.rotation_euler = (look - pos).to_track_quat("-Z", "Y").to_euler()
cam_data.lens = lens
cam_data.dof.use_dof = True
cam_data.dof.focus_distance = (Vector((0, -0.55, 2.0)) - pos).length
cam_data.dof.aperture_fstop = fstop

# --------------------------------------------------------------------------
# Render settings
# --------------------------------------------------------------------------
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
for kind in ("OPTIX", "CUDA"):
    try:
        prefs.compute_device_type = kind
        prefs.get_devices()
        gpus = [d for d in prefs.devices if d.type == kind]
        if gpus:
            for d in prefs.devices:
                d.use = d.type == kind
            scene.cycles.device = "GPU"
            print("Rendering on", kind, [d.name for d in gpus])
            break
    except Exception as exc:  # no such backend on this machine
        print("skip", kind, exc)

scene.cycles.samples = args.samples
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 10
scene.cycles.transparent_max_bounces = 24
scene.cycles.transmission_bounces = 8
scene.render.resolution_x = args.w
scene.render.resolution_y = args.h
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_depth = "16"
scene.view_settings.view_transform = "AgX"
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except TypeError:
    pass
scene.render.film_transparent = True
scene.render.image_settings.color_mode = "RGBA"
scene.render.filepath = args.out

bpy.ops.render.render(write_still=True)
print("Wrote", scene.render.filepath)

// CPU mirror of the leaf maths in shaders.ts. The camera flies through one of
// the hero leaf's holes, so we need that hole's exact position in leaf space.

const N = 7;

export function outlineW(v: number): number {
  const t = Math.min(1, Math.max(0, (v + 0.2) / 1.2));
  return 0.92 * Math.pow(Math.max(Math.sin(Math.PI * Math.pow(t, 0.6)), 0), 0.8);
}

/** Local-space centre of the hole on lateral cell `cell`, on the given side. */
export function holeLocal(
  cell: number,
  side: 1 | -1,
  fold: number,
  droop: number
): [number, number, number] {
  const target = cell / N;
  let lo = 0, hi = 1;
  for (let i = 0; i < 40; i++) {
    const v = (lo + hi) / 2;
    const u = 0.26 * outlineW(v);
    const f = v - 0.7 * u + 0.3 * u * u;
    if (f < target) lo = v;
    else hi = v;
  }
  const v = (lo + hi) / 2;
  const u = 0.26 * outlineW(v);
  const s = u * 0.55;
  return [side * s, v * 1.15, fold * Math.abs(s) - droop * v * v];
}

/** Grid over u ∈ [-1, 1], v ∈ [-0.2, 1]. Front face is +Z. */
export function buildLeafGrid(nu: number, nv: number) {
  const verts = new Float32Array((nu + 1) * (nv + 1) * 2);
  let p = 0;
  for (let j = 0; j <= nv; j++) {
    for (let i = 0; i <= nu; i++) {
      verts[p++] = (i / nu) * 2 - 1;
      verts[p++] = (j / nv) * 1.2 - 0.2;
    }
  }
  const idx = new Uint16Array(nu * nv * 6);
  p = 0;
  for (let j = 0; j < nv; j++) {
    for (let i = 0; i < nu; i++) {
      const a = j * (nu + 1) + i;
      const b = a + 1;
      const c = a + nu + 1;
      const d = c + 1;
      idx[p++] = a; idx[p++] = b; idx[p++] = c;
      idx[p++] = b; idx[p++] = d; idx[p++] = c;
    }
  }
  return { verts, idx };
}

export function buildStemStrip(segments: number) {
  const verts = new Float32Array((segments + 1) * 4);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    verts[i * 4] = t; verts[i * 4 + 1] = -1;
    verts[i * 4 + 2] = t; verts[i * 4 + 3] = 1;
  }
  return verts;
}

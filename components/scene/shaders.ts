// GLSL ES 3.00 sources for the living-plant scene.
// The leaf silhouette (outline, slits, holes) is evaluated analytically in the
// fragment shader, so one flat grid mesh becomes a fenestrated monstera leaf.
// `leaf-shape.ts` mirrors the outline maths on the CPU for the camera flight.

export const LEAF_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec2 aUv;
uniform mat4 uModel;
uniform mat4 uViewProj;
uniform vec4 uShape; // grow, fold, droop, flutter
uniform float uTime;
uniform float uPhase;
out vec2 vUv;
out vec3 vWorld;
void main(){
  float u = aUv.x, v = aUv.y;
  float s = u * 0.55;
  // Unfurl: the blade starts rolled around its midrib and flattens as it grows.
  float kappa = (1.0 - uShape.x) * 6.5;
  float x = s, z = 0.0;
  if (kappa > 0.001) { x = sin(kappa * s) / kappa; z = (1.0 - cos(kappa * s)) / kappa; }
  z += uShape.y * abs(s);
  z -= uShape.z * v * v;
  float flutter = sin(uTime * 1.3 + uPhase + v * 2.5) * 0.5 + sin(uTime * 2.1 + uPhase * 1.7 + u * 2.0) * 0.5;
  z += uShape.w * flutter * 0.05 * (0.3 + abs(u)) * max(v, 0.0);
  vec4 w = uModel * vec4(x, v * 1.15, z, 1.0);
  vUv = aUv;
  vWorld = w.xyz;
  gl_Position = uViewProj * w;
}`;

export const LEAF_FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec2 vUv;
in vec3 vWorld;
uniform vec3 uCam;
uniform vec3 uKeyDir;
uniform vec3 uBackDir;
uniform vec3 uFog;
uniform vec4 uShape;
uniform float uTime;
uniform float uPhase;
uniform float uLight;
uniform float uBlur;
uniform float uHero;
out vec4 outColor;

const float N = 7.0;

float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h1(i), h1(i + vec2(1, 0)), f.x), mix(h1(i + vec2(0, 1)), h1(i + vec2(1, 1)), f.x), f.y);
}
float outlineW(float v){
  float t = clamp((v + 0.2) / 1.2, 0.0, 1.0);
  return 0.92 * pow(max(sin(3.14159265 * pow(t, 0.6)), 0.0), 0.8);
}

void main(){
  float u = vUv.x, v = vUv.y, au = abs(u), side = sign(u);
  float w = outlineW(v);
  float rel = au / max(w, 1e-3);
  float open = smoothstep(0.55, 1.0, uShape.x);

  // Lateral-vein coordinate: slits and holes sit on integer k, veins between.
  float f = v - 0.7 * au + 0.3 * u * u;
  float k = f * N;
  float id = floor(k + 0.5);
  float dc = abs(k - id);
  float hs = h1(vec2(id, side * 3.0 + uPhase));
  float hh = h1(vec2(id + 17.0, side * 5.0 + uPhase));

  float mOut = (w - au) * 0.6;
  float mNotch = au - 0.9 * (0.02 - v);

  float inner = mix(0.40 + 0.22 * hs, 0.47, uHero);
  float hasSlit = step(0.5, id) * step(id, 6.5) * max(step(0.14, hs), uHero);
  float hw = 0.2 * sqrt(clamp((rel - inner) / (1.0 - inner), 0.0, 1.0)) * (0.8 + 0.5 * rel) * open * hasSlit;
  float mSlit = (dc - hw) / N + max(inner - rel, 0.0) * 0.5 + (1.0 - hasSlit);

  float hasHole = step(0.5, id) * step(id, 5.5) * max(step(0.35, hh), uHero) * open;
  vec2 hr = mix(vec2(0.085, 0.24), vec2(0.105, 0.30), uHero);
  float e = length(vec2((rel - 0.26) / hr.x, dc / hr.y));
  float mHole = mix(1.0, (e - 1.0) * 0.03, hasHole);

  // Analytic anti-aliasing; far leaves get wider edges for a soft-focus look.
  float px = max(fwidth(u), fwidth(v)) * 0.8 * (1.0 + uBlur * 14.0);
  float alpha = clamp(mOut / px + 0.5, 0.0, 1.0)
              * clamp(mNotch / px + 0.5, 0.0, 1.0)
              * clamp(mSlit / px + 0.5, 0.0, 1.0)
              * clamp(mHole / px + 0.5, 0.0, 1.0);
  if (alpha < 0.004) discard;

  // Veins
  float wMid = mix(0.030, 0.008, clamp(v, 0.0, 1.0));
  float midrib = smoothstep(wMid, wMid * 0.25, au) * smoothstep(-0.03, 0.04, v);
  float dv = (0.5 - dc) / N;
  float lw = 0.0075 * (1.0 - 0.55 * rel);
  float lat = smoothstep(lw, lw * 0.2, dv) * smoothstep(1.02, 0.8, rel) * smoothstep(-0.12, 0.0, v);
  float veins = max(midrib, lat * 0.85);
  float fine = smoothstep(0.46, 0.5, abs(fract(k * 5.0) - 0.5)) * 0.5 * (1.0 - uBlur) * (1.0 - smoothstep(0.08, 0.25, fwidth(k * 5.0)));

  // Normal from screen-space derivatives + vein/quilt relief.
  vec3 dx = dFdx(vWorld), dy = dFdy(vWorld);
  vec3 V = normalize(uCam - vWorld);
  vec3 Ng = normalize(cross(dx, dy));
  if (dot(Ng, V) < 0.0) Ng = -Ng;
  float height = veins * 1.0 + cos(dc * 6.2831853) * 0.35 + fine * 0.05;
  vec3 grad = normalize(dx) * dFdx(height) / max(length(dx), 1e-5) + normalize(dy) * dFdy(height) / max(length(dy), 1e-5);
  float topSide = gl_FrontFacing ? 1.0 : 0.0;
  vec3 Nn = normalize(Ng - grad * 0.011 * (1.0 - uBlur) * mix(-1.0, 1.0, topSide));

  // Surface colour
  float n1 = vnoise(vUv * 5.0 + uPhase * 3.1);
  float n2 = vnoise(vUv * 22.0 + uPhase);
  vec3 deep = vec3(0.004, 0.030, 0.016);
  vec3 mid = vec3(0.014, 0.105, 0.042);
  vec3 albedo = mix(deep, mid, 0.35 + 0.5 * n1 + 0.12 * n2);
  albedo = mix(albedo, vec3(0.10, 0.30, 0.11), veins * 0.6);
  vec3 under = vec3(0.030, 0.105, 0.052) * (0.8 + 0.3 * n1);
  albedo = mix(under, albedo, topSide);

  vec3 L = normalize(uKeyDir);
  float ndl = dot(Nn, L);
  float diff = max(ndl * 0.75 + 0.25, 0.0);
  vec3 H = normalize(L + V);
  float ndh = max(dot(Nn, H), 0.0);
  float spec = (pow(ndh, 70.0) * 0.9 + pow(ndh, 9.0) * 0.10) * topSide + pow(ndh, 10.0) * 0.02;
  float fres = pow(1.0 - max(dot(Nn, V), 0.0), 3.0);

  // Backlight shining through the blade; veins are thicker, so they read dark.
  float trans = pow(max(dot(-Nn, normalize(uBackDir)), 0.0), 1.5);
  vec3 transCol = vec3(0.50, 0.95, 0.16) * (1.0 - veins * 0.75) * (0.75 + 0.5 * n1);

  vec3 keyCol = mix(vec3(0.80, 1.00, 0.86), vec3(1.0, 0.97, 0.80), uLight);
  vec3 col = albedo * (0.10 + diff * diff * 1.5) * keyCol;
  col += spec * keyCol * (0.5 + 0.5 * uLight);
  col += fres * vec3(0.10, 0.34, 0.16) * 0.30;
  col += transCol * trans * (0.035 + 0.30 * uLight) * (0.55 + 0.45 * diff);

  // Light travelling the veins: work flowing through the system.
  float pl = fract(rel * 0.9 - uTime * 0.21 + hs * 7.0);
  float pm = fract(v * 1.1 - uTime * 0.16 + uPhase);
  float pulse = exp(-pow((pl - 0.5) * 7.0, 2.0)) * lat + exp(-pow((pm - 0.5) * 6.0, 2.0)) * midrib;
  col += vec3(0.80, 1.00, 0.36) * pulse * (0.9 - 0.4 * uLight) * open * (1.0 - uBlur * 0.6);

  float dist = length(uCam - vWorld);
  float fog = 1.0 - exp(-max(dist - 5.0, 0.0) * 0.10);
  col = mix(col, uFog, clamp(fog, 0.0, 0.92));

  col = 1.0 - exp(-col * 1.55);
  col = pow(col, vec3(1.0 / 2.2));
  outColor = vec4(col, alpha);
}`;

export const STEM_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec2 aPos; // t along stem, side (-1..1)
uniform mat4 uViewProj;
uniform vec3 uP0, uP1, uP2, uCam;
uniform float uWidth;
out float vSide;
out vec3 vWorld;
out float vT;
void main(){
  float t = aPos.x;
  vec3 p = mix(mix(uP0, uP1, t), mix(uP1, uP2, t), t);
  vec3 tan = normalize(2.0 * (1.0 - t) * (uP1 - uP0) + 2.0 * t * (uP2 - uP1));
  vec3 right = normalize(cross(tan, uCam - p));
  p += right * aPos.y * uWidth * (1.25 - 0.6 * t);
  vSide = aPos.y; vWorld = p; vT = t;
  gl_Position = uViewProj * vec4(p, 1.0);
}`;

export const STEM_FRAG = /* glsl */ `#version 300 es
precision highp float;
in float vSide;
in vec3 vWorld;
in float vT;
uniform vec3 uCam, uFog, uKeyDir;
uniform float uLight;
out vec4 outColor;
void main(){
  float r = sqrt(max(1.0 - vSide * vSide, 0.0));
  vec3 col = mix(vec3(0.006, 0.030, 0.015), vec3(0.022, 0.110, 0.045), r * (0.6 + 0.4 * vT));
  col += pow(r, 8.0) * vec3(0.05, 0.13, 0.06) * (0.4 + uLight);
  float dist = length(uCam - vWorld);
  float fog = 1.0 - exp(-max(dist - 5.0, 0.0) * 0.10);
  col = mix(col, uFog, clamp(fog, 0.0, 0.92));
  col = pow(1.0 - exp(-col * 1.55), vec3(1.0 / 2.2));
  float a = smoothstep(1.0, 0.75, abs(vSide)) * smoothstep(1.2, 4.0, dist);
  outColor = vec4(col, a);
}`;

export const BG_VERT = /* glsl */ `#version 300 es
precision highp float;
out vec2 vP;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  vP = p;
  gl_Position = vec4(p * 2.0 - 1.0, 1.0, 1.0);
}`;

export const BG_FRAG = /* glsl */ `#version 300 es
precision highp float;
in vec2 vP;
uniform vec2 uGlow;
uniform float uAspect;
uniform float uLight;
uniform float uTime;
out vec4 outColor;
float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n1(float x){ float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(h1(vec2(i, 3.0)), h1(vec2(i + 1.0, 3.0)), f); }
void main(){
  vec2 p = vP;
  vec3 col = mix(vec3(0.010, 0.036, 0.024), vec3(0.020, 0.078, 0.050), smoothstep(0.0, 1.0, p.y));
  vec2 d = (p - uGlow) * vec2(uAspect, 1.0);
  float r = length(d);
  float ang = atan(d.y, d.x);
  float sa = abs(ang);
  float rays = n1(sa * 7.0 + uTime * 0.05) * n1(sa * 17.0 - uTime * 0.08);
  float glow = exp(-r * r * mix(5.0, 3.4, uLight));
  vec3 sun = mix(vec3(0.30, 0.62, 0.22), vec3(0.86, 0.98, 0.52), uLight);
  col += sun * glow * mix(0.16, 0.42, uLight);
  col += sun * rays * exp(-r * 2.4) * mix(0.05, 0.16, uLight);
  float vig = smoothstep(1.25, 0.25, length((p - 0.5) * vec2(1.1, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col = pow(1.0 - exp(-col * 1.55), vec3(1.0 / 2.2));
  col += (h1(gl_FragCoord.xy + fract(uTime)) - 0.5) / 160.0;
  outColor = vec4(col, 1.0);
}`;

export const MOTE_VERT = /* glsl */ `#version 300 es
precision highp float;
layout(location=0) in vec4 aSeed;
uniform mat4 uViewProj;
uniform float uTime;
uniform float uPx;
out float vA;
void main(){
  vec3 p = (aSeed.xyz - 0.5) * vec3(13.0, 9.0, 12.0) + vec3(0.0, 0.4, -1.5);
  float t = uTime * (0.05 + aSeed.w * 0.07);
  p.y += mod(t * 3.0 + aSeed.w * 9.0, 9.0) - 4.5 - (aSeed.y - 0.5) * 9.0;
  p.x += sin(t * 4.0 + aSeed.w * 40.0) * 0.5;
  p.z += cos(t * 3.0 + aSeed.x * 40.0) * 0.5;
  vec4 clip = uViewProj * vec4(p, 1.0);
  gl_Position = clip;
  gl_PointSize = uPx * (0.5 + aSeed.w) / max(clip.w, 0.3);
  vA = (0.35 + 0.65 * sin(uTime * (0.6 + aSeed.x) + aSeed.w * 30.0) * 0.5 + 0.5) * smoothstep(0.3, 1.5, clip.w);
}`;

export const MOTE_FRAG = /* glsl */ `#version 300 es
precision highp float;
in float vA;
uniform float uLight;
out vec4 outColor;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  outColor = vec4(vec3(0.80, 1.0, 0.45) * a * vA * (0.28 + 0.4 * uLight), 1.0);
}`;

"use client";

import { useEffect, useRef } from "react";
import {
  BG_FRAG, BG_VERT, LEAF_FRAG, LEAF_VERT, MOTE_FRAG, MOTE_VERT, STEM_FRAG, STEM_VERT,
} from "./shaders";
import { buildLeafGrid, buildStemStrip, holeLocal } from "./leaf-shape";
import {
  clamp01, compose, lerp, lookAt, multiply, perspective, smooth, transformDir, transformPoint, v3,
  type Mat4, type Vec3,
} from "./math";

/**
 * The living plant behind the page: a raw-WebGL2 scene (no 3D library).
 *
 *  - Leaves are flat grids; the monstera silhouette, veins and lighting are
 *    computed per pixel, so the whole plant costs a few thousand triangles.
 *  - Scroll drives a camera flight that passes *through* a hole in the hero
 *    leaf, then the canvas sleeps until the closing section brings it back.
 *  - It renders only while a `[data-scene-window]` section is on screen, adapts
 *    its resolution to the device, and holds a single still frame for visitors
 *    who prefer reduced motion.
 */

interface LeafDef {
  pos: Vec3;
  roll: number; // in-plane rotation, degrees (180 = tip down)
  pitch: number;
  yaw: number;
  scale: number;
  delay: number;
  fold: number;
  droop: number;
  hero?: boolean;
}

const DEG = Math.PI / 180;
const BASE: Vec3 = [0.4, -5.2, -1.6];
const HERO_FOLD = 0.07;
const HERO_DROOP = 0.06;

const LEAVES: LeafDef[] = [
  { pos: [1.9, 1.55, 1.2], roll: 170, pitch: -6, yaw: -14, scale: 2.6, delay: 0.15, fold: HERO_FOLD, droop: HERO_DROOP, hero: true },
  { pos: [-2.7, 2.1, -1.6], roll: 202, pitch: 10, yaw: 26, scale: 2.0, delay: 0.5, fold: 0.16, droop: 0.2 },
  { pos: [0.1, 3.0, -2.6], roll: 176, pitch: 22, yaw: -6, scale: 1.9, delay: 0.75, fold: 0.12, droop: 0.26 },
  { pos: [4.3, 0.5, -1.0], roll: 146, pitch: 2, yaw: -38, scale: 1.8, delay: 0.6, fold: 0.2, droop: 0.16 },
  { pos: [-4.2, -0.2, -0.4], roll: 218, pitch: 6, yaw: 42, scale: 1.7, delay: 0.9, fold: 0.18, droop: 0.2 },
  { pos: [-1.2, 0.9, -3.8], roll: 186, pitch: 14, yaw: 10, scale: 2.3, delay: 1.0, fold: 0.1, droop: 0.24 },
  { pos: [2.8, 3.4, -4.2], roll: 160, pitch: 18, yaw: -22, scale: 2.1, delay: 1.15, fold: 0.14, droop: 0.22 },
  { pos: [-0.6, -1.6, -5.2], roll: 196, pitch: 8, yaw: 4, scale: 2.4, delay: 1.3, fold: 0.1, droop: 0.2 },
  // The understory: mostly hidden at first, revealed once the camera is through.
  { pos: [3.6, 0.9, -4.6], roll: 150, pitch: 10, yaw: -30, scale: 1.9, delay: 1.4, fold: 0.14, droop: 0.22 },
  { pos: [1.3, -0.9, -4.0], roll: 205, pitch: 4, yaw: 16, scale: 1.7, delay: 1.5, fold: 0.16, droop: 0.2 },
  { pos: [5.2, 2.6, -6.4], roll: 172, pitch: 16, yaw: -18, scale: 2.2, delay: 1.6, fold: 0.1, droop: 0.24 },
  { pos: [0.6, 2.4, -7.2], roll: 188, pitch: 20, yaw: 6, scale: 2.5, delay: 1.7, fold: 0.1, droop: 0.2 },
];

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(s) || "shader compile failed");
  }
  return s;
}

function program(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(p) || "program link failed");
  }
  const cache = new Map<string, WebGLUniformLocation | null>();
  const u = (name: string) => {
    if (!cache.has(name)) cache.set(name, gl.getUniformLocation(p, name));
    return cache.get(name)!;
  };
  return { p, u };
}

export default function LeafScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) return; // CSS fallback art stays visible

    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    try {
      const leafProg = program(gl, LEAF_VERT, LEAF_FRAG);
      const stemProg = program(gl, STEM_VERT, STEM_FRAG);
      const bgProg = program(gl, BG_VERT, BG_FRAG);
      const moteProg = program(gl, MOTE_VERT, MOTE_FRAG);

      // Geometry
      const grid = buildLeafGrid(coarse ? 26 : 40, coarse ? 30 : 46);
      const leafVao = gl.createVertexArray()!;
      gl.bindVertexArray(leafVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, grid.verts, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, grid.idx, gl.STATIC_DRAW);

      const STEM_SEG = 24;
      const stemVao = gl.createVertexArray()!;
      gl.bindVertexArray(stemVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, buildStemStrip(STEM_SEG), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      const MOTES = coarse ? 90 : 190;
      const seeds = new Float32Array(MOTES * 4);
      // Deterministic pseudo-random seeds (no Math.random → stable frames).
      let seed = 7;
      const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      for (let i = 0; i < seeds.length; i++) seeds[i] = rnd();
      const moteVao = gl.createVertexArray()!;
      gl.bindVertexArray(moteVao);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

      const bgVao = gl.createVertexArray()!;

      const heroHole = holeLocal(3, -1, HERO_FOLD, HERO_DROOP);

      // State
      const state = {
        w: 1, h: 1, scale: 1,
        scrollY: window.scrollY,
        flightEnd: 1, ctaTop: Infinity,
        f: 0, // smoothed flight progress
        px: 0, py: 0, tpx: 0, tpy: 0,
        visible: true,
        start: performance.now(),
        last: performance.now(),
        slow: 0, frames: 0, acc: 0,
      };

      const measure = () => {
        const end = document.querySelector<HTMLElement>("[data-flight-end]");
        const cta = document.querySelector<HTMLElement>("[data-scene-cta]");
        const vh = window.innerHeight;
        state.flightEnd = end
          ? Math.max(1, end.offsetTop + end.offsetHeight - vh)
          : vh * 2;
        state.ctaTop = cta ? cta.getBoundingClientRect().top + window.scrollY : Infinity;
      };

      const resize = () => {
        const dprCap = coarse ? 1.5 : 2;
        const dpr = Math.min(window.devicePixelRatio || 1, dprCap) * state.scale;
        const cw = canvas.clientWidth, ch = canvas.clientHeight;
        // Pixel budget keeps very large displays affordable.
        const budget = coarse ? 1.6e6 : 3.2e6;
        const k = Math.min(1, Math.sqrt(budget / Math.max(1, cw * ch * dpr * dpr)));
        const w = Math.max(2, Math.round(cw * dpr * k));
        const h = Math.max(2, Math.round(ch * dpr * k));
        if (w !== canvas.width || h !== canvas.height) {
          canvas.width = w;
          canvas.height = h;
        }
        state.w = w; state.h = h;
        measure();
      };

      const draw = (now: number) => {
        const t = reduced ? 12 : (now - state.start) / 1000;
        const aspect = state.w / state.h;
        const k = smooth((aspect - 0.7) / 0.8); // 0 = portrait phone, 1 = desktop

        // Scroll → flight progress (damped for a weighty camera)
        const inCta = state.scrollY + window.innerHeight * 1.2 > state.ctaTop;
        const fTarget = reduced ? 0 : clamp01(state.scrollY / state.flightEnd);
        state.f += (fTarget - state.f) * (reduced ? 1 : 0.085);
        const f = state.f;
        state.px += (state.tpx - state.px) * 0.05;
        state.py += (state.tpy - state.py) * 0.05;

        // Leaf matrices
        const mats: Mat4[] = [];
        const grows: number[] = [];
        for (let i = 0; i < LEAVES.length; i++) {
          const L = LEAVES[i];
          const g = reduced ? 1 : 1 - Math.pow(1 - clamp01((t - L.delay) / 2.6), 3);
          grows.push(g);
          const calm = L.hero ? 1 - smooth(f * 2.2) * 0.85 : 1;
          const sway = Math.sin(t * 0.55 + i * 1.7) * 2.2 * calm;
          const nod = Math.sin(t * 0.4 + i * 2.3) * 1.6 * calm;
          const lean = L.hero ? state.px * 3.5 * calm : state.px * 1.5;
          mats.push(
            compose(
              L.pos,
              (L.yaw + sway * 0.8 + lean) * DEG,
              (L.pitch + nod - state.py * 2 * calm) * DEG,
              (L.roll + sway) * DEG,
              L.scale * (0.3 + 0.7 * g)
            )
          );
        }

        // Camera
        const heroM = mats[0];
        const H = transformPoint(heroM, heroHole);
        let Nw = transformDir(heroM, [0, 0, 1]);
        const camA: Vec3 = [0, 0.2, lerp(12.8, 8.6, k)];
        const tgtA: Vec3 = [lerp(1.35, -0.95, k), lerp(-1.9, 0.05, k), 0];
        if (v3.dot(Nw, v3.sub(camA, H)) < 0) Nw = v3.scale(Nw, -1);

        let eye: Vec3, target: Vec3;
        let light = 0;
        const up: Vec3 = [0, 1, 0];
        if (inCta && !reduced) {
          // Closing view: pulled back, the whole plant lit and gently drifting.
          eye = [Math.sin(t * 0.12) * 0.6 + state.px * 0.5, 0.5 - state.py * 0.3, lerp(15.5, 11.5, k)];
          target = [0.9, lerp(0.2, 0.9, k), -1.5];
          light = 0.55;
        } else if (f < 0.4) {
          const e = smooth(f / 0.4);
          eye = v3.mix(camA, v3.add(H, v3.scale(Nw, 1.3)), e * e * (0.6 + 0.4 * e));
          target = v3.mix(tgtA, H, smooth(f / 0.34));
        } else if (f < 0.7) {
          const e = (f - 0.4) / 0.3;
          eye = v3.add(H, v3.scale(Nw, lerp(1.3, -0.9, e)));
          target = v3.sub(eye, v3.scale(Nw, 2));
          light = smooth((f - 0.45) / 0.4) * 0.6;
        } else {
          const e = smooth((f - 0.7) / 0.3);
          eye = v3.add(v3.add(H, v3.scale(Nw, lerp(-0.9, -2.6, e))), [0, 0.3 * e, 0]);
          target = v3.add(eye, v3.scale(v3.norm(v3.add(v3.scale(Nw, -1), [0, 0.45 * e, 0])), 2));
          light = smooth((f - 0.45) / 0.4) * 0.6;
        }
        if (!inCta) {
          const par = 1 - smooth(f * 2.5);
          eye = v3.add(eye, [state.px * 0.45 * par, -state.py * 0.25 * par, 0]);
        }

        const view = lookAt(eye, target, up);
        const proj = perspective(32 * DEG, aspect, 0.02, 60);
        const vp = multiply(proj, view);

        const fog: Vec3 = [0.008 + 0.03 * light, 0.03 + 0.07 * light, 0.02 + 0.03 * light];
        const key = v3.norm([0.5 + state.px * 0.7, 0.8 - state.py * 0.5, 0.65]);
        const back = v3.norm([0.15, 0.45, -1]);
        const pass = inCta ? 1 : smooth((f - 0.38) / 0.3);
        const glowX = lerp(lerp(0.6, 0.74, k), 0.5, pass);
        const glowY = lerp(0.8, 0.64, pass);

        gl.viewport(0, 0, state.w, state.h);
        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        gl.depthMask(false);
        gl.useProgram(bgProg.p);
        gl.uniform2f(bgProg.u("uGlow"), glowX, glowY);
        gl.uniform1f(bgProg.u("uAspect"), aspect);
        gl.uniform1f(bgProg.u("uLight"), light);
        gl.uniform1f(bgProg.u("uTime"), t);
        gl.bindVertexArray(bgVao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.depthMask(true);
        gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Far → near so soft leaf edges blend correctly.
        const order = LEAVES.map((_, i) => {
          const c = transformPoint(mats[i], [0, 0.5, 0]);
          const d = v3.sub(c, eye);
          return { i, d: v3.dot(d, d) };
        }).sort((a, b) => b.d - a.d);

        for (const { i, d } of order) {
          const L = LEAVES[i];
          const dist = Math.sqrt(d);
          // Soft focus grows with distance from the hero leaf's depth.
          const blur = L.hero ? 0 : clamp01((dist - 9.5) / 9) * (1 - pass * 0.6);

          gl.useProgram(stemProg.p);
          gl.uniformMatrix4fv(stemProg.u("uViewProj"), false, vp);
          const P2 = L.pos;
          const P1: Vec3 = [
            BASE[0] + (P2[0] - BASE[0]) * 0.3,
            P2[1] + 0.7,
            BASE[2] + (P2[2] - BASE[2]) * 0.45,
          ];
          gl.uniform3fv(stemProg.u("uP0"), BASE);
          gl.uniform3fv(stemProg.u("uP1"), P1);
          gl.uniform3fv(stemProg.u("uP2"), P2);
          gl.uniform3fv(stemProg.u("uCam"), eye);
          gl.uniform3fv(stemProg.u("uFog"), fog);
          gl.uniform3fv(stemProg.u("uKeyDir"), key);
          gl.uniform1f(stemProg.u("uLight"), light);
          gl.uniform1f(stemProg.u("uWidth"), 0.02 * L.scale);
          gl.bindVertexArray(stemVao);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, (STEM_SEG + 1) * 2);

          gl.useProgram(leafProg.p);
          gl.uniformMatrix4fv(leafProg.u("uViewProj"), false, vp);
          gl.uniformMatrix4fv(leafProg.u("uModel"), false, mats[i]);
          gl.uniform4f(leafProg.u("uShape"), grows[i], L.fold, L.droop, L.hero || reduced ? 0 : 1);
          gl.uniform1f(leafProg.u("uTime"), t);
          gl.uniform1f(leafProg.u("uPhase"), i * 1.37 + 0.5);
          gl.uniform3fv(leafProg.u("uCam"), eye);
          gl.uniform3fv(leafProg.u("uKeyDir"), key);
          gl.uniform3fv(leafProg.u("uBackDir"), back);
          gl.uniform3fv(leafProg.u("uFog"), fog);
          gl.uniform1f(leafProg.u("uLight"), light);
          gl.uniform1f(leafProg.u("uBlur"), blur);
          gl.uniform1f(leafProg.u("uHero"), L.hero ? 1 : 0);
          gl.bindVertexArray(leafVao);
          gl.drawElements(gl.TRIANGLES, grid.idx.length, gl.UNSIGNED_SHORT, 0);
        }

        gl.depthMask(false);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.useProgram(moteProg.p);
        gl.uniformMatrix4fv(moteProg.u("uViewProj"), false, vp);
        gl.uniform1f(moteProg.u("uTime"), t);
        gl.uniform1f(moteProg.u("uPx"), state.h * 0.035);
        gl.uniform1f(moteProg.u("uLight"), light);
        gl.bindVertexArray(moteVao);
        gl.drawArrays(gl.POINTS, 0, MOTES);
        gl.depthMask(true);

        root.style.setProperty("--flight", f.toFixed(4));
      };

      const loop = (now: number) => {
        if (disposed) return;
        raf = 0;
        if (state.visible && !document.hidden) {
          const dt = now - state.last;
          state.last = now;
          // Adaptive resolution: step down if the device can't hold ~45fps.
          if (dt < 200) {
            state.acc += dt;
            if (++state.frames >= 45) {
              const avg = state.acc / state.frames;
              state.frames = 0; state.acc = 0;
              if (avg > 23 && state.scale > 0.5) {
                state.scale = Math.max(0.5, state.scale * 0.82);
                resize();
              }
            }
          }
          draw(now);
          raf = requestAnimationFrame(loop);
        }
      };
      const kick = () => {
        if (reduced) {
          draw(performance.now());
          return;
        }
        if (!raf && state.visible && !document.hidden) {
          state.last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      };

      const onScroll = () => { state.scrollY = window.scrollY; };
      const onPointer = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        state.tpx = (e.clientX / window.innerWidth) * 2 - 1;
        state.tpy = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onResize = () => { resize(); kick(); };
      const onVis = () => kick();
      const onLost = (e: Event) => { e.preventDefault(); disposed = true; root.dataset.scene = "off"; };

      const windows = Array.from(document.querySelectorAll("[data-scene-window]"));
      const seen = new Set<Element>();
      const io = new IntersectionObserver(
        (entries) => {
          for (const en of entries) {
            if (en.isIntersecting) seen.add(en.target);
            else seen.delete(en.target);
          }
          state.visible = seen.size > 0 || windows.length === 0;
          kick();
        },
        { rootMargin: "15% 0px" }
      );
      windows.forEach((w) => io.observe(w));

      const ro = new ResizeObserver(onResize);
      ro.observe(canvas);
      ro.observe(document.body);
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVis);
      canvas.addEventListener("webglcontextlost", onLost);

      resize();
      root.dataset.scene = reduced ? "still" : "live";
      kick();

      cleanup = () => {
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", onVis);
        canvas.removeEventListener("webglcontextlost", onLost);
      };
    } catch (err) {
      console.warn("[LeafScene] falling back to static art:", err);
      root.dataset.scene = "off";
    }

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      cleanup();
      delete root.dataset.scene;
      root.style.removeProperty("--flight");
    };
  }, []);

  return <canvas ref={ref} className="scene-canvas" aria-hidden="true" />;
}

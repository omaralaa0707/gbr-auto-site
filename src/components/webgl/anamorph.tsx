"use client";

/**
 * "The Angle" — an anamorphic reconstruction of the GBR mark.
 *
 * Every fragment sits at a random depth along the ray that runs from ONE fixed
 * viewpoint through its target pixel, and is scaled by that depth. From that
 * single viewpoint the projection is exact and the mark reads; from anywhere
 * else it is debris. An account you cannot see unless you are standing in
 * exactly the right place.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/* ------------------------------------------------------------------ mark */

/** The traced GBR mark (viewBox 0 0 151.38 100), inlined so nothing is fetched. */
const MARK_VIEWBOX = { w: 151.38, h: 100 };
const MARK_PATH =
  "M 34.80 0.82 L 21.49 3.68 L 15.25 7.06 L 9.62 11.98 L 5.22 18.12 L 2.46 24.67 L 0.92 39.30 L 4.30 52.71 L 8.09 58.85 L 12.28 63.25 L 17.81 67.14 L 24.77 70.11 L 38.38 71.75 L 51.59 68.68 L 57.42 65.20 L 62.54 60.08 L 65.81 54.76 L 68.27 47.49 L 69.09 33.27 L 36.74 32.65 L 38.18 38.69 L 42.27 43.09 L 47.08 44.93 L 55.58 45.24 L 53.12 50.87 L 48.00 55.89 L 39.20 58.34 L 29.89 57.63 L 22.62 53.63 L 17.30 45.65 L 15.76 35.01 L 18.12 25.08 L 24.26 17.60 L 31.42 14.53 L 40.12 14.33 L 47.80 17.20 L 53.12 23.54 L 67.45 23.54 L 63.66 14.33 L 56.29 6.65 L 46.47 2.15 Z M 60.08 1.84 L 66.32 7.57 L 70.83 14.43 L 85.77 14.53 L 88.74 15.66 L 90.68 17.50 L 91.91 20.16 L 92.12 23.85 L 91.20 26.61 L 89.35 28.66 L 85.06 30.19 L 75.02 30.30 L 75.23 42.17 L 90.48 42.78 L 93.45 45.04 L 94.98 48.82 L 94.37 53.53 L 91.50 56.91 L 87.20 58.14 L 71.03 58.14 L 65.81 65.81 L 60.08 70.83 L 89.97 70.83 L 96.11 69.70 L 100.82 67.55 L 105.01 63.97 L 106.96 61.21 L 109.52 52.61 L 109.31 47.08 L 107.47 41.76 L 103.99 37.56 L 99.69 35.01 L 104.30 30.40 L 106.45 24.56 L 106.04 16.89 L 103.58 10.85 L 98.57 5.63 L 91.09 2.46 L 86.69 1.84 Z M 103.48 1.64 L 108.90 7.68 L 111.87 14.53 L 122.82 14.53 L 125.08 15.05 L 128.96 17.60 L 131.32 22.01 L 131.22 28.56 L 129.48 32.04 L 127.33 34.08 L 122.72 35.82 L 110.85 35.82 L 114.23 41.66 L 115.66 47.90 L 119.34 48.21 L 133.37 70.73 L 149.13 70.73 L 149.13 68.68 L 133.57 45.75 L 137.56 43.19 L 140.84 40.02 L 143.50 35.93 L 145.03 31.93 L 145.85 27.23 L 145.65 21.60 L 144.42 16.68 L 142.07 11.98 L 139.40 8.60 L 136.13 5.83 L 128.25 2.35 L 123.23 1.64 Z M 129.78 85.88 L 129.17 87.51 L 129.17 95.39 L 129.58 96.72 L 130.09 97.54 L 131.42 98.67 L 132.96 99.18 L 146.67 99.18 L 147.80 98.87 L 148.72 98.36 L 150.05 96.83 L 150.56 94.98 L 150.46 87.31 L 149.74 85.67 L 148.31 84.34 L 146.88 83.83 L 132.75 83.83 L 130.91 84.65 Z M 59.06 99.08 L 63.87 99.18 L 65.71 95.60 L 73.59 95.60 L 75.43 99.18 L 80.24 99.18 L 72.77 83.83 L 66.53 83.83 Z M 82.39 83.83 L 82.39 95.29 L 83.11 97.24 L 84.54 98.57 L 86.18 99.18 L 99.90 99.18 L 101.64 98.57 L 103.17 97.03 L 103.79 95.09 L 103.79 83.83 L 99.69 83.83 L 99.69 94.78 L 99.49 95.09 L 86.69 95.09 L 86.49 94.88 L 86.49 83.83 Z M 105.83 83.83 L 105.83 87.92 L 114.43 88.02 L 114.43 99.18 L 118.52 99.18 L 118.63 87.92 L 127.12 87.92 L 127.12 83.83 Z M 133.26 88.02 L 133.67 87.82 L 133.78 87.92 L 146.26 87.92 L 146.47 88.23 L 146.47 94.78 L 146.26 95.09 L 133.47 95.09 L 133.26 94.88 Z M 69.70 87.62 L 69.80 87.72 L 69.80 87.82 L 69.91 87.92 L 69.91 88.02 L 70.01 88.13 L 70.01 88.23 L 70.11 88.33 L 70.11 88.43 L 70.21 88.54 L 70.21 88.64 L 70.32 88.74 L 70.32 88.84 L 70.42 88.95 L 70.42 89.05 L 70.52 89.15 L 70.52 89.25 L 70.62 89.36 L 70.62 89.56 L 70.83 89.76 L 70.83 89.87 L 70.93 89.97 L 70.93 90.17 L 71.03 90.28 L 71.03 90.38 L 71.14 90.48 L 71.14 90.58 L 71.24 90.69 L 71.24 90.79 L 71.34 90.89 L 71.34 90.99 L 71.44 91.10 L 71.44 91.20 L 71.54 91.30 L 71.54 91.50 L 71.44 91.61 L 71.34 91.50 L 71.14 91.50 L 71.03 91.61 L 70.93 91.61 L 70.83 91.50 L 67.96 91.50 L 67.86 91.61 L 67.76 91.50 L 67.76 91.40 L 67.86 91.30 L 67.86 91.10 L 68.06 90.89 L 68.06 90.69 L 68.17 90.58 L 68.17 90.48 L 68.27 90.38 L 68.27 90.28 L 68.37 90.17 L 68.37 90.07 L 68.47 89.97 L 68.47 89.87 L 68.58 89.76 L 68.58 89.66 L 68.68 89.56 L 68.68 89.46 L 68.78 89.36 L 68.78 89.25 L 68.88 89.15 L 68.88 89.05 L 68.99 88.95 L 68.99 88.84 L 69.09 88.74 L 69.09 88.64 L 69.19 88.54 L 69.19 88.43 L 69.29 88.33 L 69.29 88.23 L 69.40 88.13 L 69.40 88.02 L 69.50 87.92 L 69.50 87.82 Z";

/* --------------------------------------------------------------- constants */

const AMBER = "#C99A62";
const DIM = "#4E463A";
const RED = "#8E3B2E";
const PANEL = "#16150F";

/** Distance of the one correct viewpoint from the mark plane (z = 0). */
const VIEW_DIST = 9.5;
/** World width of the reconstructed mark on its plane. */
const MARK_W = 5.2;
const MARK_H = (MARK_W * MARK_VIEWBOX.h) / MARK_VIEWBOX.w;

/** Depth parameter along the viewing ray. 1 = on the mark plane. */
const T_MIN = 0.45;
const T_MAX = 1.5;

const TARGET_FRAGMENTS = 2400;
const MIN_FRAGMENTS = 1800;
/** Raster widths tried until enough filled cells exist to subsample from. */
const RASTER_WIDTHS = [150, 200, 262];

/** How wide, in radians, the alignment window is before the mark dissolves. */
const ALIGN_WINDOW = 0.5;
const MAX_YAW = 0.62;
const MAX_PITCH = 0.34;

const STRIDE = 8; // px, py, pz, scale, rotZ, tintR, tintG, tintB

/* ------------------------------------------------------------------- prng */

/** Deterministic per-instance hash — stable between renders, never Math.random. */
function hash01(i: number, salt: number): number {
  let h = Math.imul(i ^ salt, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 3266489917);
  h = Math.imul(h ^ (h >>> 16), 668265263);
  h ^= h >>> 15;
  return (h >>> 0) / 4294967296;
}

/* ------------------------------------------------------- rasterise (once) */

let fragmentsPromise: Promise<Float32Array> | null = null;

function svgDataUrl(): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}">` +
    `<path fill="#ffffff" fill-rule="evenodd" d="${MARK_PATH}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function occupancy(img: HTMLImageElement, w: number): { cells: number[]; w: number; h: number } {
  const h = Math.max(1, Math.round((w * MARK_VIEWBOX.h) / MARK_VIEWBOX.w));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { cells: [], w, h };
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);
  const cells: number[] = [];
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3] > 128) cells.push(i);
  }
  return { cells, w, h };
}

/** Build the anamorphic fragment table from the rasterised mark. */
function build(cells: number[], gw: number, gh: number): Float32Array {
  // Deterministic shuffle: order by hash, then take the head. Avoids the moire
  // a fixed stride would print across the letterforms.
  const order = cells
    .map((cell, idx) => ({ cell, key: hash01(idx, 0x9e37) }))
    .sort((a, b) => a.key - b.key)
    .slice(0, Math.min(TARGET_FRAGMENTS, cells.length));

  const count = order.length;
  const out = new Float32Array(count * STRIDE);
  const cellW = MARK_W / gw;
  const base = cellW * 1.95;

  const amber = new THREE.Color(AMBER);
  const red = new THREE.Color(RED);
  const tint = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const cell = order[i].cell;
    const col = cell % gw;
    const row = (cell - col) / gw;

    // Target point on the mark plane (z = 0), SVG y runs down.
    const tx = -MARK_W / 2 + ((col + 0.5) / gw) * MARK_W;
    const ty = MARK_H / 2 - ((row + 0.5) / gh) * MARK_H;

    // Random depth along the ray from the correct viewpoint (0,0,VIEW_DIST)
    // through (tx, ty, 0). At t the fragment sits t*VIEW_DIST from the eye,
    // so scaling by t keeps its projected size — and its projected centre —
    // pinned to the target pixel.
    const t = T_MIN + (T_MAX - T_MIN) * hash01(i, 0x51ed);
    const px = tx * t;
    const py = ty * t;
    const pz = VIEW_DIST * (1 - t);

    const s = base * t * (0.8 + 0.45 * hash01(i, 0x2f1b));
    const rot = (hash01(i, 0x7a3d) - 0.5) * 0.55;

    // Instance tint multiplies the material colour, which is what the
    // alignment value drives. Mostly brightness jitter; a scarce few carry the
    // red of the glow inside their own showroom glass.
    const v = 0.74 + 0.42 * hash01(i, 0x1b9f);
    if (hash01(i, 0x4c7e) > 0.94) {
      // Ratio tint: amber * this = the showroom-glass red.
      tint.setRGB(
        (red.r / Math.max(1e-4, amber.r)) * v,
        (red.g / Math.max(1e-4, amber.g)) * v,
        (red.b / Math.max(1e-4, amber.b)) * v,
      );
    } else {
      tint.setScalar(v);
    }

    const o = i * STRIDE;
    out[o] = px;
    out[o + 1] = py;
    out[o + 2] = pz;
    out[o + 3] = s;
    out[o + 4] = rot;
    out[o + 5] = tint.r;
    out[o + 6] = tint.g;
    out[o + 7] = tint.b;
  }
  return out;
}

function getFragments(): Promise<Float32Array> {
  if (fragmentsPromise) return fragmentsPromise;
  fragmentsPromise = new Promise<Float32Array>((resolve) => {
    if (typeof document === "undefined") {
      resolve(new Float32Array(0));
      return;
    }
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      try {
        let picked = occupancy(img, RASTER_WIDTHS[0]);
        for (let i = 1; i < RASTER_WIDTHS.length && picked.cells.length < MIN_FRAGMENTS * 1.15; i++) {
          picked = occupancy(img, RASTER_WIDTHS[i]);
        }
        resolve(picked.cells.length ? build(picked.cells, picked.w, picked.h) : new Float32Array(0));
      } catch {
        resolve(new Float32Array(0));
      }
    };
    img.onerror = () => resolve(new Float32Array(0));
    img.src = svgDataUrl();
  });
  return fragmentsPromise;
}

/* ------------------------------------------------------------------ scene */

type SceneProps = {
  data: Float32Array;
  onAlign: (v: number) => void;
  reduced: boolean;
};

function Fragments({ data, onAlign, reduced }: SceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera);

  const count = Math.floor(data.length / STRIDE);

  // Per-frame state lives in a ref owned by the component running useFrame.
  const drive = useRef({
    yaw: 0,
    pitch: 0,
    dragging: false,
    pointerId: -1,
    lastX: 0,
    lastY: 0,
    emitAt: 0,
    emitted: -1,
  });

  const colors = useRef({
    amber: new THREE.Color(AMBER),
    dim: new THREE.Color(DIM),
    work: new THREE.Color(),
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 0.32), []);
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(AMBER),
        // NOT vertexColors: the per-instance tint arrives through
        // `instanceColor` (USE_INSTANCING_COLOR), which InstancedMesh switches
        // on by itself. Asking for vertexColors as well defines USE_COLOR,
        // and BoxGeometry has no `color` attribute — so the shader multiplies
        // by WebGL's default attribute value, (0,0,0), and every fragment
        // renders black.
        toneMapped: false,
      }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  // Instance matrices + tints, written once.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || count === 0) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3();
    const axis = new THREE.Vector3(0, 0, 1);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const o = i * STRIDE;
      p.set(data[o], data[o + 1], data[o + 2]);
      const sc = data[o + 3];
      s.set(sc, sc, sc);
      q.setFromAxisAngle(axis, data[o + 4]);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
      c.setRGB(data[o + 5], data[o + 6], data[o + 7]);
      mesh.setColorAt(i, c);
    }
    mesh.count = count;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.frustumCulled = false;
  }, [data, count]);

  // Pointer drag: bound to WINDOW, hit-tested against the canvas rect, so an
  // overlay sitting above the canvas can never swallow the gesture.
  useEffect(() => {
    const el = gl.domElement;
    const st = drive.current;

    const inside = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    };

    const down = (e: PointerEvent) => {
      if (!inside(e)) return;
      st.dragging = true;
      st.pointerId = e.pointerId;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!st.dragging || e.pointerId !== st.pointerId) return;
      const r = el.getBoundingClientRect();
      const w = Math.max(1, r.width);
      st.yaw = THREE.MathUtils.clamp(st.yaw - ((e.clientX - st.lastX) / w) * 2.1, -MAX_YAW, MAX_YAW);
      st.pitch = THREE.MathUtils.clamp(st.pitch + ((e.clientY - st.lastY) / w) * 2.1, -MAX_PITCH, MAX_PITCH);
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      e.preventDefault();
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== st.pointerId) return;
      st.dragging = false;
      st.pointerId = -1;
    };

    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up, { passive: true });
    window.addEventListener("pointercancel", up, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [gl]);

  useFrame((_, rawDelta) => {
    const st = drive.current;
    const delta = Math.min(rawDelta, 0.05);

    // Idle: drift back toward the one correct viewpoint.
    if (!st.dragging) {
      const k = reduced ? 1 : 1 - Math.pow(0.12, delta);
      st.yaw += (0 - st.yaw) * k;
      st.pitch += (0 - st.pitch) * k;
    }

    const cp = Math.cos(st.pitch);
    camera.position.set(
      VIEW_DIST * cp * Math.sin(st.yaw),
      VIEW_DIST * Math.sin(st.pitch),
      VIEW_DIST * cp * Math.cos(st.yaw),
    );
    // r3f keeps the default look-down-minus-Z rotation unless told otherwise.
    camera.lookAt(0, 0, 0);

    const ang = Math.acos(THREE.MathUtils.clamp(cp * Math.cos(st.yaw), -1, 1));
    const lin = Math.max(0, 1 - ang / ALIGN_WINDOW);
    const align = lin * lin;

    const col = colors.current;
    col.work.copy(col.dim).lerp(col.amber, align);
    material.color.copy(col.work);

    // Throttled read-out so the parent re-renders a few times a second, not 60.
    st.emitAt += delta;
    if (st.emitAt > 0.1) {
      st.emitAt = 0;
      if (Math.abs(align - st.emitted) > 0.004) {
        st.emitted = align;
        onAlign(align);
      }
    }
  });

  if (count === 0) return null;

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
    />
  );
}

/* -------------------------------------------------------------- component */

export function Anamorph({ hint, alignedLabel }: { hint: string; alignedLabel: string }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [data, setData] = useState<Float32Array | null>(null);
  const [align, setAlign] = useState(1);
  const [reduced, setReduced] = useState(false);
  const { lost, bind } = useWebglHealth();

  // Support probe on a throwaway canvas.
  useEffect(() => {
    let ok = false;
    try {
      const c = document.createElement("canvas");
      const ctx =
        (c.getContext("webgl2") as WebGLRenderingContext | null) ??
        (c.getContext("webgl") as WebGLRenderingContext | null);
      ok = !!ctx;
      const ext = ctx?.getExtension("WEBGL_lose_context");
      ext?.loseContext();
    } catch {
      ok = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(ok);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (supported !== true) return;
    let alive = true;
    getFragments().then((f) => {
      if (alive) setData(f);
    });
    return () => {
      alive = false;
    };
  }, [supported]);

  const onAlign = useCallback((v: number) => setAlign(v), []);

  const failed = supported === false || lost || (data !== null && data.length === 0);
  const pct = Math.round(align * 100);

  return (
    <div className="relative aspect-[3/2] w-full touch-pan-y overflow-hidden bg-[#16150F]">
      {failed ? (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <p className="text-[0.75rem] tracking-[0.16em] text-[#C9BFAF] uppercase">WebGL unavailable.</p>
        </div>
      ) : (
        <>
          {supported === true && data !== null && data.length > 0 ? (
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
              camera={{ position: [0, 0, VIEW_DIST], fov: 32, near: 0.1, far: 60 }}
              onCreated={({ gl, camera }) => {
                bind(gl.domElement);
                camera.lookAt(0, 0, 0);
              }}
            >
              <color attach="background" args={[PANEL]} />
              <fog attach="fog" args={[PANEL, 12, 30]} />
              <Fragments data={data} onAlign={onAlign} reduced={reduced} />
            </Canvas>
          ) : null}

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[22ch] text-[0.68rem] leading-[1.5] tracking-[0.1em] text-[#C9BFAF] uppercase">
                {hint}
              </p>
              <div className="text-right">
                <span
                  className="block font-[family-name:var(--font-display)] text-[1.9rem] leading-none tabular-nums"
                  style={{ color: align > 0.82 ? AMBER : "#C9BFAF" }}
                >
                  {pct}
                  <span className="text-[0.9rem] align-top">%</span>
                </span>
                <span className="mt-1 block text-[0.6rem] tracking-[0.18em] text-[#C9BFAF] uppercase">
                  {alignedLabel}
                </span>
              </div>
            </div>
            <div
              className="h-px w-full origin-left"
              style={{ background: AMBER, transform: `scaleX(${Math.max(0.04, align)})`, opacity: 0.55 }}
            />
          </div>
        </>
      )}

      <noscript>
        <div className="absolute inset-0 grid place-items-center px-8 text-center">
          <p className="max-w-[34ch] text-[0.72rem] leading-[1.7] tracking-[0.12em] text-[#C9BFAF] uppercase">
            {hint}
          </p>
        </div>
      </noscript>
    </div>
  );
}

import { useEffect, useRef } from "react";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";

/**
 * Glowing 3D ring (torus) drawn as a wireframe on a <canvas>. It slowly tumbles and breathes.
 * Pure 2D canvas math, no 3D library. With "reduce motion" it renders one still frame.
 */

const MAJOR = 1; // ring radius
const MINOR = 0.34; // tube radius
const U_LINES = 44; // lines around the tube
const V_LINES = 16; // lines around the ring
const SEG = 72;

interface Seg {
  a: [number, number, number];
  b: [number, number, number];
}

function buildMesh(): Seg[] {
  const segs: Seg[] = [];
  const pt = (u: number, v: number): [number, number, number] => {
    const ring = MAJOR + MINOR * Math.cos(v);
    return [ring * Math.cos(u), MINOR * Math.sin(v), ring * Math.sin(u)];
  };
  // tube cross-sections
  for (let i = 0; i < U_LINES; i++) {
    const u = (i / U_LINES) * Math.PI * 2;
    for (let s = 0; s < 18; s++) {
      segs.push({ a: pt(u, (s / 18) * Math.PI * 2), b: pt(u, ((s + 1) / 18) * Math.PI * 2) });
    }
  }
  // lines running around the ring
  for (let j = 0; j < V_LINES; j++) {
    const v = (j / V_LINES) * Math.PI * 2;
    for (let s = 0; s < SEG; s++) {
      segs.push({ a: pt((s / SEG) * Math.PI * 2, v), b: pt(((s + 1) / SEG) * Math.PI * 2, v) });
    }
  }
  return segs;
}

let mesh: Seg[] | null = null;

function draw(ctx: CanvasRenderingContext2D, size: number, t: number) {
  if (!mesh) mesh = buildMesh();
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2,
    cy = size / 2;
  const scale = size * 0.3;
  // tilt so the hole is visible (like a ring standing toward the viewer), plus a gentle wobble
  const rx = 1.12 + 0.16 * Math.sin(t * 0.55);
  const ry = t * 0.35;
  const sx = Math.sin(rx),
    cx2 = Math.cos(rx),
    sy = Math.sin(ry),
    cy2 = Math.cos(ry);

  const back = new Path2D(),
    front = new Path2D();
  const proj = (p: [number, number, number]) => {
    // rotate around Y then X
    const x1 = p[0] * cy2 + p[2] * sy;
    const z1 = -p[0] * sy + p[2] * cy2;
    const y2 = p[1] * cx2 - z1 * sx;
    const z2 = p[1] * sx + z1 * cx2;
    const persp = 1 / (1 - z2 * 0.12);
    return { x: cx + x1 * scale * persp, y: cy - y2 * scale * persp, z: z2 };
  };

  for (const s of mesh) {
    const A = proj(s.a),
      B = proj(s.b);
    const path = A.z + B.z > 0 ? front : back;
    path.moveTo(A.x, A.y);
    path.lineTo(B.x, B.y);
  }

  ctx.lineCap = "round";
  const pulse = 0.8 + 0.2 * Math.sin(t * 1.6);
  // soft glow pass, then crisp lines
  ctx.strokeStyle = `rgba(244,63,94,${0.14 * pulse})`;
  ctx.lineWidth = Math.max(3, size * 0.012);
  ctx.stroke(front);
  ctx.strokeStyle = "rgba(225,29,72,0.30)";
  ctx.lineWidth = 0.8;
  ctx.stroke(back);
  ctx.strokeStyle = `rgba(251,113,133,${0.55 + 0.35 * pulse})`;
  ctx.lineWidth = 1;
  ctx.stroke(front);
}

export default function TorusRing({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockRef = useRef(0.4);
  const inView = useInView(wrapRef);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    let size = 0;
    let raf = 0;
    let last = 0;

    const paint = () => {
      if (size > 0) draw(ctx, size, clockRef.current);
    };
    const resize = () => {
      const w = wrap.clientWidth;
      if (w === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = w;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint();
    };
    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      clockRef.current += dt;
      paint();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };
    const start = () => {
      if (!raf && !reduced && inView && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [inView, reduced]);

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

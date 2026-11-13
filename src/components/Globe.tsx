import { useEffect, useRef } from "react";
import { INDIA, LAND, WATER, type Ring } from "../data/geo";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";

/**
 * Dotted 3D Earth drawn on a <canvas> (no 3D library). Land is dim blue dots; India is the ONLY highlighted
 * region: dense glowing pink dots, a glowing animated border and one pulsing server marker. No other
 * country or server location is marked. The globe spins continuously; with "reduce motion" it stays still
 * with India facing the viewer.
 */

const D2R = Math.PI / 180;
const TILT = 22 * D2R; // how far the north pole leans toward the viewer
const START_LON = 79; // longitude facing the viewer at start (India)
const SPIN_DEG_PER_SEC = 7;
const PIN = { lon: 78.6, lat: 22.4 }; // marker position (centre of India)

interface Prepared {
  ring: Ring;
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
  wraps: boolean;
}

function prepare(rings: Ring[]): Prepared[] {
  return rings.map((ring) => {
    let minLon = Infinity,
      maxLon = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;
    for (let i = 0; i < ring.length; i += 2) {
      minLon = Math.min(minLon, ring[i]);
      maxLon = Math.max(maxLon, ring[i]);
      minLat = Math.min(minLat, ring[i + 1]);
      maxLat = Math.max(maxLat, ring[i + 1]);
    }
    return { ring, minLon, maxLon, minLat, maxLat, wraps: maxLon > 180 };
  });
}

function insideRing(ring: Ring, lon: number, lat: number): boolean {
  let inside = false;
  const n = ring.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = ring[2 * i],
      yi = ring[2 * i + 1],
      xj = ring[2 * j],
      yj = ring[2 * j + 1];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function insideAny(list: Prepared[], lon: number, lat: number): boolean {
  for (const p of list) {
    if (lat < p.minLat || lat > p.maxLat) continue;
    if (lon >= p.minLon && lon <= p.maxLon && insideRing(p.ring, lon, lat)) return true;
    const l2 = lon + 360;
    if (p.wraps && l2 >= p.minLon && l2 <= p.maxLon && insideRing(p.ring, l2, lat)) return true;
  }
  return false;
}

/** Points on the sphere stored as precomputed sin/cos so each frame only needs a few multiplications. */
interface Points {
  count: number;
  sinLon: Float32Array;
  cosLon: Float32Array;
  sinLat: Float32Array;
  cosLat: Float32Array;
}

function toPoints(lons: number[], lats: number[]): Points {
  const count = lons.length;
  const p: Points = {
    count,
    sinLon: new Float32Array(count),
    cosLon: new Float32Array(count),
    sinLat: new Float32Array(count),
    cosLat: new Float32Array(count),
  };
  for (let i = 0; i < count; i++) {
    p.sinLon[i] = Math.sin(lons[i] * D2R);
    p.cosLon[i] = Math.cos(lons[i] * D2R);
    p.sinLat[i] = Math.sin(lats[i] * D2R);
    p.cosLat[i] = Math.cos(lats[i] * D2R);
  }
  return p;
}

interface Geometry {
  land: Points;
  india: Points;
  border: Points;
  pin: Points;
}

let cached: Geometry | null = null;

function buildGeometry(): Geometry {
  if (cached) return cached;
  const land = prepare(LAND),
    water = prepare(WATER),
    india = prepare(INDIA);

  // 1) land dots on a Fibonacci sphere (even spacing), leaving out India (drawn denser below)
  const landLon: number[] = [],
    landLat: number[] = [];
  const N = 9000;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const lat = Math.asin(1 - (2 * (i + 0.5)) / N) / D2R;
    let lon = ((i * golden) / D2R) % 360;
    if (lon > 180) lon -= 360;
    if (insideAny(india, lon, lat)) continue;
    if (insideAny(land, lon, lat) && !insideAny(water, lon, lat)) {
      landLon.push(lon);
      landLat.push(lat);
    }
  }

  // 2) India: a finer grid so the country looks filled
  const inLon: number[] = [],
    inLat: number[] = [];
  for (let lat = 6; lat <= 38; lat += 0.62) {
    const step = 0.62 / Math.max(Math.cos(lat * D2R), 0.2);
    for (let lon = 66; lon <= 98.5; lon += step) {
      if (insideAny(india, lon, lat)) {
        inLon.push(lon);
        inLat.push(lat);
      }
    }
  }

  // 3) India's border, densified so it follows the curve of the globe
  const bLon: number[] = [],
    bLat: number[] = [];
  for (const ring of INDIA) {
  const n = ring.length / 2;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const x0 = ring[2 * i],
      y0 = ring[2 * i + 1],
      x1 = ring[2 * j],
      y1 = ring[2 * j + 1];
    const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) / 0.7));
    for (let s = 0; s < steps; s++) {
      bLon.push(x0 + ((x1 - x0) * s) / steps);
      bLat.push(y0 + ((y1 - y0) * s) / steps);
    }
  }
  }

  cached = {
    land: toPoints(landLon, landLat),
    india: toPoints(inLon, inLat),
    border: toPoints(bLon, bLat),
    pin: toPoints([PIN.lon], [PIN.lat]),
  };
  return cached;
}

/** Soft pink glow used behind India (drawn once, reused every frame). */
function makeGlow(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,70,120,0.85)");
    grad.addColorStop(0.35, "rgba(255,60,110,0.38)");
    grad.addColorStop(1, "rgba(255,60,110,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
  }
  return c;
}

const LAND_BUCKETS = [
  "rgba(112,128,210,0.20)",
  "rgba(112,128,210,0.38)",
  "rgba(130,148,228,0.58)",
  "rgba(150,166,240,0.82)",
];

function draw(
  ctx: CanvasRenderingContext2D,
  geo: Geometry,
  glow: HTMLCanvasElement,
  size: number,
  centerLon: number,
  seconds: number,
  animate: boolean,
) {
  const R = size * 0.42;
  const cx = size / 2,
    cy = size / 2;
  ctx.clearRect(0, 0, size, size);

  // atmosphere
  const atm = ctx.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.22);
  atm.addColorStop(0, "rgba(130,120,255,0.38)");
  atm.addColorStop(0.45, "rgba(120,110,255,0.14)");
  atm.addColorStop(1, "rgba(120,110,255,0)");
  ctx.fillStyle = atm;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
  ctx.fill();

  // ocean sphere
  const sea = ctx.createRadialGradient(cx - R * 0.38, cy - R * 0.42, R * 0.08, cx, cy, R);
  sea.addColorStop(0, "#222f66");
  sea.addColorStop(0.55, "#0f1736");
  sea.addColorStop(1, "#070b1b");
  ctx.fillStyle = sea;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.fill();

  const L0 = centerLon * D2R;
  const sL0 = Math.sin(L0),
    cL0 = Math.cos(L0);
  const sT = Math.sin(TILT),
    cT = Math.cos(TILT);

  // project one point; returns depth (z) and writes screen coordinates to `out`
  const out = { x: 0, y: 0 };
  const project = (p: Points, i: number): number => {
    const sd = p.sinLon[i] * cL0 - p.cosLon[i] * sL0; // sin(lon - L0)
    const cd = p.cosLon[i] * cL0 + p.sinLon[i] * sL0; // cos(lon - L0)
    const x = p.cosLat[i] * sd;
    const y = cT * p.sinLat[i] - sT * p.cosLat[i] * cd;
    const z = sT * p.sinLat[i] + cT * p.cosLat[i] * cd;
    out.x = cx + x * R;
    out.y = cy - y * R;
    return z;
  };

  // land
  const land = geo.land;
  const r = Math.max(0.8, R * 0.0066);
  const paths = LAND_BUCKETS.map(() => new Path2D());
  for (let i = 0; i < land.count; i++) {
    const z = project(land, i);
    if (z <= 0.02) continue;
    const b = z > 0.78 ? 3 : z > 0.5 ? 2 : z > 0.25 ? 1 : 0;
    paths[b].moveTo(out.x + r, out.y);
    paths[b].arc(out.x, out.y, r, 0, Math.PI * 2);
  }
  paths.forEach((path, i) => {
    ctx.fillStyle = LAND_BUCKETS[i];
    ctx.fill(path);
  });

  // India glow (stronger the more India faces the viewer)
  const facing = project(geo.pin, 0);
  const pinX = out.x,
    pinY = out.y;
  if (facing > -0.15) {
    const a = Math.min(1, Math.max(0, (facing + 0.15) / 0.55));
    const pulse = animate ? 0.9 + 0.1 * Math.sin(seconds * 2.2) : 1;
    ctx.globalAlpha = a * pulse;
    const gs = R * 0.95;
    ctx.drawImage(glow, pinX - gs / 2, pinY - gs / 2, gs, gs);
    ctx.globalAlpha = 1;
  }

  // India dots
  const ind = geo.india;
  const ri = Math.max(0.7, R * 0.0052);
  const core = new Path2D(),
    edge = new Path2D();
  for (let i = 0; i < ind.count; i++) {
    const z = project(ind, i);
    if (z <= 0.02) continue;
    (z > 0.35 ? core : edge).moveTo(out.x + ri, out.y);
    (z > 0.35 ? core : edge).arc(out.x, out.y, ri, 0, Math.PI * 2);
  }
  ctx.fillStyle = "rgba(255,92,138,0.55)";
  ctx.fill(edge);
  ctx.fillStyle = "rgba(255,84,130,0.98)";
  ctx.fill(core);

  // India border: soft wide stroke + bright thin stroke with a slow breathing glow
  const b = geo.border;
  const breathe = animate ? 0.65 + 0.35 * Math.sin(seconds * 2.4) : 0.9;
  const wide = new Path2D(),
    thin = new Path2D();
  let prevVisible = false;
  for (let i = 0; i <= b.count; i++) {
    const k = i % b.count;
    const z = project(b, k);
    const visible = z > 0.02;
    if (visible) {
      if (prevVisible) {
        wide.lineTo(out.x, out.y);
        thin.lineTo(out.x, out.y);
      } else {
        wide.moveTo(out.x, out.y);
        thin.moveTo(out.x, out.y);
      }
    }
    prevVisible = visible;
  }
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = `rgba(255,70,120,${0.22 * breathe})`;
  ctx.lineWidth = Math.max(5, R * 0.03);
  ctx.stroke(wide);
  ctx.strokeStyle = `rgba(255,170,195,${0.55 + 0.4 * breathe})`;
  ctx.lineWidth = Math.max(1.1, R * 0.0055);
  ctx.stroke(thin);

  // server marker with an expanding ring
  if (facing > 0.05) {
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(pinX, pinY, Math.max(2.4, R * 0.012), 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,90,135,0.95)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(pinX, pinY, Math.max(5, R * 0.026), 0, Math.PI * 2);
    ctx.stroke();
    if (animate) {
      const ph = (seconds * 0.8) % 1;
      ctx.strokeStyle = `rgba(255,90,135,${0.7 * (1 - ph)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(pinX, pinY, R * (0.03 + 0.1 * ph), 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // rim light
  const rim = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.01);
  rim.addColorStop(0, "rgba(160,170,255,0)");
  rim.addColorStop(1, "rgba(170,180,255,0.35)");
  ctx.fillStyle = rim;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.01, 0, Math.PI * 2);
  ctx.fill();
}

export default function Globe({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(START_LON);
  const clockRef = useRef(0);
  const inView = useInView(wrapRef);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const geo = buildGeometry();
    const glow = makeGlow();
    let size = 0;
    let raf = 0;
    let last = 0;

    const paint = () => {
      if (size > 0) draw(ctx, geo, glow, size, angleRef.current, clockRef.current, !reduced);
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
      angleRef.current -= dt * SPIN_DEG_PER_SEC; // surface moves west to east, like the real Earth
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
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Rotating Earth with India highlighted. India is the only supported server."
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

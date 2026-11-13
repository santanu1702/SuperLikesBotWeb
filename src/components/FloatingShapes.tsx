import type { CSSProperties } from "react";

/**
 * Decorative floating particles and geometric shapes. Pure CSS animation (transform only, so no layout
 * work), positions are fixed so nothing shifts between renders. Hidden from assistive technology.
 */
type Kind = "diamond" | "square" | "ring" | "dot" | "poly";

interface Shape {
  kind: Kind;
  x: number; // left, %
  y: number; // top, %
  s: number; // size, px
  d: number; // drift duration, s
  dl: number; // delay, s
  dx: number; // drift distance x, px
  dy: number; // drift distance y, px
  c: number; // colour index
  o: number; // opacity
}

const SHAPES: Shape[] = [
  { kind: "poly", x: 5, y: 12, s: 64, d: 11, dl: 0, dx: 14, dy: -26, c: 0, o: 0.55 },
  { kind: "poly", x: 88, y: 18, s: 52, d: 13, dl: -3, dx: -16, dy: 22, c: 1, o: 0.5 },
  { kind: "poly", x: 80, y: 74, s: 72, d: 15, dl: -6, dx: 12, dy: -20, c: 2, o: 0.4 },
  { kind: "poly", x: 10, y: 70, s: 44, d: 12, dl: -2, dx: -10, dy: 24, c: 3, o: 0.45 },
  { kind: "diamond", x: 18, y: 30, s: 14, d: 8, dl: -1, dx: 10, dy: -18, c: 0, o: 0.8 },
  { kind: "diamond", x: 92, y: 46, s: 18, d: 10, dl: -4, dx: -12, dy: 16, c: 2, o: 0.75 },
  { kind: "diamond", x: 46, y: 6, s: 10, d: 9, dl: -2, dx: 8, dy: 14, c: 1, o: 0.8 },
  { kind: "square", x: 70, y: 10, s: 16, d: 12, dl: -5, dx: -14, dy: 18, c: 1, o: 0.7 },
  { kind: "square", x: 26, y: 84, s: 20, d: 14, dl: -7, dx: 16, dy: -16, c: 3, o: 0.6 },
  { kind: "ring", x: 36, y: 20, s: 22, d: 10, dl: -3, dx: -8, dy: 20, c: 2, o: 0.7 },
  { kind: "ring", x: 60, y: 88, s: 28, d: 16, dl: -9, dx: 12, dy: -14, c: 0, o: 0.55 },
  { kind: "dot", x: 14, y: 52, s: 6, d: 6, dl: -1, dx: 6, dy: -12, c: 2, o: 0.9 },
  { kind: "dot", x: 52, y: 40, s: 5, d: 7, dl: -3, dx: -6, dy: 12, c: 1, o: 0.8 },
  { kind: "dot", x: 76, y: 56, s: 7, d: 8, dl: -2, dx: 8, dy: -10, c: 0, o: 0.85 },
  { kind: "dot", x: 94, y: 88, s: 5, d: 6, dl: -4, dx: -6, dy: -12, c: 3, o: 0.8 },
  { kind: "dot", x: 30, y: 62, s: 4, d: 9, dl: -6, dx: 5, dy: 10, c: 1, o: 0.7 },
  { kind: "dot", x: 66, y: 30, s: 4, d: 7, dl: -1, dx: -5, dy: -9, c: 2, o: 0.8 },
  { kind: "dot", x: 4, y: 92, s: 6, d: 10, dl: -5, dx: 7, dy: -11, c: 0, o: 0.8 },
];

const PALETTES = {
  brand: ["#2563eb", "#7c3aed", "#f43f5e", "#4f46e5"],
  hot: ["#e11d48", "#f43f5e", "#fb7185", "#be123c"],
} as const;

export default function FloatingShapes({ tone = "brand" }: { tone?: keyof typeof PALETTES }) {
  const colors = PALETTES[tone];
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {SHAPES.map((sh, i) => {
        const style = {
          "--x": `${sh.x}%`,
          "--y": `${sh.y}%`,
          "--s": `${sh.s}px`,
          "--d": `${sh.d}s`,
          "--dl": `${sh.dl}s`,
          "--dx": `${sh.dx}px`,
          "--dy": `${sh.dy}px`,
          "--c": colors[sh.c % colors.length],
          "--o": sh.o,
        } as CSSProperties;
        return (
          <span key={i} className={`shape shape-${sh.kind}`} style={style}>
            {sh.kind === "poly" && (
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
                <polygon points="50,4 92,28 92,72 50,96 8,72 8,28" />
                <polyline points="50,4 50,50 92,72" />
                <polyline points="50,50 8,72" />
                <polyline points="8,28 50,50 92,28" />
              </svg>
            )}
          </span>
        );
      })}
    </div>
  );
}

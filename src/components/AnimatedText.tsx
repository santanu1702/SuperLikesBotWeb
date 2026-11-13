import { createElement, type CSSProperties, type ElementType, type ReactNode } from "react";

export interface TextPart {
  text: string;
  /** Paint this segment with the blue-to-purple brand gradient (slowly flowing). */
  gradient?: boolean;
  /** Colour family of the gradient: "brand" = blue/purple (default), "hot" = red/pink, "light" = pale tint for dark backgrounds. */
  tone?: "brand" | "hot" | "light";
}

interface Props {
  text: string | TextPart[];
  /** "letters" animates every character, "words" animates word by word (for long paragraphs). */
  mode?: "letters" | "words";
  as?: ElementType;
  className?: string;
  id?: string;
  /** Delay before the first unit animates (ms). */
  delay?: number;
  /** Set to false to keep gradient segments static (used by the logo). Default: true. */
  flow?: boolean;
}

const HEADING = /^h[1-6]$/;
const MAX_TOTAL_MS = 900; // whole text finishes staggering within ~0.9s so long strings never feel slow

/**
 * Letter-by-letter (or word-by-word) entrance animation.
 * - Words stay unbreakable, so line wrapping behaves normally.
 * - Gradient segments get a blue → indigo → purple gradient that flows smoothly across their letters
 *   (pure CSS, see `.ch-g` in index.css; each letter is phase-shifted by `--g`).
 * - Screen readers get the full text (aria-label on headings, a hidden copy elsewhere).
 * - The animation starts when the element gets `.is-visible` (see useReveal).
 */
export default function AnimatedText({ text, mode = "letters", as = "span", className = "", id, delay = 0, flow = true }: Props) {
  const parts: TextPart[] = typeof text === "string" ? [{ text }] : text;
  const full = parts.map((p) => p.text).join("");

  const units = mode === "words" ? full.split(/\s+/).filter(Boolean).length : Array.from(full.replace(/\s/g, "")).length;
  const gap = Math.min(mode === "words" ? 70 : 30, MAX_TOTAL_MS / Math.max(units, 1));
  let n = 0;

  const nodes: ReactNode[] = parts.map((part, pi) => {
    const letters = Array.from(part.text.replace(/\s/g, "")).length;
    let local = 0;
    return part.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((tok, ti) => {
        if (/^\s+$/.test(tok)) return tok.includes("\n") ? <br key={`${pi}-${ti}`} /> : " ";

        if (mode === "words") {
          const style = { "--d": `${Math.round(delay + n++ * gap)}ms` } as CSSProperties;
          return (
            <span key={`${pi}-${ti}`} className="ch inline-block whitespace-nowrap" style={style}>
              {tok}
            </span>
          );
        }

        return (
          <span key={`${pi}-${ti}`} className="inline-block whitespace-nowrap">
            {Array.from(tok).map((ch, ci) => {
              const i = local++;
              const style = {
                "--d": `${Math.round(delay + n++ * gap)}ms`,
                // position of this letter inside its gradient segment (0 → 1), used as the flow phase
                ...(part.gradient && flow ? { "--g": letters > 1 ? (i / (letters - 1)).toFixed(3) : "0" } : {}),
                // static variant (logo): the original continuous gradient spread across the letters
                ...(part.gradient && !flow
                  ? {
                      backgroundSize: `${letters * 100}% 100%`,
                      backgroundPosition: `${letters > 1 ? (i / (letters - 1)) * 100 : 0}% 0`,
                    }
                  : {}),
              } as CSSProperties;
              const cls = part.gradient
                ? `${flow ? "ch ch-g" : "ch ch-g ch-static"}${part.tone === "hot" ? " ch-hot" : part.tone === "light" ? " ch-light" : ""}`
                : "ch";
              return (
                <span key={ci} className={cls} style={style} data-ch={part.gradient ? ch : undefined}>
                  {ch}
                </span>
              );
            })}
          </span>
        );
      });
  });

  const isHeading = HEADING.test(String(as));

  return createElement(
    as,
    {
      id,
      className: `split-text ${className}`.trim(),
      ...(isHeading ? { "aria-label": full } : {}),
    },
    <span aria-hidden="true">{nodes}</span>,
    !isHeading && <span className="sr-only">{full}</span>,
  );
}

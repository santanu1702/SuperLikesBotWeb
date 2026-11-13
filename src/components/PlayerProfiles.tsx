import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { PROFILES } from "../data/profiles";
import { useInView, usePrefersReducedMotion } from "../hooks/useInView";

const COPIES = 3; // the list is repeated so the carousel can loop seamlessly
const SPEED = 0.04; // px per millisecond (~40px per second)

/**
 * Horizontal carousel of the profile cards the site owner supplied. It drifts left on its own and can
 * be scrolled or swiped by hand: touch, mouse hover, wheel and keyboard focus pause the drift.
 */
export default function PlayerProfiles() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const holdRef = useRef(false);
  const resumeTimer = useRef(0);
  const inView = useInView(scrollerRef);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const third = () => el.scrollWidth / COPIES;
    // start on the middle copy so there is room to scroll both ways
    el.scrollLeft = third();

    const wrap = () => {
      const w = third();
      if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
      else if (el.scrollLeft < w * 0.01) el.scrollLeft += w;
    };

    const hold = (ms = 0) => {
      holdRef.current = true;
      window.clearTimeout(resumeTimer.current);
      if (ms > 0) resumeTimer.current = window.setTimeout(() => (holdRef.current = false), ms);
    };
    const release = (ms = 1500) => hold(ms);

    const onEnter = () => hold();
    const onLeave = () => release(600);
    const onDown = () => hold();
    const onUp = () => release();
    const onWheel = () => release(2000);

    el.addEventListener("scroll", wrap, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp, { passive: true });
    el.addEventListener("touchcancel", onUp, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);

    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    const frame = (now: number) => {
      const dt = last ? Math.min(now - last, 50) : 0;
      last = now;
      if (holdRef.current) {
        pos = el.scrollLeft; // follow the visitor's own scrolling
      } else {
        pos += dt * SPEED;
        const w = third();
        if (pos >= w * 2) pos -= w;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(frame);
    };
    if (inView && !reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer.current);
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("touchcancel", onUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
    };
  }, [inView, reduced]);

  return (
    <section id="profiles" aria-labelledby="profiles-heading" className="py-14 sm:py-20">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-4 sm:px-6">
        <div className="min-w-0">
          <p className="chip">
            ◆ <AnimatedText text="Community" />
          </p>
          <AnimatedText
            as="h2"
            id="profiles-heading"
            className="mt-5 text-3xl font-black uppercase tracking-tight sm:text-5xl"
            text={[{ text: "Live Player " }, { text: "Profiles", gradient: true }]}
          />
          <AnimatedText
            as="p"
            mode="words"
            delay={250}
            className="muted mt-4 block max-w-xl text-base sm:text-lg"
            text="Explore real Free Fire profiles enjoying daily likes access."
          />
        </div>
        <span
          aria-hidden="true"
          className="hidden h-24 w-24 shrink-0 animate-float place-items-center rounded-[28px] bg-brand-gradient text-white shadow-glow sm:grid"
        >
          <Zap size={44} fill="currentColor" />
        </span>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-label="Player profile cards, scroll sideways to browse"
        tabIndex={0}
        className="no-scrollbar mt-10 flex gap-4 overflow-x-auto overscroll-x-contain px-4 py-4 [mask-image:linear-gradient(90deg,transparent,#000_5%,#000_95%,transparent)] sm:gap-6 sm:px-6"
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          PROFILES.map((p) => (
            <figure
              key={`${p.id}-${copy}`}
              aria-hidden={copy === 1 ? undefined : true}
              className="profile-card group relative shrink-0 overflow-hidden rounded-2xl border border-white/70 bg-navy-900 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover dark:border-white/10"
            >
              <img
                src={p.src}
                width={p.width}
                height={p.height}
                alt={copy === 1 ? p.alt : ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="block h-[104px] w-auto select-none sm:h-[132px]"
              />
            </figure>
          )),
        )}
      </div>
    </section>
  );
}

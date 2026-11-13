import { ArrowRight, Heart, Send } from "lucide-react";
import { LINKS } from "../data/links";
import AnimatedText from "./AnimatedText";
import Countdown from "./Countdown";
import FloatingShapes from "./FloatingShapes";

const goToPlans = () => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-16">
      {/* animated gradient backdrop, floating particles and a slow HUD ring */}
      <div aria-hidden="true" className="hero-bg" />
      <FloatingShapes tone="brand" />
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="hud-ring -z-10 text-royal/50 dark:text-blue-300/40"
        fill="none"
        stroke="currentColor"
      >
        <g className="hud-spin">
          <circle cx="100" cy="100" r="96" strokeWidth="0.6" strokeDasharray="2 5" />
          <circle cx="100" cy="100" r="78" strokeWidth="0.5" strokeDasharray="30 8" />
        </g>
        <g className="hud-spin-rev">
          <circle cx="100" cy="100" r="62" strokeWidth="0.5" strokeDasharray="1 4" />
          <path d="M100 2v14M100 184v14M2 100h14M184 100h14" strokeWidth="1" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="chip mx-auto">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-royal" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-royal" />
          </span>
          <AnimatedText text="Autolike Service Active" />
        </p>

        <AnimatedText
          as="p"
          delay={120}
          className="mt-6 block text-xs font-black uppercase tracking-[0.32em] text-slate2 dark:text-slate-300 sm:text-sm"
          text="Free Fire Profile Likes"
        />

        <AnimatedText
          as="h1"
          delay={250}
          className="mt-3 text-[3.1rem] font-black leading-[1.02] tracking-tight sm:text-7xl md:text-8xl"
          text={[{ text: "Likes land at\n" }, { text: "4 AM.", gradient: true }]}
        />

        <AnimatedText
          as="p"
          mode="words"
          delay={800}
          className="mx-auto mt-5 block max-w-xl text-lg font-bold leading-snug text-ink dark:text-white sm:text-2xl"
          text="Choose your plan once. Wake up to your daily likes."
        />

        <div className="mt-7 animate-fade-up" style={{ animationDelay: "1100ms" }}>
          <Countdown />
        </div>

        <div
          className="mt-8 flex animate-fade-up flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center"
          style={{ animationDelay: "1250ms" }}
        >
          <div className="btn-glow sm:min-w-[15rem]">
            <button type="button" className="btn-gradient btn-shine w-full !px-10 !py-[1.15rem] text-lg" onClick={goToPlans}>
              <AnimatedText text="See Plans" delay={1300} />
              <ArrowRight size={20} className="animate-nudge" />
            </button>
          </div>
          <a href={LINKS.group} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Send size={18} className="text-royal dark:text-blue-300" />
            <AnimatedText text="Join Autolike Group" delay={1400} />
          </a>
          <a href={LINKS.likeGroup} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Heart size={18} className="text-violet-brand dark:text-violet-300" />
            <AnimatedText text="Join Like Group" delay={1500} />
          </a>
        </div>

        <AnimatedText
          as="p"
          mode="words"
          delay={1600}
          className="muted mx-auto mt-8 block max-w-xl text-sm leading-relaxed sm:text-base"
          text="Boost Your Free Fire Account With Sanatani Autolikes. Fast, simple and affordable Free Fire autolike service. Choose your preferred package and contact us to place your order."
        />

        <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.22em] text-slate2 dark:text-slate-400">
          <AnimatedText delay={1800} text="India Server Only" /> <span aria-hidden="true">🇮🇳</span>
        </p>
      </div>
    </section>
  );
}

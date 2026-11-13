import { Zap } from "lucide-react";
import AnimatedText from "./AnimatedText";

export default function DailyLikes() {
  return (
    <section aria-labelledby="daily-heading" className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="reveal relative mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-brand-gradient p-7 text-white shadow-glow sm:p-12">
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
          <span className="grid h-20 w-20 shrink-0 animate-float place-items-center rounded-3xl bg-white/15 ring-1 ring-white/30 backdrop-blur">
            <Zap size={38} fill="currentColor" />
          </span>
          <div>
            <AnimatedText
              as="h2"
              id="daily-heading"
              className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/80"
              text="Daily Autolike Service"
            />
            <AnimatedText
              as="p"
              delay={300}
              className="mt-2 text-4xl font-black tracking-tight sm:text-5xl"
              text={[{ text: "200+ Daily Likes", gradient: true, tone: "light" }]}
            />
            <AnimatedText
              as="p"
              mode="words"
              delay={700}
              className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
              text="Daily likes service information and package details. Contact us for availability and order confirmation."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

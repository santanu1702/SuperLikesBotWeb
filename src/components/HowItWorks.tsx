import type { CSSProperties } from "react";
import { BellRing, ClipboardList, Heart, Package, ShoppingBag, Sparkles } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { STEPS, type StepIcon } from "../data/steps";

const ICONS: Record<StepIcon, typeof Package> = {
  package: Package,
  purchase: ShoppingBag,
  details: ClipboardList,
  likes: Heart,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="chip mx-auto">
            ◆ <AnimatedText text="Easy Steps" />
          </p>
          <AnimatedText
            as="h2"
            id="how-heading"
            className="mt-5 text-3xl font-black uppercase tracking-tight sm:text-5xl"
            text={[{ text: "How It " }, { text: "Works", gradient: true }]}
          />
          <AnimatedText
            as="p"
            mode="words"
            delay={300}
            className="muted mt-4 block text-base sm:text-lg"
            text="Getting started with SANATANI AUTOLIKES is simple. Follow these easy steps and enjoy automatic likes every day."
          />
        </div>

        <ol className="mt-14 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            const last = i === STEPS.length - 1;
            return (
              <li key={step.id} className="reveal relative" style={{ transitionDelay: `${i * 90}ms` }}>
                <article
                  className={`group relative h-full overflow-hidden rounded-[28px] p-6 transition duration-300 hover:-translate-y-1.5 sm:p-7 ${
                    last
                      ? "step-final text-white shadow-glow hover:shadow-card-hover"
                      : "card hover:shadow-card-hover"
                  }`}
                >
                  {last && (
                    <>
                      <span aria-hidden="true" className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
                      <Sparkles
                        aria-hidden="true"
                        size={20}
                        className="absolute right-5 top-16 animate-float text-white/70"
                      />
                    </>
                  )}

                  <div className="relative flex items-center justify-between gap-3">
                    <span className="relative">
                      {last && (
                        <span
                          aria-hidden="true"
                          className="step-ping absolute inset-0 rounded-2xl bg-white/40"
                          style={{ animation: "step-ping 2.2s ease-out infinite" }}
                        />
                      )}
                      <span
                        className={`relative grid h-14 w-14 place-items-center rounded-2xl transition duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                          last ? "bg-white/20 text-white ring-1 ring-white/40 backdrop-blur" : "bg-brand-gradient text-white shadow-glow"
                        }`}
                      >
                        <Icon size={26} strokeWidth={2.2} fill={last ? "currentColor" : "none"} />
                      </span>
                    </span>
                    <span
                      style={{ "--sheen-delay": `${i * 0.6}s` } as CSSProperties}
                      className={`sheen rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] ${
                        last
                          ? "bg-white/20 text-white ring-1 ring-white/30"
                          : "border border-indigo-100 bg-indigo-50/70 text-royal dark:border-white/10 dark:bg-white/5 dark:text-blue-300"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  <AnimatedText
                    as="h3"
                    className="relative mt-6 text-xl font-extrabold"
                    text={step.title}
                    delay={200}
                  />
                  <AnimatedText
                    as="p"
                    mode="words"
                    delay={450}
                    className={`relative mt-3 block text-sm leading-relaxed sm:text-[15px] ${last ? "text-white/90" : "muted"}`}
                    text={step.description}
                  />

                  {last && (
                    <p className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold ring-1 ring-white/25">
                      <BellRing size={14} aria-hidden="true" /> Telegram bot notifications
                    </p>
                  )}
                </article>

                {/* connectors: horizontal on desktop, vertical on phones */}
                {!last && (
                  <>
                    <span
                      aria-hidden="true"
                      className="step-conn step-conn-x absolute left-full top-[3.45rem] hidden h-1 w-10 lg:block"
                    />
                    <span
                      aria-hidden="true"
                      className="step-conn step-conn-y absolute left-[3.2rem] top-full h-6 w-1 sm:hidden"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

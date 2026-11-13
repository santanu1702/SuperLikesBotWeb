import { lazy, Suspense } from "react";
import { TriangleAlert, Globe as GlobeIcon } from "lucide-react";
import AnimatedText from "./AnimatedText";
import DeferUntilVisible from "./DeferUntilVisible";

// The 3D globe is code-split: it is only downloaded when the visitor scrolls near this section.
const Globe = lazy(() => import("./Globe"));

export default function ServerSupport() {
  return (
    <section id="server" aria-labelledby="server-heading" className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="card reveal mx-auto max-w-5xl p-6 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <span className="mx-auto grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 text-royal dark:from-royal/20 dark:to-violet-brand/25 dark:text-blue-300 lg:mx-0">
              <GlobeIcon size={30} />
            </span>
            <AnimatedText
              as="h2"
              id="server-heading"
              className="mt-5 text-2xl font-black uppercase tracking-[0.12em] text-slate2 dark:text-slate-300 sm:text-3xl"
              text="Supported Server"
            />
            <AnimatedText
              as="p"
              delay={200}
              className="mt-2 block text-4xl font-black uppercase tracking-tight sm:text-5xl"
              text={[{ text: "India ", gradient: true, tone: "hot" }, { text: "Server", gradient: true, tone: "hot" }]}
            />
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white shadow-glow">
              <span aria-hidden="true">🇮🇳</span> India Server Only
            </p>
            <AnimatedText
              as="p"
              mode="words"
              delay={400}
              className="mt-4 block text-lg font-bold text-ink dark:text-white"
              text="Dedicated support for India server accounts."
            />
            <AnimatedText
              as="p"
              mode="words"
              delay={600}
              className="muted mt-2 block text-base sm:text-lg"
              text="Currently, our service supports India Server accounts only."
            />

            <div
              role="alert"
              className="mt-5 flex items-start gap-3 rounded-2xl border-2 border-amber-400/70 bg-amber-50 p-4 text-left text-amber-900 dark:border-amber-400/50 dark:bg-amber-400/10 dark:text-amber-200"
            >
              <TriangleAlert size={22} className="mt-0.5 shrink-0" />
              <p className="font-bold">Other server accounts are not supported.</p>
            </div>
          </div>

          <figure className="globe-panel relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] p-3 sm:p-4">
            <DeferUntilVisible className="aspect-square w-full">
              <Suspense fallback={null}>
                <Globe />
              </Suspense>
            </DeferUntilVisible>
            <figcaption className="absolute inset-x-0 bottom-4 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-black/45 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-rose-400" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
                </span>
                India Server
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

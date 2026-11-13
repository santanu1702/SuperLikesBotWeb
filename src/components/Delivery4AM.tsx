import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import AnimatedText from "./AnimatedText";
import DeferUntilVisible from "./DeferUntilVisible";
import FloatingShapes from "./FloatingShapes";
import Warrior from "./Warrior";
import { DELIVERY } from "../data/site";

// The 3D ring is code-split: it is only downloaded when the visitor scrolls near this section.
const TorusRing = lazy(() => import("./TorusRing"));

const goToPlans = () => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function Delivery4AM() {
  return (
    <section id="delivery" aria-labelledby="delivery-heading" className="px-4 py-12 sm:px-6 sm:py-20">
      <div className="delivery-card reveal relative isolate mx-auto max-w-6xl overflow-hidden rounded-[36px] px-6 py-14 sm:px-12 sm:py-20">
        <FloatingShapes tone="hot" />
        <div aria-hidden="true" className="delivery-aura -z-10" />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          <div className="text-center lg:text-left">
            <AnimatedText
              as="p"
              className="block text-xs font-black uppercase tracking-[0.34em] text-rose-700 dark:text-rose-300 sm:text-sm"
              text="Daily Delivery"
            />
            <AnimatedText
              as="h2"
              id="delivery-heading"
              delay={150}
              className="mt-4 text-5xl font-black leading-[1.04] tracking-tight sm:text-7xl"
              text={[{ text: "Likes land at\n" }, { text: `${DELIVERY.label}.`, gradient: true, tone: "hot" }]}
            />
            <AnimatedText
              as="p"
              mode="words"
              delay={700}
              className="mx-auto mt-6 block max-w-md text-lg font-semibold leading-snug text-rose-950/80 dark:text-rose-100/80 sm:text-xl lg:mx-0"
              text="Every morning. Automatic delivery. Notifications from our bot."
            />
            <div className="mt-9 flex justify-center lg:justify-start">
              <div className="btn-glow hot w-full max-w-[16rem]">
                <button
                  type="button"
                  className="btn-gradient btn-shine btn-hot w-full !px-10 !py-[1.15rem] text-lg"
                  onClick={goToPlans}
                >
                  <AnimatedText text="See Plans" delay={900} />
                  <ArrowRight size={20} className="animate-nudge" />
                </button>
              </div>
            </div>
          </div>

          {/* ring + warrior: the box keeps its size while the 3D ring loads */}
          <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-md lg:max-w-none">
            <div aria-hidden="true" className="ring-glow" />
            <DeferUntilVisible className="absolute inset-0">
              <Suspense fallback={null}>
                <TorusRing />
              </Suspense>
            </DeferUntilVisible>
            <Warrior className="warrior absolute -bottom-2 right-0 w-[48%] drop-shadow-[0_18px_28px_rgba(120,10,40,0.35)] sm:w-[44%]" />
          </div>
        </div>
      </div>
    </section>
  );
}

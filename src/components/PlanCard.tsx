import { ArrowRight, Crown, Flame, Heart, Star, Zap } from "lucide-react";
import { durationLabel, type Plan, type PlanIcon } from "../data/plans";
import AnimatedText from "./AnimatedText";

const ICONS: Record<PlanIcon, typeof Zap> = {
  demo: Zap,
  starter: Flame,
  pro: Heart,
  premium: Crown,
};

export default function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const Icon = ICONS[plan.icon];
  return (
    <article
      className={`card reveal group relative flex flex-col p-6 active:scale-[0.985] hover:-translate-y-2 hover:shadow-card-hover sm:p-7 ${
        plan.popular ? "ring-2 ring-violet-brand/70 dark:ring-violet-400/70" : ""
      }`}
      style={{ transitionDelay: `${index * 70}ms` }}
      aria-labelledby={`plan-${plan.id}`}
    >
      {plan.popular && (
        <span className="popular-badge absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-gradient px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-glow ring-2 ring-white/70 dark:ring-navy-800">
          <Star size={12} fill="currentColor" aria-hidden="true" />
          Popular
        </span>
      )}

      <div className="flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 text-royal transition group-hover:scale-110 dark:from-royal/20 dark:to-violet-brand/25 dark:text-blue-300">
          <Icon size={26} strokeWidth={2.2} />
        </span>
        <span className="rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-slate2 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          {durationLabel(plan.days)}
        </span>
      </div>

      <AnimatedText as="h3" id={`plan-${plan.id}`} className="mt-6 text-xl font-extrabold" text={plan.name} />

      <p className="mt-2 flex items-start gap-1 font-black leading-none">
        <AnimatedText className="mt-2 text-2xl" text={[{ text: "₹", gradient: true }]} delay={200} />
        <AnimatedText
          className="text-6xl tracking-tight"
          text={[{ text: String(plan.price), gradient: true }]}
          delay={260}
        />
      </p>

      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-3.5 dark:border-white/10 dark:bg-white/5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-brand dark:bg-violet-brand/25 dark:text-violet-300">
          <Heart size={20} />
        </span>
        <div className="min-w-0">
          <AnimatedText as="p" className="text-lg font-extrabold leading-tight" text={plan.likes} delay={400} />
          <AnimatedText as="p" mode="words" className="muted text-sm" text={plan.description} delay={600} />
        </div>
      </div>

      <div className="btn-glow mt-6">
        <a
          href={plan.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient btn-shine w-full whitespace-nowrap !px-4"
          aria-label={`${plan.buttonLabel} – opens Telegram chat in a new tab`}
        >
          <AnimatedText text={plan.buttonLabel} delay={800} />
          <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </a>
      </div>
      <AnimatedText as="p" mode="words" delay={900} className="muted mt-3 block text-center text-xs" text="Opens Telegram. Order is confirmed by support." />
    </article>
  );
}

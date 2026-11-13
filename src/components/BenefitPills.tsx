import { BellRing, CalendarClock, Globe, UserCheck } from "lucide-react";
import type { ComponentType } from "react";

const BENEFITS: { icon: ComponentType<{ size?: number; className?: string }>; label: string }[] = [
  { icon: CalendarClock, label: "Daily Scheduled Likes" },
  { icon: Globe, label: "Supported India Server" },
  { icon: UserCheck, label: "Easy Account Setup" },
  { icon: BellRing, label: "Automatic Service Notifications" },
];

/** Pill-shaped feature chips shown under the pricing heading. */
export default function BenefitPills() {
  return (
    <ul className="mx-auto mt-8 flex max-w-3xl list-none flex-wrap justify-center gap-3 p-0">
      {BENEFITS.map(({ icon: Icon, label }, i) => (
        <li
          key={label}
          className="reveal group inline-flex items-center gap-2.5 rounded-full border border-indigo-200/90 bg-white/75 px-4 py-2.5 text-sm font-bold text-ink shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-card dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-violet-400"
          style={{ transitionDelay: `${i * 70}ms` }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-white">
            <Icon size={15} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

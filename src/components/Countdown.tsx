import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { DELIVERY, msUntilNextDelivery } from "../data/site";

const pad = (n: number) => String(n).padStart(2, "0");

/** Live countdown to the next scheduled like delivery (see DELIVERY in data/site.ts). */
export default function Countdown({ className = "" }: { className?: string }) {
  const [ms, setMs] = useState(() => msUntilNextDelivery());

  useEffect(() => {
    const tick = () => setMs(msUntilNextDelivery());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  const cells: [string, string][] = [
    [pad(h), "hrs"],
    [pad(m), "min"],
    [pad(s), "sec"],
  ];

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div
        role="timer"
        aria-label={`Next scheduled likes in ${h} hours, ${m} minutes and ${s} seconds`}
        className="inline-flex items-center gap-3 rounded-2xl border border-indigo-200/80 bg-white/75 px-4 py-3 shadow-card backdrop-blur dark:border-white/15 dark:bg-white/5 sm:gap-4 sm:px-5"
      >
        <span className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-slate2 dark:text-slate-300">
          <Clock size={16} className="text-royal dark:text-blue-300" aria-hidden="true" />
          Next drop in
        </span>
        <span className="flex items-start gap-1.5" aria-hidden="true">
          {cells.map(([value, label], i) => (
            <span key={label} className="flex items-start gap-1.5">
              <span className="flex min-w-[2.6rem] flex-col items-center">
                <span className="gradient-text text-2xl font-black tabular-nums leading-none sm:text-3xl">{value}</span>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate2 dark:text-slate-400">
                  {label}
                </span>
              </span>
              {i < 2 && <span className="pt-0.5 text-2xl font-black leading-none text-indigo-300 sm:text-3xl">:</span>}
            </span>
          ))}
        </span>
      </div>
      <p className="text-xs font-semibold text-slate2 dark:text-slate-400">
        Scheduled daily at {DELIVERY.label} {DELIVERY.zoneLabel}
      </p>
    </div>
  );
}

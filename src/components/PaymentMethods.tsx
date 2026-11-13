import { QrCode, ShieldCheck, Wallet } from "lucide-react";
import type { ComponentType } from "react";
import AnimatedText from "./AnimatedText";
import { PAYMENT_METHODS } from "../data/site";

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  upi: QrCode,
};

/** Shows only the payment methods marked `enabled` in data/site.ts. Renders nothing if there are none. */
export default function PaymentMethods() {
  const methods = PAYMENT_METHODS.filter((m) => m.enabled);
  if (methods.length === 0) return null;

  return (
    <section aria-labelledby="payments-heading" className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatedText
          as="p"
          className="block text-xs font-black uppercase tracking-[0.4em] text-slate2 dark:text-slate-400 sm:text-sm"
          text="Payment Methods"
        />
        <AnimatedText
          as="h2"
          id="payments-heading"
          delay={200}
          className="mt-4 text-3xl font-black tracking-tight sm:text-5xl"
          text={[{ text: "We " }, { text: "accept", gradient: true }]}
        />

        <ul className="mt-9 flex list-none flex-wrap justify-center gap-4 p-0">
          {methods.map((m, i) => {
            const Icon = ICONS[m.id] ?? Wallet;
            return (
              <li
                key={m.id}
                className="border-spin reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4 px-6 py-4 text-left">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                    <Icon size={24} />
                  </span>
                  <span>
                    <span className="block text-xl font-black leading-tight">{m.label}</span>
                    <span className="muted block text-sm">{m.note}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="muted mx-auto mt-7 flex max-w-md items-start justify-center gap-2 text-sm">
          <ShieldCheck size={18} className="mt-0.5 shrink-0 text-royal dark:text-blue-300" aria-hidden="true" />
          Payment is arranged with our support team on Telegram after you choose a plan.
        </p>
      </div>
    </section>
  );
}

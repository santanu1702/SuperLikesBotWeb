import { Globe, Heart, Megaphone, MessageCircle, Send } from "lucide-react";
import Logo from "./Logo";
import { LINKS } from "../data/links";
import AnimatedText from "./AnimatedText";

const FOOT_LINKS = [
  { label: "Autolike Group", href: LINKS.group, icon: Send },
  { label: "Like Group", href: LINKS.likeGroup, icon: Heart },
  { label: "Main Channel", href: LINKS.channel, icon: Megaphone },
  { label: "Contact", href: LINKS.support, icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer className="relative mt-6 overflow-hidden border-t border-indigo-100 bg-white/70 px-4 pb-8 pt-14 dark:border-white/10 dark:bg-navy-900/70 sm:px-6">
      <div aria-hidden="true" className="footer-line" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-violet-brand/10 blur-3xl dark:bg-violet-brand/20" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo size="sm" />
            <AnimatedText
              as="p"
              mode="words"
              className="muted mt-4 block max-w-sm text-sm leading-relaxed"
              text="Affordable Free Fire autolike service packages. Choose a plan and contact our support team on Telegram."
            />
          </div>

          <nav aria-label="Footer links">
            <AnimatedText as="h2" className="text-sm font-extrabold uppercase tracking-widest" text="Links" />
            <ul className="mt-4 space-y-3">
              {FOOT_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="muted group inline-flex items-center gap-2 text-sm font-semibold transition hover:text-royal dark:hover:text-blue-300"
                  >
                    <Icon size={15} className="transition group-hover:scale-110" aria-hidden="true" />
                    <AnimatedText text={label} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <AnimatedText as="h2" className="text-sm font-extrabold uppercase tracking-widest" text="Supported Server" />
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
              <span aria-hidden="true">🇮🇳</span> <AnimatedText text="India Server Only" />
            </p>
            <p className="muted mt-3 flex items-center gap-2 text-sm font-semibold">
              <Globe size={15} aria-hidden="true" /> Supported server: India
            </p>
          </div>
        </div>

        <div className="muted mt-10 flex flex-col items-center justify-between gap-3 border-t border-indigo-100 pt-6 text-center text-sm dark:border-white/10 sm:flex-row sm:text-left">
          <AnimatedText as="p" mode="words" text="© 2026 Sanatani Autolikes. All Rights Reserved." />
          <p>
            Powered by{" "}
            <a
              href={LINKS.support}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-text font-extrabold hover:underline"
            >
              @TheRealSanatani
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import Logo from "./Logo";
import type { Theme } from "../hooks/useTheme";

const NAV = [
  { id: "plans", label: "Autolike Plans" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

interface Props {
  theme: Theme;
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item whose section is currently in view.
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isDark = theme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        scrolled
          ? "border-indigo-100 bg-white/85 shadow-sm dark:border-white/10 dark:bg-navy-950/85"
          : "border-transparent bg-white/60 dark:bg-navy-950/60"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
          aria-label="Sanatani Autolikes – back to top"
          className="min-w-0"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
                aria-current={active === n.id ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active === n.id
                    ? "bg-brand-gradient text-white shadow-glow"
                    : "text-slate2 hover:bg-indigo-50 hover:text-ink dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-indigo-100 bg-white/80 text-royal transition hover:scale-105 hover:border-violet-300 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-amber-300"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-indigo-100 bg-white/80 text-ink transition active:scale-95 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-indigo-100 bg-white/95 transition-[max-height,opacity] duration-300 md:hidden dark:border-white/10 dark:bg-navy-950/95 ${
          open ? "max-h-72 opacity-100" : "max-h-0 border-t-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 p-3">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                tabIndex={open ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  go(n.id);
                }}
                className={`block rounded-2xl px-4 py-3.5 text-base font-bold ${
                  active === n.id
                    ? "bg-brand-gradient text-white"
                    : "text-ink hover:bg-indigo-50 dark:text-white dark:hover:bg-white/10"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

import { Heart, Megaphone, Send, Users } from "lucide-react";
import { LINKS } from "../data/links";
import AnimatedText from "./AnimatedText";

const ITEMS = [
  {
    id: "group",
    icon: Users,
    title: "Join Our Autolike Group",
    description: "Join our Telegram group for service updates and support.",
    button: "Join Group",
    href: LINKS.group,
  },
  {
    id: "likes",
    icon: Heart,
    title: "Join Our Like Group",
    description: "Join our Telegram like group for likes updates and community support.",
    button: "Join Like Group",
    href: LINKS.likeGroup,
  },
  {
    id: "channel",
    icon: Megaphone,
    title: "Join Our Main Channel",
    description: "Stay updated with announcements and latest information.",
    button: "Join Channel",
    href: LINKS.channel,
  },
];

export default function Community() {
  return (
    <section aria-labelledby="community-heading" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="chip mx-auto">
            ◆ <AnimatedText text="Community" />
          </p>
          <AnimatedText
            as="h2"
            id="community-heading"
            className="mt-5 text-3xl font-black tracking-tight sm:text-4xl"
            text={[{ text: "Stay " }, { text: "Connected", gradient: true }, { text: " on Telegram" }]}
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="card reveal flex flex-col p-7 hover:-translate-y-1.5 hover:shadow-card-hover"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                    <Icon size={26} />
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300">
                    <Send size={17} />
                  </span>
                </div>
                <AnimatedText as="h3" className="mt-5 text-xl font-extrabold" text={item.title} />
                <AnimatedText as="p" mode="words" className="muted mt-2 flex-1" text={item.description} delay={300} />
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient mt-6 w-full"
                >
                  <Send size={18} /> <AnimatedText text={item.button} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

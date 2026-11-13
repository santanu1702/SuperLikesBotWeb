import { MessageCircle } from "lucide-react";
import { LINKS } from "../data/links";
import AnimatedText from "./AnimatedText";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="card reveal mx-auto max-w-3xl p-8 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
          <MessageCircle size={30} />
        </span>
        <AnimatedText
          as="h2"
          id="contact-heading"
          className="mt-6 text-3xl font-black tracking-tight sm:text-4xl"
          text={[{ text: "Need Help With Your " }, { text: "Order?", gradient: true }]}
        />
        <AnimatedText
          as="p"
          mode="words"
          delay={300}
          className="muted mx-auto mt-4 block max-w-lg text-base sm:text-lg"
          text="Have questions about packages or service availability? Contact our support team."
        />
        <a
          href={LINKS.support}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient mt-8 w-full sm:w-auto sm:px-10"
        >
          <MessageCircle size={18} /> <AnimatedText text="Contact Support" delay={500} />
        </a>
      </div>
    </section>
  );
}

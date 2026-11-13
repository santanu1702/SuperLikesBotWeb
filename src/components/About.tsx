import AnimatedText from "./AnimatedText";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="chip mx-auto">
          ◆ <AnimatedText text="About" />
        </p>
        <AnimatedText
          as="h2"
          id="about-heading"
          className="mt-5 text-3xl font-black tracking-tight sm:text-4xl"
          text={[{ text: "About " }, { text: "Sanatani Autolikes", gradient: true }]}
        />
        <AnimatedText
          as="p"
          mode="words"
          delay={300}
          className="muted mt-5 block text-base leading-relaxed sm:text-lg"
          text="Sanatani Autolikes provides affordable Free Fire autolike service packages for supported India Server accounts. Choose a suitable package and contact our support team through Telegram."
        />
      </div>
    </section>
  );
}

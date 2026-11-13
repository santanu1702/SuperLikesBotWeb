import AnimatedText from "./AnimatedText";

interface LogoProps {
  size?: "sm" | "md";
}

export default function Logo({ size = "md" }: LogoProps) {
  const box = size === "md" ? "h-11 w-11 rounded-[14px] text-2xl" : "h-10 w-10 rounded-xl text-xl";
  return (
    <span className="inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`${box} grid shrink-0 place-items-center bg-brand-gradient font-black leading-none text-white shadow-glow`}
      >
        S
      </span>
      <AnimatedText
        className="text-[15px] font-black uppercase leading-none tracking-tight sm:text-lg"
        flow={false}
        text={[{ text: "Sanatani " }, { text: "Autolikes", gradient: true }]}
      />
    </span>
  );
}

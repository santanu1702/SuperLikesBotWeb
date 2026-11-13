import PlanCard from "./PlanCard";
import AnimatedText from "./AnimatedText";
import BenefitPills from "./BenefitPills";
import { PLANS } from "../data/plans";

export default function Pricing() {
  return (
    <section id="plans" aria-labelledby="plans-heading" className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="chip mx-auto">
            ◆ <AnimatedText text="The Plans" />
          </p>
          <AnimatedText
            as="h2"
            id="plans-heading"
            className="mt-5 text-3xl font-black tracking-tight sm:text-5xl"
            text={[{ text: "Choose your " }, { text: "plan.", gradient: true }]}
          />
          <AnimatedText
            as="p"
            mode="words"
            className="muted mt-4 block text-base sm:text-lg"
            text="Select your preferred package and enjoy automatic daily likes."
          />
          <BenefitPills />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

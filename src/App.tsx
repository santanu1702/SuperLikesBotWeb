import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PlayerProfiles from "./components/PlayerProfiles";
import Pricing from "./components/Pricing";
import PaymentMethods from "./components/PaymentMethods";
import Delivery4AM from "./components/Delivery4AM";
import HowItWorks from "./components/HowItWorks";
import DailyLikes from "./components/DailyLikes";
import ServerSupport from "./components/ServerSupport";
import Community from "./components/Community";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useTheme } from "./hooks/useTheme";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  const { theme, toggle } = useTheme();
  useReveal();

  return (
    <div className="min-h-screen overflow-x-clip bg-gradient-to-b from-lavender via-[#E9EAFF] to-lavender transition-colors duration-300 dark:from-navy-950 dark:via-navy-900 dark:to-navy-950">
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <PlayerProfiles />
        <Pricing />
        <PaymentMethods />
        <Delivery4AM />
        <HowItWorks />
        <DailyLikes />
        <ServerSupport />
        <Community />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

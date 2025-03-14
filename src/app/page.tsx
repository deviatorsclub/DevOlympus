import RulesSection from "@/components/RulesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/Schedule";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <RulesSection />
      <ScheduleSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

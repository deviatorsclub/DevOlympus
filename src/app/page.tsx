import RulesSection from "@/components/RulesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/Schedule";
import ThemesSection from "@/components/TheneSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <RulesSection />
      <ThemesSection />
      <ScheduleSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

import RulesSection from "@/components/RulesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/Schedule";
import ThemesSection from "@/components/TheneSection";
import SponsorsSection from "@/components/SponsorsSection";
import PriceSection from "@/components/PriceSection";
import LeadOrganizersSection from "@/components/LeadOrganizersSection";
import JudgesSection from "@/components/JudgesSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ThemesSection />
      <ScheduleSection />
      <RulesSection />
      <JudgesSection />
      <PriceSection />
      <SponsorsSection />
      <LeadOrganizersSection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

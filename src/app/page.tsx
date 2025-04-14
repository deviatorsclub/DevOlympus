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
import { prisma } from "@/prisma";

export default async function Home() {
  const [totalUsers, teams] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
  ]);
  return (
    <main className="flex-1">
      <HeroSection totalUsers={totalUsers} teams={teams} />
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

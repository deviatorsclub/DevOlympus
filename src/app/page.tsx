import RulesSection from "@/components/RulesSection";
import FAQSection from "@/components/FAQSection";
import RegistrationSection from "@/components/RegistrationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScheduleSection from "@/components/Schedule";

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br bg-black text-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <RulesSection />
        <ScheduleSection />
        <FAQSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

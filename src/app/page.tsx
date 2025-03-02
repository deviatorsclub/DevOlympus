import React from "react";
import {
  CalendarClock,
  Clock,
  Users,
  MapPin,
  Award,
  BookOpen,
  Code,
  Zap,
} from "lucide-react";

import RulesSection from "@/components/RulesSection";
import FAQSection from "@/components/FAQSection";
import RegistrationSection from "@/components/RegistrationSection";
import OrganizersSection from "@/components/OrganizersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterSection";
import DeviatorsLogo from "@/assets/sm.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br bg-black text-white">
      <header className="container mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-3">
          <Image
            src={DeviatorsLogo}
            alt="Deviators Club"
            width={200}
            height={50}
            className="h-8 w-auto md:h-10"
          />
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#about"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#schedule"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            Schedule
          </a>
          <a
            href="#rules"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            Rules
          </a>
          <a
            href="#faqs"
            className="text-slate-300 hover:text-primary transition-colors"
          >
            FAQs
          </a>
          <a
            href="#register"
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-6 font-medium text-white shadow-md transition-colors hover:from-primary/90 hover:to-purple-500/90"
          >
            Register
          </a>
        </nav>
        <button className="block md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
          <div className="relative mb-6 md:mb-8 inline-block">
            <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="text-[#762faf]">DEV-OLYMPUS</span>
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-primary to-purple-500 opacity-50 blur-xl"></div>
          </div>

          <p className="mb-8 max-w-xs sm:max-w-md md:max-w-2xl text-lg sm:text-xl md:text-2xl text-slate-300">
            An intense 30-hour innovation sprint where the sharpest minds ascend
            to new heights, building real-world solutions that make an impact.
          </p>

          <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">30 Hours</h3>
              <p className="text-sm text-slate-400">Non-stop hacking</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">3-4 Members</h3>
              <p className="text-sm text-slate-400">Per team</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">In-College</h3>
              <p className="text-sm text-slate-400">DCE Campus</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <Award className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-medium">Exciting Prizes</h3>
              <p className="text-sm text-slate-400">For winners</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#register"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-8 font-medium text-white shadow-md transition-colors hover:from-primary/90 hover:to-purple-500/90 w-full sm:w-auto"
            >
              Register Now
            </a>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 px-8 font-medium text-white shadow-sm transition-colors hover:bg-slate-800 w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>

          <div className="mt-12 w-full max-w-4xl px-4">
            <div className="flex items-center gap-2 mb-4">
              <CalendarClock className="h-5 w-5 text-primary" />
              <span className="text-lg text-slate-300 font-medium">
                Tentative Dates
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                <h3 className="font-medium text-primary mb-2">
                  Registration & Ideation
                </h3>
                <p className="text-sm text-slate-300">
                  March 10th - March 20th, 2025
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                <h3 className="font-medium text-primary mb-2">
                  Idea Evaluation
                </h3>
                <p className="text-sm text-slate-300">
                  March 22nd - March 23rd, 2025
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="text-[#762faf]">DevOlympus</span>
              </h2>
              <p className="max-w-2xl mx-auto text-slate-300">
                Where innovation meets determination
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700">
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Learn</h3>
                <p className="text-center text-slate-300">
                  Participate in industry-led seminars and hands-on workshops
                  exposing you to real-world tech applications.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700">
                <Code className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Build</h3>
                <p className="text-center text-slate-300">
                  Work on open-ended themes with round-the-clock mentoring to
                  craft cutting-edge solutions to real problems.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700">
                <Zap className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-medium mb-2">Compete</h3>
                <p className="text-center text-slate-300">
                  Push your creativity, problem-solving, and technical expertise
                  to the limit, competing for exciting prizes.
                </p>
              </div>
            </div>

            <div className="mt-16 max-w-3xl mx-auto text-slate-300 bg-slate-800/30 p-6 rounded-lg border border-slate-700">
              <p className="mb-4">
                DevOlympus is an intense 30-hour innovation sprint where
                participants work on developing real-world solutions.
                Shortlisted teams from the ideation phase will experience an
                in-college development marathon, working on innovative projects.
              </p>
              <p className="mb-4">
                With mentoring available throughout the event, a fun night of
                brainstorming, and a structured prototype phase, every second
                counts. Participants will refine ideas, craft cutting-edge
                solutions, and present their work to expert judges.
              </p>
              <p>
                From coding battles to strategic innovation, DevOlympus is
                designed to forge the next generation of tech leaders at
                Dronacharya College of Engineering.
              </p>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Event <span className="text-[#762faf]">Schedule</span>
              </h2>
              <p className="max-w-2xl mx-auto text-slate-300">
                A 30-hour journey of innovation and creativity
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4 text-primary">
                  Preliminary Round (Online)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      March 10th
                    </div>
                    <div>
                      <h4 className="font-medium">Registration Opens</h4>
                      <p className="text-sm text-slate-300">
                        Devfolio registration begins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      March 11-12th
                    </div>
                    <div>
                      <h4 className="font-medium">Ideation Phase</h4>
                      <p className="text-sm text-slate-300">
                        Teams submit their project ideas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      March 20th
                    </div>
                    <div>
                      <h4 className="font-medium">Registration Closes</h4>
                      <p className="text-sm text-slate-300">
                        Final deadline for submissions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      March 22-23rd
                    </div>
                    <div>
                      <h4 className="font-medium">Idea Evaluation</h4>
                      <p className="text-sm text-slate-300">
                        Results announcement for shortlisted teams
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4 text-primary">
                  Hackathon Day 1
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      09:00 - 10:00
                    </div>
                    <div>
                      <h4 className="font-medium">Registration & Check-in</h4>
                      <p className="text-sm text-slate-300">
                        Teams arrive and register for the event
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      10:00 - 11:00
                    </div>
                    <div>
                      <h4 className="font-medium">Opening Ceremony</h4>
                      <p className="text-sm text-slate-300">
                        Welcoming speech and hackathon kickoff
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      13:00 - 14:00
                    </div>
                    <div>
                      <h4 className="font-medium">Lunch Break</h4>
                      <p className="text-sm text-slate-300">
                        Food provided for all participants
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      14:00 - 15:00
                    </div>
                    <div>
                      <h4 className="font-medium">Sponsor Showcase</h4>
                      <p className="text-sm text-slate-300">
                        Sponsors present their technologies
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex-shrink-0 w-32 text-right font-medium">
                      16:00 - 18:00
                    </div>
                    <div>
                      <h4 className="font-medium">Mentoring Session</h4>
                      <p className="text-sm text-slate-300">
                        Teams receive guidance from industry mentors
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use the separate components we created */}
        <RulesSection />
        <FAQSection />
        <RegistrationSection />
        <OrganizersSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

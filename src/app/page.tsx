import Link from "next/link";
import { CalendarClock } from "lucide-react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import DeviatorsLogo from "@/assets/sm.png";

export default function ComingSoonPage() {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
      </header>

      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-8 md:py-12 text-center">
        <div className="relative mb-6 md:mb-8 inline-block">
          <h1 className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              DEVOLYMPUS
            </span>
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-primary to-purple-500 opacity-50 blur-xl"></div>
        </div>

        <p className="mb-6 sm:mb-8 max-w-xs sm:max-w-md md:max-w-2xl text-lg sm:text-xl md:text-2xl text-slate-300">
          The ultimate hackathon experience is coming soon. Get ready to code,
          create, and conquer.
        </p>

        <div className="mb-8 sm:mb-12 flex items-center gap-2 text-base sm:text-lg text-slate-300">
          <CalendarClock className="h-5 w-5 text-primary" />
          <span>Stay tuned for dates and registration details</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="mailto:clubdeviators@gmail.com"
            className="inline-flex h-10 sm:h-12 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 px-4 sm:px-6 font-medium text-white shadow-sm transition-colors hover:bg-slate-800 w-full sm:w-auto"
          >
            Become a Sponsor
          </Link>
        </div>
      </main>

      <footer className="container mx-auto p-4 sm:p-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-4 sm:pt-6 text-slate-400 sm:flex-row">
          <p className="text-sm sm:text-base text-center sm:text-left">
            © {new Date().getFullYear()} Deviators Club. All rights reserved.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="https://github.com/deviatorsclub"
              className="hover:text-primary"
            >
              <FaGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/deviators-club"
              className="hover:text-primary text-sm sm:text-base"
            >
              Linkedin
            </Link>
            <Link
              href="https://www.instagram.com/deviatorsclub"
              className="hover:text-primary text-sm sm:text-base"
            >
              Instagram
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

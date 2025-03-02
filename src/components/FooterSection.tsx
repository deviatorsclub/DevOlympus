import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-slate-400 sm:flex-row">
          <p className="text-sm sm:text-base text-center sm:text-left">
            © {new Date().getFullYear()} Deviators Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
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
              LinkedIn
            </Link>
            <Link
              href="https://www.instagram.com/deviatorsclub"
              className="hover:text-primary text-sm sm:text-base"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

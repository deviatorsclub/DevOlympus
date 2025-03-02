import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in{" "}
            <span className="text-[#762faf]">
              Touch
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Have questions? Reach out to us
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Contact Information
            </h3>
            <ul className="space-y-4 text-slate-300">
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>clubdeviators@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Dronacharya College of Engineering, Khentawas, Gurugram
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/deviatorsclub"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <FaGithub className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/deviators-club"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <FaLinkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://www.instagram.com/deviatorsclub"
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Sponsorship Inquiry
            </h3>
            <p className="text-slate-300 mb-6">
              Interested in sponsoring DevOlympus? We offer various sponsorship
              packages that provide visibility to your brand and access to
              talented students.
            </p>
            <a
              href="mailto:clubdeviators@gmail.com"
              className="inline-flex h-10 items-center justify-center rounded-md border border-slate-700 bg-slate-800/50 px-6 font-medium text-white shadow-sm transition-colors hover:bg-slate-800 w-full"
            >
              Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

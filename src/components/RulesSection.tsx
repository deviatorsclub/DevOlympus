import { ArrowRight } from "lucide-react";

export default function RulesSection() {
  return (
    <section id="rules" className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rules &{" "}
            <span className="text-[#762faf]">
              Guidelines
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            What you need to know before participating
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Team Requirements
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Teams must consist of 3-4 members</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Diversity in team composition is encouraged</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>All team members must be enrolled in college</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Each team must designate one team leader</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Project Guidelines
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>All code must be written during the hackathon</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Open-source libraries and APIs are permitted</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Projects must address real-world problems</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>
                  Final submissions must include source code and presentation
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Event Conduct
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Respect all participants, mentors, and organizers</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Maintain a clean and organized workspace</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Report any issues to the organizing committee</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Follow all college rules and regulations</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-lg border border-slate-700">
            <h3 className="text-xl font-medium mb-4 text-primary">
              Judging Criteria
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Innovation and creativity (25%)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Technical implementation (25%)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Impact and practicality (25%)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span>Presentation and demonstration (25%)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

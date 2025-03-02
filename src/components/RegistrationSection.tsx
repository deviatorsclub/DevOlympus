export default function RegistrationSection() {
  return (
    <section id="register" className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Register for{" "}
            <span className="text-[#762faf]">
              DevOlympus
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Join us for an unforgettable hackathon experience
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800/30 p-8 rounded-lg border border-slate-700">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium mb-4">
              Registration Opens March 10th
            </h3>
            <p className="text-slate-300 mb-6">
              Sign up on Devfolio to participate in the hackathon
            </p>
            <a
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-primary to-purple-500 px-8 font-medium text-white shadow-md transition-colors hover:from-primary/90 hover:to-purple-500/90"
            >
              Register on Devfolio
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="font-medium mb-2 text-primary">
                Registration Process
              </h4>
              <ol className="space-y-2 text-slate-300 list-decimal list-inside">
                <li>Create a Devfolio account</li>
                <li>Form a team (3-4 members)</li>
                <li>Submit your project idea</li>
                <li>Wait for shortlisting results</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-primary">Important Dates</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <span className="font-medium">Registration Opens:</span> March
                  10th, 2025
                </li>
                <li>
                  <span className="font-medium">Registration Closes:</span>{" "}
                  March 20th, 2025
                </li>
                <li>
                  <span className="font-medium">Idea Evaluation:</span> March
                  22-23rd, 2025
                </li>
                <li>
                  <span className="font-medium">Hackathon:</span> To be
                  announced
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

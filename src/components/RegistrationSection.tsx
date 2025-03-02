export default function RegistrationSection() {
  return (
    <section id="register" className="py-16 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Register for{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
              DevOlympus
            </span>
          </h2>
        </div>

        <div className="max-w-xl mx-auto bg-slate-800/30 p-8 rounded-lg border border-slate-700 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block">
            Coming Soon
          </h3>

          <div className="mt-6 text-slate-300">
            <p className="mb-6">
              <span className="font-medium">Registration Opens:</span> March
              10th, 2025
            </p>
            <p>
              <span className="font-medium">Hackathon Dates:</span> To be
              announced
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

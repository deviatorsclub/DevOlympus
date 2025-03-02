export default function OrganizersSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Organized by{" "}
            <span className="text-[#762faf]">
              Deviators
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            The tech community at Dronacharya College of Engineering
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-800/30 p-8 rounded-lg border border-slate-700">
          <div className="text-center mb-6">
            <h3 className="text-xl font-medium mb-2">About Deviators</h3>
            <p className="text-slate-300">
              At DEVIATORS, we thrive on innovation and collaboration,
              constantly pushing the boundaries of technology. We are dedicated
              to enhancing learning, fostering creativity, and creating
              impactful experiences for our community.
            </p>
          </div>

          <div className="mt-8">
            <h4 className="font-medium mb-4 text-primary text-center">
              Organizing Committee
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2">Lead Organizers</h5>
                <p className="text-slate-300">
                  Krishna, Kanak, Divyansh, Ayush, Pooja
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Technical Team</h5>
                <p className="text-slate-300">
                  Manages technical issues and provides guidance
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Media & Design</h5>
                <p className="text-slate-300">
                  Handles event branding and documentation
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">Volunteer Team</h5>
                <p className="text-slate-300">
                  Assists participants throughout the event
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

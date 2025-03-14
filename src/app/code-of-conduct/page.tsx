"use client";

import React, { useState } from "react";

const CodeOfConduct = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    if (expandedSection === index) {
      setExpandedSection(null);
    } else {
      setExpandedSection(index);
    }
  };

  const sections = [
    {
      title: "Applicability",
      icon: "📍",
      content: (
        <>
          <p className="mb-4">
            This policy applies to all spaces related to DEVOLYMPUS, including:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>Hackathon events (in-person and virtual)</li>
            <li>Talks, presentations, and demonstrations</li>
            <li>Workshops and learning sessions</li>
            <li>Social events and gatherings</li>
            <li>Social media channels and online forums</li>
          </ul>
          <p>
            This Code of Conduct equally applies to all sponsors, partners, and
            projects created during the hackathon.
          </p>
        </>
      ),
    },
    {
      title: "Original Work & Disclosure",
      icon: "🔍",
      content: (
        <>
          <p className="mb-4">
            We value innovation and original thinking. Participants should:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create projects specifically during the hackathon timeframe</li>
            <li>
              Disclose any pre-existing or reused code with your submission
            </li>
            <li>
              Be prepared to explain similarities and differences if using
              previous work
            </li>
          </ul>
          <p className="mt-4 text-purple-300 font-semibold">
            Failure to disclose reused code may result in disqualification.
          </p>
        </>
      ),
    },
    {
      title: "Commitment to Inclusivity",
      icon: "🤝",
      content: (
        <>
          <p className="mb-4">
            DEVOLYMPUS is dedicated to providing a safe, comfortable, and
            harassment-free environment for everyone. We do not tolerate
            discrimination based on:
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-6 mb-4">
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Gender or gender
              identity
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Age
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Sexual orientation
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Disability
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Physical
              appearance
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Body size
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Race or ethnicity
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Nationality
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Religion
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Political views
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Experience level
            </div>
            <div className="flex items-center">
              <span className="text-purple-400 mr-2">•</span> Tech stack
              preferences
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Zero Tolerance for Harassment",
      icon: "⛔",
      content: (
        <>
          <p className="mb-4">
            We maintain a zero-tolerance policy for harassment in any form,
            including:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Offensive or discriminatory verbal comments</li>
            <li>Public display of sexual material</li>
            <li>Deliberate intimidation or stalking</li>
            <li>Disruption of talks or activities</li>
            <li>Inappropriate physical contact</li>
            <li>Unwelcome sexual advances</li>
            <li>Non-consensual photography or recording</li>
          </ul>
          <p className="mt-4 text-purple-300 italic">
            Everyone deserves to feel comfortable and respected throughout the
            event.
          </p>
        </>
      ),
    },
    {
      title: "Consent for Photography & Recording",
      icon: "📸",
      content: (
        <>
          <p className="mb-4">
            While we encourage documenting the event, always:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Give participants a reasonable chance to opt out of being
              photographed
            </li>
            <li>
              Delete content immediately if someone objects after it&apos;s taken
            </li>
            <li>Take reasonable steps to remove shared content if requested</li>
            <li>
              Respect privacy in sensitive areas (bathrooms, resting areas)
            </li>
          </ul>
          <p className="mt-4 text-purple-300">
            Always prioritize people&apos;s comfort and privacy over documentation.
          </p>
        </>
      ),
    },
    {
      title: "Creating a Safe Space",
      icon: "🛡️",
      content: (
        <p>
          No sponsors, partners, or participants shall use sexualized images,
          activities, or material. The use of sexualized
          clothing/uniforms/costumes and anything creating a sexualized
          environment is prohibited. We strive to maintain a professional,
          welcoming atmosphere for all participants.
        </p>
      ),
    },
    {
      title: "Intellectual Property Rights",
      icon: "💡",
      content: (
        <>
          <p className="mb-4">
            You will maintain ownership of all your developments, including all
            intellectual property rights. By submitting your project on our
            platform:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You grant us a non-exclusive, worldwide, royalty-free license
            </li>
            <li>
              This license is limited to displaying and providing services on
              our platform
            </li>
            <li>We will never exploit or steal your creations</li>
          </ul>
          <p className="mt-4 text-purple-300 font-semibold">
            Your ideas remain your own.
          </p>
        </>
      ),
    },
    {
      title: "Reporting Violations",
      icon: "🚨",
      content: (
        <>
          <p className="mb-4">
            If you notice violations or concerning behavior:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Contact a member of the organizing committee immediately</li>
            <li>We&apos;ll help contact security or law enforcement if needed</li>
            <li>All reports will be handled with discretion</li>
          </ul>
          <p className="text-purple-300 font-semibold">
            Your safety and comfort are our priority.
          </p>
        </>
      ),
    },
    {
      title: "Consequences of Violations",
      icon: "⚠️",
      content: (
        <>
          <p className="mb-4">
            If a participant violates this Code of Conduct, organizers may, at
            their discretion:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Expel them from the hackathon with no refund</li>
            <li>Block their access to platform resources</li>
            <li>Report their behavior to local law enforcement</li>
          </ul>
          <p className="mt-4 italic">
            We are committed to ensuring a positive experience for all
            participants.
          </p>
        </>
      ),
    },
    {
      title: "Contact Information",
      icon: "📞",
      content: (
        <>
          <p className="mb-4">
            If you have witnessed or experienced any transgressions of this Code
            of Conduct, please contact:
          </p>
          <div className="bg-purple-900/30 p-4 rounded-lg">
            <p className="font-semibold">DEVOLYMPUS Organizing Team</p>
            <p className="text-purple-300">conduct@devolympus.dev</p>
            <p>Bengaluru - 560075</p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-8">
            CODE OF CONDUCT
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At DEVOLYMPUS, we&apos;re committed to creating an inclusive, respectful,
            and productive environment for all participants. This Code of
            Conduct outlines our expectations for everyone involved.
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-gray-900/70 rounded-lg overflow-hidden shadow-md border border-purple-900/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">{section.icon}</span>
                  <h3 className="text-xl font-semibold text-purple-300">
                    {section.title}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    expandedSection === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 pb-5 transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedSection === index
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-purple-800/50 pt-4 text-gray-300">
                  {section.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;

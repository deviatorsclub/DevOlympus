"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700 overflow-hidden">
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-primary" />
        ) : (
          <ChevronDown className="h-5 w-5 text-primary" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 pt-0 text-slate-300 border-t border-slate-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const faqs = [
    {
      question: "What should I bring to the hackathon?",
      answer:
        "You should bring your laptop, charger, any necessary adapters, a water bottle, and personal items for an overnight stay. Food and drinks will be provided throughout the event. Consider bringing a change of clothes and toiletries for a more comfortable experience.",
    },
    {
      question: "Do I need to have a team before registering?",
      answer:
        "While it's recommended to form a team before registering, you can also register individually and we'll help you find team members during the team formation phase. Teams must have 3-4 members to participate in the hackathon.",
    },
    {
      question: "What technical resources will be provided?",
      answer:
        "We'll provide high-speed Wi-Fi, power outlets, workspace, and mentor support. You'll need to bring your own devices (laptops, etc.). Some cloud resources and APIs may be available through our sponsors.",
    },
    {
      question: "Can I participate remotely?",
      answer:
        "DevOlympus is an in-person hackathon held at Dronacharya College of Engineering. All team members must be physically present for the entire duration of the event to qualify for prizes and certificates.",
    },
    {
      question: "What happens after my team is selected?",
      answer:
        "Selected teams will receive official confirmation via email with detailed instructions, venue information, and any pre-hackathon requirements. Make sure to arrive on time for the check-in on the day of the event.",
    },
  ];

  return (
    <section id="faqs" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked{" "}
            <span className="text-[#762faf]">
              Questions
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300">
            Get answers to common questions about DevOlympus
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

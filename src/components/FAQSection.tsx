"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data";

export default function SimplifiedFAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const toggleFaq = useCallback((faqIndex: number) => {
    setActiveFaq((prev) => (prev === faqIndex ? null : faqIndex));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="faqs"
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-purple-900/5 to-slate-900/0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center mb-12 transition-all duration-700 
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="text-purple-500 relative">
              Questions
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`space-y-4 transition-all duration-700
              ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            style={{ transitionDelay: "200ms" }}
          >
            {FAQS.map((faq, idx) => (
              <FAQAccordion
                key={idx}
                faq={faq}
                index={idx}
                isActive={activeFaq === idx}
                onToggle={toggleFaq}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQAccordion({
  faq,
  isActive,
  onToggle,
  index,
  isVisible,
}: {
  faq: { question: string; answer: string };
  isActive: boolean;
  onToggle: (index: number) => void;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`border border-slate-700 rounded-lg overflow-hidden transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{
        transitionDelay: `${200 + index * 100}ms`,
        backgroundColor: isActive
          ? "rgba(30, 41, 59, 0.5)"
          : "rgba(15, 23, 42, 0.3)",
      }}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span
          className={`font-medium transition-colors 
          ${isActive ? "text-white" : "text-slate-300"}`}
        >
          {faq.question}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-300
          ${isActive ? "transform rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isActive ? "max-h-80" : "max-h-0"}`}
      >
        <div
          className={`px-5 pb-5 text-slate-300 text-sm md:text-base transition-all duration-300
            ${
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          style={{ transitionDelay: isActive ? "75ms" : "0ms" }}
        >
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

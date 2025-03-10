"use client";

import { useState, useRef, useEffect, useCallback, JSX } from "react";
import { Check, ChevronDown } from "lucide-react";
import { categories } from "@/data";
import { CategoryData } from "@/types";

export default function RulesSection(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const toggleCategory = useCallback((categoryId: string): void => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="rules"
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
            Rules &{" "}
            <span className="text-purple-500 relative">
              Guidelines
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
            {categories.map((category, idx) => (
              <CategoryAccordion
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onToggle={toggleCategory}
                index={idx}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CategoryAccordionProps = {
  category: CategoryData;
  isActive: boolean;
  onToggle: (id: string) => void;
  index: number;
  isVisible: boolean;
};

function CategoryAccordion({
  category,
  isActive,
  onToggle,
  index,
  isVisible,
}: CategoryAccordionProps): JSX.Element {
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
        onClick={() => onToggle(category.id)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center
            ${
              isActive
                ? "bg-purple-500/20 text-purple-400"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            {category.icon}
          </div>
          <span
            className={`font-medium transition-colors 
            ${isActive ? "text-white" : "text-slate-300"}`}
          >
            {category.title}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-300
          ${isActive ? "transform rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
          ${isActive ? "max-h-80" : "max-h-0"}`}
      >
        <ul className="px-5 pb-5 space-y-3">
          {category.rules.map((rule, idx) => (
            <li
              key={rule.id}
              className={`flex items-start gap-3 transition-all duration-300
                ${
                  isActive
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              <div className="mt-1 flex-shrink-0">
                <Check className="h-4 w-4 text-purple-500" />
              </div>
              <span className="text-slate-300 text-sm md:text-base">
                {rule.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

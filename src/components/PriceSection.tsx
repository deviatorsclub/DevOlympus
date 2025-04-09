"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, Medal, Trophy, Star, LucideRocket } from "lucide-react";

export default function PriceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-repeat opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-purple-900/10 to-slate-900/0"></div>

      <div className="absolute top-20 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`text-center mb-10 sm:mb-16 transition-all duration-700 
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Prize{" "}
            <span className="text-purple-500 relative inline-block">
              Pool
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto px-2">
            Compete for amazing prizes and exclusive rewards
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-8 sm:gap-6 md:gap-8 relative">
            <div
              className={`relative z-10 transition-all duration-700 mb-8 md:mb-0 ${isVisible ? "opacity-100 md:translate-y-0" : "opacity-0 md:translate-y-12"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="w-full max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Medal className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border-2 border-blue-400">
                      <span className="text-sm font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Second Prize
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2 sm:mb-3">
                    ₹10,000
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2">
                    For the second best project
                  </p>
                  <div className="w-12 h-1 bg-blue-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <div
              className={`relative z-20 transition-all duration-700 mb-8 md:mb-0 ${isVisible ? "opacity-100 md:translate-y-0" : "opacity-0 md:translate-y-12"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 md:scale-110">
                <div className="h-2 w-full bg-gradient-to-r from-amber-500 to-pink-500"></div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-400 to-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border-2 border-amber-400">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    First Prize
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-400 mb-2 sm:mb-3">
                    ₹15,000
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2">
                    For the best project overall
                  </p>
                  <div className="w-12 h-1 bg-amber-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <div
              className={`relative z-10 transition-all duration-700 mb-8 md:mb-0 ${isVisible ? "opacity-100 md:translate-y-0" : "opacity-0 md:translate-y-12"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-full max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
                <div className="h-2 w-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border-2 border-purple-400">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Third Prize
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2 sm:mb-3">
                    ₹5,000
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2">
                    For the third best project
                  </p>
                  <div className="w-12 h-1 bg-purple-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <div
              className={`relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
                <div className="h-2 w-full bg-gradient-to-r from-green-400 to-teal-500"></div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <LucideRocket className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border-2 border-green-400">
                      <Star className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    API.market Track
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-2 sm:mb-3">
                    ₹10,000
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2">
                    Special prize for best use of API.market APIs
                  </p>
                  <div className="w-12 h-1 bg-green-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { Trophy, Gift, Medal, Star, Award } from "lucide-react";

export default function PriceSection(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

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
                    ₹5,000
                  </p>
                  <div className="w-12 h-1 bg-blue-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <div
              className={`relative z-20 transition-all duration-700 mb-8 md:mb-0 md:-mt-16 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="w-full max-w-[260px] xs:max-w-[280px] sm:max-w-[300px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 shadow-lg shadow-purple-500/20">
                <div className="h-2 w-full bg-gradient-to-r from-yellow-400 to-amber-500"></div>
                <div className="p-5 sm:p-6 md:p-8 text-center">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-10 h-10 flex items-center justify-center border-2 border-yellow-400">
                      <span className="text-base font-bold">1</span>
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    First Prize
                  </h3>
                  <p className="text-3xl sm:text-4xl font-bold text-amber-400 mb-3 sm:mb-4">
                    ₹10,000
                  </p>
                  <div className="w-16 h-1 bg-amber-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <div
              className={`relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 md:translate-y-0" : "opacity-0 md:translate-y-12"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="w-full max-w-[220px] xs:max-w-[240px] sm:max-w-[260px] mx-auto bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700">
                <div className="h-2 w-full bg-gradient-to-r from-rose-400 to-pink-500"></div>
                <div className="p-4 sm:p-6 text-center">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Medal className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border-2 border-pink-400">
                      <span className="text-sm font-bold">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    Third Prize
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-pink-400 mb-2 sm:mb-3">
                    ₹3,000
                  </p>
                  <div className="w-12 h-1 bg-pink-500/30 mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`max-w-5xl mx-auto mt-16 sm:mt-20 md:mt-24 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <div
              className={`relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700 p-5 sm:p-6 md:p-8 hover:border-purple-500/50 transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-purple-400" />
                    <Gift className="w-6 h-6 text-blue-400" />
                    <Star className="w-6 h-6 text-amber-400" />
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    Exclusive Gifts for Everyone
                  </h4>

                  <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                    All participants will receive exclusive swag kits and
                    digital certificates. Additional sponsor gifts will be
                    distributed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { sponsors } from "@/data";

const SponsorsSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-20 relative">
      <div className="absolute top-0 left-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-600"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl mb-16 md:text-4xl lg:text-5xl font-bold">
            Our{" "}
            <span className="text-purple-500 relative">
              Sponsors
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            DEVOLYMPUS is made possible thanks to the generous support of our
            amazing sponsors.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {sponsors.map((sponsor, index) => (
            <Link
              href={sponsor.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-gray-900 border border-purple-600/30 rounded-lg p-6 flex flex-col items-center hover:shadow-[0_0_15px_rgba(147,51,234,0.5)] transition-shadow duration-300">
                <div className="relative w-36 h-36 mb-4 flex items-center justify-center">
                  <img
                    src={sponsor.image.src}
                    alt={sponsor.name}
                    className="p-2 size-full"
                  />
                </div>
                <h3 className="text-white text-lg font-semibold group-hover:text-purple-400 transition-colors duration-300">
                  {sponsor.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;

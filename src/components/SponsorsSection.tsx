// @/components/SponsorsSection.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sponsors } from "@/data";

const SponsorsSection: React.FC = () => {
  return (
    <section className="w-full bg-black py-20 relative">
      {/* Purple corner accents similar to those in the header */}
      <div className="absolute top-0 left-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute top-0 right-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 bg-purple-600"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-purple-600"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-purple-600 mb-4 uppercase tracking-wider">
            Our Sponsors
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
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="p-2"
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

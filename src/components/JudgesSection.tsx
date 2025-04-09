"use client";

import { judges } from "@/data";
import { motion } from "framer-motion";

export default function JudgesSection() {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Our Esteemed Judges
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Meet the industry experts who will be evaluating your creations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {judges.map((judge, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden w-[250px] rounded-xl bg-gradient-to-b from-gray-900 to-black border border-gray-700 p-4 flex flex-col items-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4"
                style={{
                  width: "180px",
                }}
              >
                <img
                  src={judge.image.src}
                  alt={judge.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-center w-full">
                <h3 className="text-xl font-bold mb-2 text-white">
                  {judge.name}
                </h3>
                <p className="text-gray-400 text-sm text-balance">{judge.oneLiner}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

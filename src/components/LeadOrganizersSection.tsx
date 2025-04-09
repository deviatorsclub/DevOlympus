"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StaticImageData } from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ExternalLink } from "lucide-react";

import ayushImage from "@/assets/lead-organizers/ayush.webp";
import kanakImage from "@/assets/lead-organizers/kanak.webp";
import kkImage from "@/assets/lead-organizers/kk.webp";
import pulkitImage from "@/assets/lead-organizers/pulkit.webp";
import yashImage from "@/assets/lead-organizers/yash.webp";

const leadOrganizers: {
  name: string;
  image: StaticImageData;
  github: string;
  linkedin: string;
  twitter?: string;
  portfolio?: string;
}[] = [
  {
    name: "Ayush Goyal",
    image: ayushImage,
    github: "https://github.com/agayushh",
    linkedin: "https://www.linkedin.com/in/ayush-goyal-b4491324b",
    twitter: "http://x.com/agayushh",
  },
  {
    name: "Kanak Tanwar",
    image: kanakImage,
    github: "https://github.com/kanakOS01",
    linkedin: "https://www.linkedin.com/in/kanak-tanwar",
    twitter: "https://x.com/kanaktwts",
  },
  {
    name: "Krishna Kartikay Bhatt",
    image: kkImage,
    github: "https://github.com/kkbhatt07",
    linkedin: "https://www.linkedin.com/in/krishna-kartikay-bhatt/",
  },
  {
    name: "Pulkit",
    image: pulkitImage,
    github: "https://github.com/pulkitxm",
    linkedin: "https://www.linkedin.com/in/pulkit-dce",
    twitter: "https://x.com/devpulkitt",
    portfolio: "https://pulkitxm.com",
  },
  {
    name: "Yash Kumar",
    image: yashImage,
    github: "https://github.com/Hero-Alpha",
    linkedin: "https://www.linkedin.com/in/yash-kumar-4a936426b/",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export default function LeadOrganizersSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="team"
      ref={ref}
      className="relative py-12 sm:py-16 md:py-20 bg-slate-900/50 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="container mx-auto px-4"
      >
        <h2 className="text-center text-3xl mb-16 md:text-4xl lg:text-5xl font-bold">
          Lead{" "}
          <span className="text-purple-500 relative">
            Organizers
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></span>
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {leadOrganizers.map((organizer) => (
            <motion.div
              key={organizer.name}
              variants={sectionVariants}
              className="bg-slate-800/40 border border-slate-700 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg h-full"
            >
              <motion.div
                className="aspect-square relative overflow-hidden group"
                variants={imageVariants}
              >
                <img
                  src={organizer.image.src}
                  alt={organizer.name}
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <div className="p-3 sm:p-4 md:p-5 text-center">
                <h3 className="font-bold text-base sm:text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent truncate max-w-full">
                  {organizer.name}
                </h3>

                <div className="flex justify-center space-x-2 sm:space-x-3">
                  <motion.a
                    variants={sectionVariants}
                    whileTap={{ scale: 0.9 }}
                    href={organizer.github}
                    className="bg-slate-700/50 p-1.5 sm:p-2 rounded-full text-slate-300 hover:text-blue-400 hover:bg-slate-700/80 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaGithub className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  <motion.a
                    variants={sectionVariants}
                    whileTap={{ scale: 0.9 }}
                    href={organizer.linkedin}
                    className="bg-slate-700/50 p-1.5 sm:p-2 rounded-full text-slate-300 hover:text-blue-400 hover:bg-slate-700/80 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>

                  {organizer.twitter && (
                    <motion.a
                      variants={sectionVariants}
                      whileTap={{ scale: 0.9 }}
                      href={organizer.twitter}
                      className="bg-slate-700/50 p-1.5 sm:p-2 rounded-full text-slate-300 hover:text-blue-400 hover:bg-slate-700/80 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Twitter</span>
                    </motion.a>
                  )}

                  {organizer.portfolio && (
                    <motion.a
                      variants={sectionVariants}
                      whileTap={{ scale: 0.9 }}
                      href={organizer.portfolio}
                      className="bg-slate-700/50 p-1.5 sm:p-2 rounded-full text-slate-300 hover:text-blue-400 hover:bg-slate-700/80 transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Portfolio</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

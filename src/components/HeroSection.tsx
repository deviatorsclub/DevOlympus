"use client";

import {
  CalendarClock,
  Clock,
  Users,
  MapPin,
  Award,
  BookOpen,
  Code,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function HeroSection() {
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-32 md:py-40 text-center overflow-hidden">
        {/* Background animated shapes */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 md:mb-8 inline-block"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
              delay: 0.2,
            }}
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
              DEVOLYMPUS
            </span>
          </motion.h1>
          <div className="absolute -inset-1 bg-blue-500/20 blur-xl rounded-full -z-10"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 max-w-xs sm:max-w-md md:max-w-2xl text-lg sm:text-xl md:text-2xl text-slate-300"
        >
          An intense 30-hour innovation sprint where the sharpest minds ascend
          to new heights, building real-world solutions that make an impact.
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl"
        >
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm"
          >
            <Clock className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">30 Hours</h3>
            <p className="text-sm text-slate-400">Non-stop hacking</p>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm"
          >
            <Users className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">3-4 Members</h3>
            <p className="text-sm text-slate-400">Per team</p>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm"
          >
            <MapPin className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">In-College</h3>
            <p className="text-sm text-slate-400">DCE Campus</p>
          </motion.div>
          <motion.div
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="flex flex-col items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 backdrop-blur-sm"
          >
            <Award className="h-8 w-8 text-primary mb-2" />
            <h3 className="font-medium">Exciting Prizes</h3>
            <p className="text-sm text-slate-400">For winners</p>
          </motion.div>
        </motion.div>

        <Link href="#about">
          <Button
            variant="outline"
            className="border-slate-700 text-white hover:bg-slate-800 cursor-pointer"
          >
            Learn More
          </Button>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 w-full max-w-4xl px-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <CalendarClock className="h-5 w-5 text-primary" />
            <span className="text-lg text-slate-300 font-medium">
              Tentative Dates
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 backdrop-blur-sm"
            >
              <h3 className="font-medium text-primary mb-2">
                Registration & Ideation
              </h3>
              <p className="text-sm text-slate-300">
                March 10th - March 20th, 2025
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="p-4 rounded-lg bg-slate-800/30 border border-slate-700 backdrop-blur-sm"
            >
              <h3 className="font-medium text-primary mb-2">Idea Evaluation</h3>
              <p className="text-sm text-slate-300">
                March 22nd - March 23rd, 2025
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="about" ref={aboutRef} className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
                DevOlympus
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-300">
              Where innovation meets determination
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate={aboutInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div
              variants={item}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700 backdrop-blur-sm"
            >
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Learn</h3>
              <p className="text-center text-slate-300">
                Participate in industry-led seminars and hands-on workshops
                exposing you to real-world tech applications.
              </p>
            </motion.div>
            <motion.div
              variants={item}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700 backdrop-blur-sm"
            >
              <Code className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Build</h3>
              <p className="text-center text-slate-300">
                Work on open-ended themes with round-the-clock mentoring to
                craft cutting-edge solutions to real problems.
              </p>
            </motion.div>
            <motion.div
              variants={item}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 rounded-lg bg-slate-800/30 border border-slate-700 backdrop-blur-sm"
            >
              <Zap className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Compete</h3>
              <p className="text-center text-slate-300">
                Push your creativity, problem-solving, and technical expertise
                to the limit, competing for exciting prizes.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 max-w-3xl mx-auto text-slate-300 bg-slate-800/30 p-6 rounded-lg border border-slate-700 backdrop-blur-sm"
          >
            <p className="mb-4">
              DevOlympus is an intense 30-hour innovation sprint where
              participants work on developing real-world solutions. Shortlisted
              teams from the ideation phase will experience an in-college
              development marathon, working on innovative projects.
            </p>
            <p className="mb-4">
              With mentoring available throughout the event, a fun night of
              brainstorming, and a structured prototype phase, every second
              counts. Participants will refine ideas, craft cutting-edge
              solutions, and present their work to expert judges.
            </p>
            <p>
              From coding battles to strategic innovation, DevOlympus is
              designed to forge the next generation of tech leaders at
              Dronacharya College of Engineering.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

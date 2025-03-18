"use client";

import { useState, ReactNode, JSX } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  MapPin,
  Utensils,
  Code,
  Code2,
  Skull,
  Presentation,
  GraduationCap,
  Clipboard,
  Coffee,
  Gamepad,
  CheckSquare,
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HACKATHON_DATE, HACKATHON_END_DATE } from "@/data";
interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  icon: ReactNode;
  location: string;
  textColor?: string;
  highlightBorder?: string;
}

interface ScheduleDay {
  id: string;
  day: string;
  title: string;
  date: string;
  events: ScheduleEvent[];
  textColor?: string;
}

// Format date as "4th April, 2025"
const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month}, ${year}`;
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export default function ResponsiveScheduleSection(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeDay, setActiveDay] = useState<string>("day1");

  const scheduleItems: ScheduleDay[] = [
    {
      id: "day1",
      day: "Day 1",
      title: "Kickoff",
      date: formatDate(HACKATHON_DATE),
      events: [
        {
          time: "09:00 - 10:00",
          title: "Check-in & Registration",
          description: "Arrive at DCE campus and complete your registration",
          icon: <Clipboard className="h-5 w-5" />,
          location: "Main Entrance",
        },
        {
          time: "10:00 - 11:00",
          title: "Opening Ceremony",
          description: "Welcome address, introduction to mentors and sponsors",
          icon: <Presentation className="h-5 w-5" />,
          location: "Main Auditorium",
        },
        {
          time: "11:30 - 13:00",
          title: "Hack Period Begins",
          description: "Start your hackathon journey with your team",
          icon: <Code2 className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "13:00 - 14:00",
          title: "Lunch Break",
          description: "Networking lunch with fellow participants",
          icon: <Utensils className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "14:00 - 15:00",
          title: "Mentoring Session",
          description: "Get guidance from mentors on your projects",
          icon: <FaChalkboardTeacher className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "15:00 - 17:00",
          title: "Round 1 Elimination",
          description: "Present your ideas to judges",
          icon: <Skull className="h-5 w-5" />,
          location: "Seminar Hall",
          textColor: "text-red-500",
          highlightBorder: "border-red-500/30",
        },
        {
          time: "18:00 - 19:30",
          title: "Coding Period",
          description: "Work on your projects with your team",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "19:30 - 21:30",
          title: "Dinner",
          description: "Refuel for the night ahead",
          icon: <Utensils className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "22:00 - 00:00",
          title: "Night Hacking",
          description: "Continue working on your projects",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
      ],
    },
    {
      id: "day2",
      day: "Day 2",
      title: "Finale",
      date: formatDate(HACKATHON_END_DATE),
      events: [
        {
          time: "00:00 - 01:00",
          title: "Fun Interaction",
          description: "Relax and enjoy some fun activities",
          icon: <Gamepad className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "01:00 - 09:00",
          title: "Coding Period",
          description: "For the night owls & early birds",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "09:00 - 10:00",
          title: "Breakfast",
          description: "Morning fuel to keep you going",
          icon: <Coffee className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "10:00 - 10:30",
          title: "Final Evaluation",
          description: "Last chance to impress the judges",
          icon: <CheckSquare className="h-5 w-5" />,
          location: "Seminar hall",
          textColor: "text-red-500",
        },
        {
          time: "13:00 - 14:00",
          title: "Winner Announcement & Prize distribution",
          description: "We'll annouce our winners",
          icon: <CheckSquare className="h-5 w-5" />,
          location: "Auditorium",
        },
        {
          time: "14:00 - 14:30",
          title: "Closing Ceremony",
          description: "Wrap up and thank you for participating",
          icon: <GraduationCap className="h-5 w-5" />,
          location: "Hack Space",
        },
      ],
    },
  ];

  return (
    <section id="schedule" ref={ref} className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Event{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-bold text-transparent">
              Schedule
            </span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            A 30-hour journey of innovation and creativity
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6 sm:mb-10 max-w-xs mx-auto">
            <div className="absolute inset-0 bg-slate-800/50 rounded-full border border-slate-700"></div>

            <div className="relative grid grid-cols-2 gap-1 p-1">
              {scheduleItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveDay(item.id)}
                  className={`relative z-10 py-1.5 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    activeDay === item.id
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {activeDay === item.id && (
                    <motion.div
                      layoutId="tab-pill"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-full -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="hidden sm:inline">{item.day} - </span>
                  <span
                    className={`${
                      item.textColor ? item.textColor : "text-slate-300"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            {scheduleItems.map((day) => (
              <div
                key={day.id}
                className={activeDay === day.id ? "block" : "hidden"}
              >
                <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                    <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {day.day}: {day.title}
                    </h3>
                    <span className="text-xs sm:text-sm text-slate-400">
                      Date: {day.date}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <motion.div
                      key={eventIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: eventIndex * 0.05 }}
                      className="group"
                    >
                      <div
                        className={`flex flex-col sm:flex-row bg-slate-800/10 hover:bg-slate-800/30 backdrop-blur-sm ${
                          event.highlightBorder || "border border-slate-700/30"
                        } hover:border-slate-700/60 rounded-md p-3 transition-all`}
                      >
                        <div className="flex sm:flex-col sm:w-24 flex-shrink-0 sm:border-r sm:border-slate-700/30 sm:pr-3">
                          <div className="font-mono text-sm">
                            {event.time.split(" - ")[0]}
                          </div>
                          {event.time.split(" - ")[1] && (
                            <div className="text-sm ml-1 sm:ml-0 sm:mt-1">
                              <span className="inline sm:hidden">-</span>
                              <span className="hidden sm:inline">→</span>{" "}
                              {event.time.split(" - ")[1]}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 mt-2 sm:mt-0 sm:pl-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-slate-800/80 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-900/70 transition-colors text-slate-300 group-hover:text-white">
                              {event.icon}
                            </div>
                            <div>
                              <h4
                                className={`font-medium ${
                                  event.textColor || "text-white"
                                }`}
                              >
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                              <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center text-xs sm:text-sm text-slate-400 mt-6 sm:mt-8">
                  Schedule is tentative and subject to change.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

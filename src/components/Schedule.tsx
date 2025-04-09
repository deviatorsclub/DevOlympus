"use client";

import { useState, JSX } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { scheduleItems } from "@/data";

export default function ResponsiveScheduleSection(): JSX.Element {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeDay, setActiveDay] = useState<string>("day1");

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
                  className={`relative cursor-pointer z-10 py-1.5 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm font-medium transition-all ${
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

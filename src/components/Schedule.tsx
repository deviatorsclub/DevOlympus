"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Clock, MapPin, Coffee, Code, Users, Award } from "lucide-react";

export default function ResponsiveScheduleSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [activeDay, setActiveDay] = useState("day1");
  
  const scheduleItems = [
    {
      id: "day1",
      day: "Day 1",
      title: "Kickoff",
      date: "TBA",
      events: [
        {
          time: "09:00 - 10:00",
          title: "Check-in & Registration",
          description: "Arrive at DCE campus and complete your registration",
          icon: <MapPin className="h-5 w-5" />,
          location: "Main Entrance",
        },
        {
          time: "10:00 - 11:00",
          title: "Opening Ceremony",
          description: "Welcome address, introduction to mentors and sponsors",
          icon: <Users className="h-5 w-5" />,
          location: "Main Auditorium",
        },
        {
          time: "11:00 - 12:00",
          title: "Team Formation & Ideation",
          description: "Form teams and begin brainstorming your project ideas",
          icon: <Users className="h-5 w-5" />,
          location: "Workshop Area",
        },
        {
          time: "12:00 - 13:00",
          title: "Lunch Break",
          description: "Networking lunch with fellow participants",
          icon: <Coffee className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "13:00 - 18:00",
          title: "Hacking Session",
          description: "Start working on your projects with mentor support",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "18:00 - 19:00",
          title: "Dinner",
          description: "Refuel for the night ahead",
          icon: <Coffee className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "19:00 - 00:00",
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
      date: "TBA",
      events: [
        {
          time: "00:00 - 08:00",
          title: "Overnight Hacking",
          description: "For the night owls who want to keep coding",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "08:00 - 09:00",
          title: "Breakfast",
          description: "Morning fuel to keep you going",
          icon: <Coffee className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "09:00 - 12:00",
          title: "Final Development Sprint",
          description: "Last push to complete your projects",
          icon: <Code className="h-5 w-5" />,
          location: "Hack Space",
        },
        {
          time: "12:00 - 13:00",
          title: "Lunch Break",
          description: "Final meal before presentations",
          icon: <Coffee className="h-5 w-5" />,
          location: "Cafeteria",
        },
        {
          time: "13:00 - 15:00",
          title: "Project Submission",
          description: "Submit your projects and prepare your presentations",
          icon: <Clock className="h-5 w-5" />,
          location: "Submission Desk",
        },
        {
          time: "15:00 - 18:00",
          title: "Project Presentations",
          description: "Present your solutions to judges and audience",
          icon: <Users className="h-5 w-5" />,
          location: "Main Auditorium",
        },
        {
          time: "18:00 - 19:00",
          title: "Judging & Deliberation",
          description: "Judges evaluate all projects",
          icon: <Award className="h-5 w-5" />,
          location: "Judges Room",
        },
        {
          time: "19:00 - 20:00",
          title: "Award Ceremony",
          description: "Winners announced and prizes distributed",
          icon: <Award className="h-5 w-5" />,
          location: "Main Auditorium",
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
          {/* Custom Tab Buttons */}
          <div className="relative mb-6 sm:mb-10 max-w-xs mx-auto">
            {/* Background Pill */}
            <div className="absolute inset-0 bg-slate-800/50 rounded-full border border-slate-700"></div>
            
            {/* Tab Buttons */}
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
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Content */}
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
                    <span className="text-xs sm:text-sm text-slate-400">Date: {day.date}</span>
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
                      <div className="flex flex-col sm:flex-row bg-slate-800/10 hover:bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 hover:border-slate-700/60 rounded-md p-3 transition-all">
                        {/* Time - Horizontal on mobile, vertical on desktop */}
                        <div className="flex sm:flex-col sm:w-24 flex-shrink-0 sm:border-r sm:border-slate-700/30 sm:pr-3">
                          <div className="font-mono text-sm text-slate-400">
                            {event.time.split(' - ')[0]}
                          </div>
                          {event.time.split(' - ')[1] && (
                            <div className="text-slate-500 text-sm ml-1 sm:ml-0 sm:mt-1">
                              <span className="inline sm:hidden">-</span>
                              <span className="hidden sm:inline">→</span> {event.time.split(' - ')[1]}
                            </div>
                          )}
                        </div>
                        
                        {/* Content - Full width on all devices */}
                        <div className="flex-1 mt-2 sm:mt-0 sm:pl-4">
                          <div className="flex items-start gap-3">
                            <div className="bg-slate-800/80 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-purple-900/70 transition-colors text-slate-300 group-hover:text-white">
                              {event.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                                <MapPin className="h-3 w-3" />
                                <span>{event.location}</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
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
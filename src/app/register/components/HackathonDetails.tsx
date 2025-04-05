"use client";

import { Calendar, Clock, CheckCircle } from "lucide-react";
import { HACKATHON_DATE } from "@/data";

export function HackathonDetails() {
  return (
    <div className="bg-indigo-900/40 border border-indigo-500/60 rounded-lg p-5 mt-8">
      <h2 className="text-lg font-medium text-violet-300 mb-3">
        Hackathon Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-violet-200">
        <div className="flex items-center">
          <Calendar
            size={18}
            className="mr-2 text-violet-400 flex-shrink-0"
          />
          <span>
            {HACKATHON_DATE.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center">
          <Clock size={18} className="mr-2 text-violet-400 flex-shrink-0" />
          <span>
            {HACKATHON_DATE.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
        <div className="flex items-center">
          <CheckCircle
            size={18}
            className="mr-2 text-violet-400 flex-shrink-0"
          />
          <span>Bring your student ID</span>
        </div>
      </div>
    </div>
  );
}

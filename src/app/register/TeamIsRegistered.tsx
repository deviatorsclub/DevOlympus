"use client";

import { HACKATHON_DATE } from "@/data";
import { TeamWithMembers } from "@/types/registration";
import {
  CheckCircle,
  ExternalLink,
  Crown,
  User,
  Clock,
  Calendar,
  Phone,
  Copy,
} from "lucide-react";
import Link from "next/link";

export default function TeamIsRegistered({ team }: { team: TeamWithMembers }) {
  const teamLead = team.members.find((member) => member.isLead);
  const teamMembers = team.members.filter((member) => !member.isLead);

  function CopyButton() {
    return (
      <Copy
        size={16}
        className="text-violet-400 cursor-pointer"
        onClick={() => navigator.clipboard.writeText(team.displayId)}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-16 pt-16 md:pt-32 px-4 md:px-6">
      <div className="bg-[#0a0918] border border-indigo-600 rounded-xl shadow-xl p-4 md:p-8 text-gray-100 relative">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center shadow-lg">
          <CheckCircle size={16} className="mr-2" />
          Successfully Registered
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-violet-400 text-center">
          TEAM {team.name.toUpperCase()}
        </h1>
        <div className="flex gap-2 justify-center items-center text-lg md:text-xl font-bold mb-6 md:mb-8 text-violet-400 text-center">
          <h2>TEAM ID: {team.displayId}</h2>
          <CopyButton />
        </div>
        <div className="bg-[#13112a] p-5 rounded-lg border border-indigo-600 mb-8">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-violet-300 mb-2">
              Project Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-violet-200">Theme</p>
                <p className="text-white font-medium">{team.theme}</p>
              </div>
              <div>
                <p className="text-sm text-violet-200">Registration ID</p>
                <p className="text-white font-medium">{team.displayId}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-violet-200">Presentation</p>
                <a
                  href={team.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center"
                >
                  {team.presentationUrl}
                  <ExternalLink size={14} className="ml-1 inline" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium text-violet-400 mb-4">
            Team Members
          </h2>

          {teamLead && (
            <div className="mb-6">
              <div className="p-4 rounded-lg border border-violet-700 bg-[#1a1838]">
                <div className="flex items-center mb-3">
                  <Crown size={16} className="text-violet-400 mr-2" />
                  <h3 className="text-lg font-medium text-violet-300">
                    Team Lead
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-violet-200">Name</p>
                    <p className="text-white font-medium">{teamLead.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-violet-200">Email</p>
                    <p className="text-white">{teamLead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-violet-200">Roll Number</p>
                    <p className="text-white">{teamLead.rollNo}</p>
                  </div>
                  {teamLead.number && (
                    <div>
                      <p className="text-sm text-violet-200 flex items-center">
                        <Phone size={14} className="mr-1" />
                        Phone
                      </p>
                      <p className="text-white">{teamLead.number}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.email}
                className="p-4 rounded-lg border border-indigo-800 bg-[#0e0c20]"
              >
                <div className="flex items-center mb-3">
                  <User size={16} className="text-indigo-400 mr-2" />
                  <h3 className="text-md font-medium text-indigo-300">
                    Team Member {index + 1}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-violet-200">Name</p>
                    <p className="text-white">{member.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-violet-200">Email</p>
                    <p className="text-white">{member.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-violet-200">Roll Number</p>
                    <p className="text-white">{member.rollNo}</p>
                  </div>
                  {member.number && (
                    <div>
                      <p className="text-sm text-violet-200 flex items-center">
                        <Phone size={14} className="mr-1" />
                        Phone
                      </p>
                      <p className="text-white">{member.number}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900/60 border border-indigo-500 rounded-lg p-4">
          <h2 className="text-lg font-medium text-violet-300 mb-2">
            Hackathon Details
          </h2>
          <div className="flex flex-col md:flex-row md:items-center text-sm text-violet-200 space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-violet-400" />
              <span>
                {HACKATHON_DATE.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {"-"}
                {HACKATHON_DATE.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-violet-400" />
              <span>
                Starts at{" "}
                {HACKATHON_DATE.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircle size={16} className="mr-2 text-violet-400" />
              <span>Bring your student ID</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md transition-colors"
          >
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

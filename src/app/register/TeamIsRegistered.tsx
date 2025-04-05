"use client";

import { HACKATHON_DATE } from "@/data";
import type { TeamWithMembers } from "@/types/registration";
import { FLAGS } from "@/lib/flags";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  CheckCircle,
  ExternalLink,
  Crown,
  User,
  Clock,
  Calendar,
  Phone,
  Copy,
  Award,
  FileText,
  Users,
  Info,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/custom-accordian";

interface TeamIsRegisteredProps {
  team: TeamWithMembers;
}

export default function TeamIsRegistered({ team }: TeamIsRegisteredProps) {
  const teamLead = team.members.find((member) => member.isLead);
  const teamMembers = team.members.filter((member) => !member.isLead);
  const [open, setOpen] = useState<string | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  const copyTeamId = useCallback(() => {
    navigator.clipboard.writeText(team.displayId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [team.displayId]);

  const renderRound2Status = () => {
    if (
      new Date() < FLAGS.startShowingRound2Status ||
      !team.selectedForRound2 ||
      team.selectedForRound2 === "NOT_DECIDED"
    ) {
      return (
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-600/60 rounded-lg p-5 mb-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Clock size={24} className="text-amber-400" />
            <h3 className="text-xl font-medium">Round 2 Selection Pending</h3>
          </div>
          <p className="text-gray-200 text-base">
            Your team&apos;s selection status for Round 2 is currently under
            review. Check back later for updates.
          </p>
          <div className="mt-4 bg-amber-900/30 p-3 rounded text-sm text-amber-200 flex items-start gap-2">
            <Info size={18} className="mt-0.5 flex-shrink-0" />
            <p>
              Selection results will be shared on our community page and
              website.
            </p>
          </div>
        </div>
      );
    }

    if (team.selectedForRound2 === "SELECTED") {
      return (
        <div className="bg-gradient-to-r from-emerald-900/40 to-green-800/20 border border-emerald-600/60 rounded-lg p-5 mb-6 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle size={24} className="text-emerald-400" />
            <h3 className="text-xl font-medium">Selected for Round 2</h3>
          </div>
          <p className="text-gray-200 text-base">
            Great news! Your team has been selected to advance to Round 2 of the
            hackathon. We look forward to seeing your project develop further.
          </p>
          <div className="mt-4 bg-emerald-900/30 p-3 rounded text-sm text-emerald-200 flex items-start gap-2">
            <Info size={18} className="mt-0.5 flex-shrink-0" />
            <p>
              Check our community page for important information about next
              steps.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-r from-rose-900/40 to-red-800/20 border border-rose-600/60 rounded-lg p-5 mb-6 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Award size={24} className="text-rose-400" />
          <h3 className="text-xl font-medium">Thank You for Participating</h3>
        </div>
        <p className="text-gray-200 text-base">
          We appreciate your participation and effort. While your team
          wasn&apos;t selected for Round 2, we encourage you to continue
          developing your skills.
        </p>
        <div className="mt-4 bg-rose-900/30 p-3 rounded text-sm text-rose-200 flex items-start gap-2">
          <Info size={18} className="mt-0.5 flex-shrink-0" />
          <p>Visit our website for information about future events!</p>
        </div>
      </div>
    );
  };

  const renderMemberCard = (
    member: {
      name: string;
      email: string;
      rollNo: string;
      number: string;
      isLead: boolean;
    },
    isLead: boolean,
    index?: number
  ) => (
    <div
      className={`p-4 rounded-lg border ${
        isLead
          ? "border-violet-700 bg-[#1a1838]"
          : "border-indigo-800 bg-[#0e0c20]"
      }`}
    >
      <div className="flex items-center mb-3">
        {isLead ? (
          <Crown size={18} className="text-violet-400 mr-2 flex-shrink-0" />
        ) : (
          <User size={18} className="text-indigo-400 mr-2 flex-shrink-0" />
        )}
        <h3 className="text-base font-medium text-violet-300">
          {isLead ? "Team Lead" : `Team Member ${index! + 1}`}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-violet-200">Name</p>
          <p className="text-white text-base break-words">{member.name}</p>
        </div>
        <div>
          <p className="text-sm text-violet-200">Email</p>
          <p className="text-white text-base break-all">{member.email}</p>
        </div>
        <div>
          <p className="text-sm text-violet-200">Roll Number</p>
          <p className="text-white text-base break-all">{member.rollNo}</p>
        </div>
        {member.number && (
          <div>
            <p className="text-sm text-violet-200 flex items-center">
              <Phone size={14} className="mr-1 flex-shrink-0" />
              Phone
            </p>
            <p className="text-white text-base break-all">{member.number}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-12 pt-16 md:pt-24 px-4 md:px-6">
      <div className="bg-[#0a0918] border border-indigo-600/80 rounded-xl shadow-lg p-6 md:p-8 text-gray-100 relative">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-violet-400 break-words">
            TEAM {team.name.toUpperCase()}
          </h1>
          <div className="flex gap-2 justify-center items-center text-lg md:text-xl font-medium mt-3 text-violet-400">
            <span className="break-all">ID: {team.displayId}</span>
            <button
              onClick={copyTeamId}
              className="relative group p-1 rounded-md hover:bg-violet-800/20 transition-colors cursor-pointer"
              aria-label="Copy team ID"
            >
              {copied ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <Copy
                  size={18}
                  className="text-violet-400 group-hover:text-violet-300 transition-colors"
                />
              )}
              <span
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 transition-opacity ${copied ? "opacity-100" : "group-hover:opacity-100"}`}
              >
                {copied ? "Copied!" : "Copy ID"}
              </span>
            </button>
          </div>
        </div>

        {renderRound2Status()}

        <Accordion
          collapsible
          className="space-y-5"
          value={open}
          onValueChange={setOpen}
        >
          <AccordionItem
            value="project"
            className="border border-indigo-600 rounded-lg bg-[#13112a] overflow-hidden"
          >
            <AccordionTrigger className="cursor-pointer px-5 py-4 hover:bg-[#1a1838] data-[state=open]:border-b border-indigo-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-900/30 rounded-full">
                  <FileText size={20} className="text-violet-400" />
                </div>
                <h2 className="text-lg font-medium text-violet-300">
                  Project Details
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#0f0d24]">
              <div className="px-5 py-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-sm text-violet-200 mb-1">Theme</p>
                    <p className="text-white text-base font-medium break-words">
                      {team.theme}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-violet-200 mb-1">
                      Registration ID
                    </p>
                    <p className="text-white text-base font-medium break-all">
                      {team.displayId}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-violet-200 mb-1">Presentation</p>
                    <a
                      href={team.presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 flex items-center text-base break-all hover:underline cursor-pointer"
                    >
                      <span>{team.presentationUrl}</span>
                      <ExternalLink size={14} className="ml-2 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="team"
            className="border border-indigo-600 rounded-lg bg-[#13112a] overflow-hidden"
          >
            <AccordionTrigger className="cursor-pointer px-5 py-4 hover:bg-[#1a1838] data-[state=open]:border-b border-indigo-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-violet-900/30 rounded-full">
                  <Users size={20} className="text-violet-400" />
                </div>
                <h2 className="text-lg font-medium text-violet-300">
                  Team Members
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#0f0d24]">
              <div className="px-5 py-5">
                <div className="space-y-4">
                  {teamLead && renderMemberCard(teamLead, true)}
                  {teamMembers.map((member, index) => (
                    <div key={member.email || index}>
                      {renderMemberCard(member, false, index)}
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-base font-medium rounded-md transition-colors cursor-pointer"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import type { TeamWithMembers } from "@/types/registration";
import Link from "next/link";
import { useState } from "react";
import { Accordion } from "@/components/ui/custom-accordian";

import {
  TeamHeader,
  Round2Status,
  ProjectDetails,
  TeamMembers,
  HackathonDetails,
} from "./components";

interface TeamIsRegisteredProps {
  team: TeamWithMembers;
}

export default function TeamIsRegistered({ team }: TeamIsRegisteredProps) {
  const teamLead = team.members.find((member) => member.isLead);
  const teamMembers = team.members.filter((member) => !member.isLead);
  const [open, setOpen] = useState<string | undefined>(undefined);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-12 pt-16 md:pt-24 px-4 md:px-6">
      <div className="bg-[#0a0918] border border-indigo-600/80 rounded-xl shadow-lg p-6 md:p-8 text-gray-100 relative">
        <TeamHeader teamName={team.name} teamId={team.displayId} />

        <Round2Status
          selectedForRound2={team.selectedForRound2}
          paymentStatus={team.payment}
        />

        <Accordion
          collapsible
          className="space-y-5"
          value={open}
          onValueChange={setOpen}
        >
          <ProjectDetails
            theme={team.theme}
            displayId={team.displayId}
            presentationUrl={team.presentationUrl}
          />

          <TeamMembers teamLead={teamLead} teamMembers={teamMembers} />
        </Accordion>

        <HackathonDetails />

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

"use client";

import { Users } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/custom-accordian";
import { TeamMemberCard } from "./TeamMemberCard";

interface TeamMember {
  name: string;
  email: string;
  rollNo: string;
  number: string;
  isLead: boolean;
}

interface TeamMembersProps {
  teamLead: TeamMember | undefined;
  teamMembers: TeamMember[];
}

export function TeamMembers({ teamLead, teamMembers }: TeamMembersProps) {
  return (
    <AccordionItem
      value="team"
      className="border border-indigo-600 rounded-lg bg-[#13112a] overflow-hidden"
    >
      <AccordionTrigger className="cursor-pointer px-5 py-4 hover:bg-[#1a1838] data-[state=open]:border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-900/30 rounded-full">
            <Users size={20} className="text-violet-400" />
          </div>
          <h2 className="text-lg font-medium text-violet-300">Team Members</h2>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-[#0f0d24]">
        <div className="px-5 py-5">
          <div className="space-y-4">
            {teamLead && <TeamMemberCard member={teamLead} isLead={true} />}
            {teamMembers.map((member, index) => (
              <div key={member.email || index}>
                <TeamMemberCard member={member} isLead={false} index={index} />
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

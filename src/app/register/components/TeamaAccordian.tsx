"use client";

import { Accordion } from "@/components/ui/custom-accordian";
import { ProjectDetails, TeamMembers } from ".";
import { TeamWithMembers } from "@/types/registration";
import { useState } from "react";

export default function TeamaAccordian({ team }: { team: TeamWithMembers }) {
  const teamLead = team.members.find((member) => member.isLead);
  const teamMembers = team.members.filter((member) => !member.isLead);
  const [open, setOpen] = useState<string | undefined>(undefined);
  return (
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
  );
}

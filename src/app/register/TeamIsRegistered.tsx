import type {
  TeamMemberWithConsent,
  TeamWithMembers,
} from "@/types/registration";
import Link from "next/link";

import { Prisma } from "@prisma/client";

import { TeamHeader, Round2Status, HackathonDetails } from "./components";
import Round2Results from "./components/Round2Results";
import MissingUploads from "./components/MissingUploads";
import TeamaAccordian from "./components/TeamaAccordian";

interface TeamIsRegisteredProps {
  team: TeamWithMembers;
  user: Prisma.UserGetPayload<{ include: { consentLetter: true } }>;
  teamMembersWithLogin: TeamMemberWithConsent[];
}

export default async function TeamIsRegistered({
  team,
  user,
  teamMembersWithLogin,
}: TeamIsRegisteredProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 md:py-12 pt-16 md:pt-24 px-4 md:px-6">
      <div className="bg-[#0a0918] border border-indigo-600/80 rounded-xl shadow-lg p-6 md:p-8 text-gray-100 relative">
        <TeamHeader teamName={team.name} teamId={team.displayId} />

        <div className="my-6">
          <MissingUploads
            team={team}
            teamMembersWithLogin={teamMembersWithLogin}
          />
        </div>

        <Round2Status
          selectedForRound2={team.selectedForRound2}
          paymentStatus={team.payment}
          team={team}
          user={user}
        />

        <Round2Results />
        <TeamaAccordian team={team} />
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

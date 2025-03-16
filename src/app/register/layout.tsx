import LoginFallback from "@/components/LoginFallback";
import RegistrationForm from "@/components/RegistrationForm";
import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import TeamIsRegistered from "./TeamIsRegistered";
import { TeamWithMembers } from "@/types/registration";

export default async function layout() {
  const session = await auth();

  let teams: TeamWithMembers[] = [];

  if (session?.user?.email) {
    teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            email: session?.user?.email,
            isLead: true,
          },
        },
      },
      select: {
        id: true,
        name: true,
        presentationUrl: true,
        theme: true,
        members: {
          select: {
            email: true,
            name: true,
            isLead: true,
            rollNo: true,
            number: true,
          },
        },
      },
    });
  }

  return session?.user ? (
    teams.length === 0 ? (
      <RegistrationForm initialSession={session ?? undefined} />
    ) : (
      <TeamIsRegistered team={teams[0]} />
    )
  ) : (
    <LoginFallback />
  );
}

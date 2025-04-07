import LoginFallback from "@/components/LoginFallback";
import RegistrationForm from "@/components/RegistrationForm";
import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import TeamIsRegistered from "./TeamIsRegistered";
import { TeamWithMembers } from "@/types/registration";
import { FLAGS } from "@/lib/flags";
import { Prisma } from "@prisma/client";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const teamLeadEmail = (await searchParams).e as string;
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  let teams: TeamWithMembers[] = [];
  let currentUser: Prisma.UserGetPayload<{
    include: { consentLetter: true };
  }> | null = null;

  if (session?.user?.email) {
    currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        consentLetter: true,
      },
    });

    teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            email: isAdmin
              ? teamLeadEmail
                ? teamLeadEmail
                : session?.user?.email
              : session?.user?.email,
          },
        },
      },
      select: {
        id: true,
        displayId: true,
        name: true,
        presentationUrl: true,
        theme: true,
        selectedForRound2: FLAGS.startShowingRound2Status < new Date(),
        members: {
          select: {
            email: true,
            name: true,
            isLead: true,
            rollNo: true,
            number: true,
          },
        },
        payment: {
          select: {
            id: true,
            screenshotUrl: true,
          },
        },
      },
    });
  }

  return session?.user ? (
    teams.length === 0 ? (
      <RegistrationForm initialSession={session ?? undefined} />
    ) : (
      currentUser && <TeamIsRegistered team={teams[0]} user={currentUser} />
    )
  ) : (
    <LoginFallback />
  );
}

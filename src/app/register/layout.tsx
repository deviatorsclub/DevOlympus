import LoginFallback from "@/components/LoginFallback";
import RegistrationForm from "@/components/RegistrationForm";
import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const teams = await prisma.team.findMany({
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
        },
      },
    },
  });

  console.log("teams", JSON.stringify(teams));

  return session?.user ? (
    <RegistrationForm initialSession={session} />
  ) : (
    <LoginFallback />
  );
}

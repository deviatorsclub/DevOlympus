import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { PaymentForm } from "./components/PaymentForm";
import { PaymentSuccess } from "./components/PaymentSuccess";
import { PaymentStatus } from "./components/PaymentStatus";
import { FLAGS } from "@/lib/flags";
import { notFound } from "next/navigation";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (!FLAGS.showPaymentForm) {
    return notFound();
  }

  const teamLeadEmail = (await searchParams).e as string;
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  if (!session?.user) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
        <PaymentStatus
          hasTeam={false}
          isSelected={false}
          loginRequired={true}
        />
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: isAdmin
        ? teamLeadEmail
          ? teamLeadEmail
          : session?.user?.email
        : session?.user?.email,
    },
    include: {
      team: {
        include: {
          payment: true,
          members: true,
        },
      },
    },
  });

  if (!user?.team) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
        <PaymentStatus hasTeam={false} isSelected={false} />
      </div>
    );
  }

  if (user.team.selectedForRound2 !== "SELECTED") {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
        <PaymentStatus hasTeam={true} isSelected={false} />
      </div>
    );
  }

  const isTeamLead = user.team.members.some(
    (member) =>
      member.email.toLowerCase() === user.email.toLowerCase() && member.isLead
  );

  if (!isTeamLead) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
        <PaymentStatus hasTeam={true} isSelected={true} isTeamLead={false} />
      </div>
    );
  }

  if (user.team.payment) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
        <PaymentSuccess
          paymentDetails={{
            createdAt: user.team.payment.createdAt.toISOString(),
            verified: user.team.payment.verified,
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl my-20">
      <PaymentForm />
    </div>
  );
}

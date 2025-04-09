import { TeamMemberWithConsent, TeamWithMembers } from "@/types/registration";
import {
  AlertTriangle,
  CheckCircle2,
  Shield,
  FileCheck,
  CreditCard,
} from "lucide-react";
import { FLAGS } from "@/lib/flags";
import { cn } from "@/lib/utils";
import { DeadlineBanner } from "@/components/ui/registration";
import WarningsAccordion from "./WarningAccordian";
import { auth } from "@/lib/authOptions";

export default async function MissingUploads({
  team,
  teamMembersWithLogin,
}: {
  team: TeamWithMembers;
  teamMembersWithLogin: TeamMemberWithConsent[];
}) {
  const session = await auth();
  const isPaymentDone = !!team.payment?.id;
  const isPaymentVerified = isPaymentDone && team.payment?.verified === false;
  const memberNamesNotLoggedIn = team.members.filter(
    (member) => !teamMembersWithLogin.some((m) => m.email === member.email),
  );
  const consentLetterNotUploadedBy = teamMembersWithLogin.filter(
    (member) => !member.consentLetter,
  );

  const warnings: {
    type: "warning" | "error";
    message: string;
    details?: React.ReactNode;
    action?: {
      label: string;
      href: string;
    };
    icon?: React.ReactNode;
  }[] = [];

  if (!isPaymentDone) {
    warnings.push({
      type: "error",
      message: "Payment has not been completed",
      action: {
        label: "Complete Payment",
        href: "/round-2-payment",
      },
      icon: <CreditCard className="h-5 w-5" />,
    });
  } else if (isPaymentVerified) {
    warnings.push({
      type: "warning",
      message: "Your payment is pending verification by the organizers",
      icon: <CreditCard className="h-5 w-5" />,
    });
  }

  if (team.selectedForRound2 === "NOT_DECIDED") {
    warnings.push({
      type: "warning",
      message: "Your team's Round 2 selection status is pending",
      icon: <Shield className="h-5 w-5" />,
    });
  }

  if (consentLetterNotUploadedBy.length > 0) {
    const isSelfMissing = consentLetterNotUploadedBy.some(
      (member) => member.email === session?.user?.email,
    );

    warnings.push({
      type: "error",
      message: "Missing consent letters",
      icon: <FileCheck className="h-5 w-5" />,
      details: (
        <div className="mt-3 pl-4 bg-gray-800/40 p-3 rounded-md border border-gray-700">
          <p className="text-sm opacity-90 mb-2">
            The following members need to upload their consent letters:
          </p>
          <ul className="grid gap-2">
            {[...consentLetterNotUploadedBy, ...memberNamesNotLoggedIn].map(
              (member) => (
                <li
                  key={member.name}
                  className="flex items-center gap-2 bg-gray-600/60 px-3 py-2 rounded-md"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <span
                    className={cn(
                      "capitalize",
                      member.email === session?.user?.email
                        ? "font-bold text-amber-300"
                        : "text-gray-200",
                    )}
                  >
                    {member.name}
                    <span className="lowercase opacity-70">{` (${member.email})`}</span>
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      ),
      action: isSelfMissing
        ? {
            label: "Upload Your Consent Letter",
            href: "/register#consentLetter",
          }
        : undefined,
    });
  }

  return (
    <>
      <DeadlineBanner
        deadline={FLAGS.paymentAndConsentDeadline}
        text="Payment and consent submission deadline"
      />

      <div className="rounded-lg border border-gray-700 overflow-hidden">
        <WarningsAccordion warnings={warnings} />

        <div className="p-4a">
          {warnings.length === 0 && (
            <div className="bg-green-900/20 border border-green-800/50 rounded-md p-4 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-400" />
              <div>
                <h4 className="font-medium text-green-300">All set!</h4>
                <p className="text-sm text-green-200/70">
                  Your team has completed all required actions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

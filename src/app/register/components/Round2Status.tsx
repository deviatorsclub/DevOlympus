"use client";

import { Clock, CheckCircle, Award, Info, CreditCard } from "lucide-react";
import { FLAGS } from "@/lib/flags";
import Link from "next/link";
import { TeamWithMembers } from "@/types/registration";

interface Round2StatusProps {
  selectedForRound2: string | null;
  paymentStatus?: TeamWithMembers["payment"];
}

export function Round2Status({
  selectedForRound2,
  paymentStatus,
}: Round2StatusProps) {
  if (
    new Date() < FLAGS.startShowingRound2Status ||
    !selectedForRound2 ||
    selectedForRound2 === "NOT_DECIDED"
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
            Selection results will be shared on our community page and website.
          </p>
        </div>
      </div>
    );
  }

  if (selectedForRound2 === "SELECTED") {
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
        {FLAGS.showPaymentForm &&
          (paymentStatus?.id ? (
            <Link
              href="/round-2-payment"
              className="mt-4 bg-emerald-900/100 p-3 rounded text-sm text-emerald-200 flex items-center gap-2 hover:bg-emerald-800 transition-colors"
            >
              <CreditCard size={18} className="mt-0.5 flex-shrink-0" />
              Check Payment Status
            </Link>
          ) : (
            <Link
              href="/round-2-payment"
              className="mt-4 bg-emerald-900/100 p-3 rounded text-sm text-emerald-200 flex items-center gap-2 hover:bg-emerald-800 transition-colors"
            >
              <CreditCard size={18} className="mt-0.5 flex-shrink-0" />
              <p>Pay for Round 2</p>
            </Link>
          ))}
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
        We appreciate your participation and effort. While your team wasn&apos;t
        selected for Round 2, we encourage you to continue developing your
        skills.
      </p>
      <div className="mt-4 bg-rose-900/30 p-3 rounded text-sm text-rose-200 flex items-start gap-2">
        <Info size={18} className="mt-0.5 flex-shrink-0" />
        <p>Visit our website for information about future events!</p>
      </div>
    </div>
  );
}

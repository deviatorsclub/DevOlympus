"use client";

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useCallback } from "react";
import { FLAGS } from "@/lib/flags";

export default function LoginFallback() {
  const isDeadlinePassed = useCallback(() => {
    return new Date() > FLAGS.submissionDeadline;
  }, []);

  const handleSignIn = useCallback(() => {
    signIn("google", { callbackUrl: "/register" });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-24 px-6">
      <div className="bg-[#0a0918] border border-indigo-600 rounded-xl shadow-xl p-8 text-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-violet-400">DEVOLYMPUS</h1>
        <p className="text-xl text-center mb-8">
          An intense 30-hour innovation sprint where the sharpest minds <br />
          ascend to new heights, building real-world solutions.
        </p>

        {isDeadlinePassed() ? (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-4 mb-6 max-w-md w-full text-center">
            <p className="text-red-200 font-medium">
              Registration deadline has passed.
            </p>
          </div>
        ) : !FLAGS.isRegistrationOpen ? (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-4 mb-6 max-w-md w-full text-center">
            <p className="text-red-200 font-medium">
              Registration is currently closed.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-indigo-900/40 rounded-lg p-6 mb-6 max-w-md w-full text-center">
              <h2 className="text-xl font-medium text-violet-300 mb-4">
                Sign in to Register
              </h2>
              <p className="text-gray-300 mb-6">
                You need to sign in with your account to register for the
                hackathon.
              </p>
              <button
                onClick={handleSignIn}
                className="flex items-center justify-center bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-md px-5 py-3 transition-colors w-full"
              >
                <LogIn size={18} className="mr-2" />
                Sign in to Continue
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
              <FeatureCard
                title="Team Up"
                description="Form a team of 3-4 bright minds ready to tackle real challenges."
              />
              <FeatureCard
                title="Build Solutions"
                description="30 hours of intense collaborative innovation and problem solving."
              />
              <FeatureCard
                title="Win Prizes"
                description="Showcase your creation and compete for exciting rewards."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-[#13112a] border border-indigo-900 rounded-lg p-4 text-center">
    <h3 className="text-lg font-medium text-violet-300 mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

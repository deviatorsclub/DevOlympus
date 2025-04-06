import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentStatusProps {
  hasTeam: boolean;
  isSelected: boolean;
  loginRequired?: boolean;
  isTeamLead?: boolean;
}

export function PaymentStatus({
  hasTeam,
  isSelected,
  loginRequired = false,
  isTeamLead,
}: PaymentStatusProps) {
  return (
    <Card className="border-purple-700 bg-black/90">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          {loginRequired
            ? "Login Required"
            : !hasTeam
              ? "No Team Found"
              : !isSelected
                ? "Team Not Selected for Round 2"
                : isTeamLead === false
                  ? "Team Lead Access Required"
                  : "Payment Required"}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {loginRequired
            ? "Please log in to access the payment page."
            : !hasTeam
              ? "You need to be part of a team to make a payment for Round 2."
              : !isSelected
                ? "Your team has not been selected for Round 2 yet."
                : isTeamLead === false
                  ? "Only the team lead can make the payment for Round 2."
                  : "Please complete your payment to proceed to Round 2."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
            {loginRequired ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : !hasTeam ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : !isSelected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : isTeamLead === false ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            )}
          </div>
          <div className="text-center space-y-3 text-gray-300">
            {loginRequired ? (
              <>
                <p>You need to log in to access the payment page.</p>
                <p>Please sign in with your account to continue.</p>
              </>
            ) : !hasTeam ? (
              <>
                <p>
                  You need to register a team first before you can proceed with
                  payment.
                </p>
                <p>
                  Please go to the registration page to create or join a team.
                </p>
              </>
            ) : !isSelected ? (
              <>
                <p>Only teams selected for Round 2 can make payments.</p>
                <p>
                  Please check back later or contact the organizers if you
                  believe this is an error.
                </p>
              </>
            ) : isTeamLead === false ? (
              <>
                <p>Only the team lead can make the payment for Round 2.</p>
                <p>
                  Please ask your team lead to log in and complete the payment.
                </p>
              </>
            ) : null}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {loginRequired ? (
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link href="/api/auth/signin">Sign In</Link>
          </Button>
        ) : !hasTeam ? (
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link href="/register">Go to Registration</Link>
          </Button>
        ) : !isSelected ? (
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : isTeamLead === false ? (
          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

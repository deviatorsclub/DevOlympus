"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface PaymentSuccessProps {
  paymentDetails?: {
    createdAt: string;
    verified: boolean;
    senderName: string;
    mobileNumber: string;
    screenshotUrl: string;
  };
}

export function PaymentSuccess({ paymentDetails }: PaymentSuccessProps) {
  return (
    <Card className="bg-black border-purple-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Payment Submitted Successfully!
        </CardTitle>
        <CardDescription className="text-gray-300">
          Thank you for your payment. Your payment details have been submitted
          and are being verified. We will update your team status once the
          verification is complete.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
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
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        {paymentDetails && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              Payment submitted on{" "}
              {new Date(paymentDetails.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">
              Verification status:{" "}
              {paymentDetails.verified ? "Verified" : "Pending"}
            </p>
            <div className="mt-4 px-4 py-2 bg-gray-700 rounded-lg flex items-start flex-col">
              <p className="text-sm font-medium text-white">
                Sender Name: {paymentDetails.senderName}
              </p>
              <p className="text-sm font-medium text-white">
                Mobile Number: {paymentDetails.mobileNumber}
              </p>
            </div>
            {paymentDetails.screenshotUrl && (
              <Link
                href={"/api/round-2-pay-screenshot"}
                target="_blank"
                className="block h-[300px] w-[300px] my-4 rounded-lg overflow-hidden"
              >
                <img
                  src={"/api/round-2-pay-screenshot"}
                  alt="Payment Screenshot"
                  className="w-full h-full object-cover"
                />
              </Link>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Go to Home
        </Button>
      </CardFooter>
    </Card>
  );
}

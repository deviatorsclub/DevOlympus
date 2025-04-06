"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitPayment } from "@/actions/paymentActions";
import QrPayImage from "@/assets/qr-pay.png";
import ExampleScreenshotImage from "@/assets/example-screenshot.png";
import { ExampleScreenshotPopup } from "@/app/round-2-payment/components/ExampleScreenshotPopup";

export function PaymentForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [senderName, setSenderName] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrBlurred, setQrBlurred] = useState(true);
  const [showExamplePopup, setShowExamplePopup] = useState(false);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setScreenshot(file);

    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!mobileNumber || !senderName || !screenshot) {
      setError(
        "Please provide sender name, mobile number, and payment screenshot"
      );
      return;
    }

    if (mobileNumber.length < 10) {
      setError("Please enter a valid mobile number");
      return;
    }

    if (senderName.trim().length < 2) {
      setError("Please enter a valid sender name");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("senderName", senderName);
      formData.append("mobileNumber", mobileNumber);
      formData.append("screenshot", screenshot);

      const result = await submitPayment(formData);

      if (result.error) {
        setError(result.error);
      } else {
        window.location.reload();
      }
    } catch (err) {
      setError("Failed to submit payment details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-black border-purple-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Round 2 Payment</CardTitle>
        <CardDescription className="text-gray-300">
          Please scan the QR code below to make the payment and upload a
          screenshot of the transaction.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1 flex flex-col items-center">
            <div
              className="relative w-full max-w-[300px] h-[300px] mb-4 cursor-pointer group"
              onClick={() => setQrBlurred((prev) => !prev)}
            >
              <div className="relative w-full h-full select-none">
                <Image
                  src={QrPayImage || "/placeholder.svg"}
                  alt="Payment QR Code"
                  className={`transition-all duration-300 ${qrBlurred ? "blur-md" : ""}`}
                  style={{ objectFit: "contain" }}
                  priority
                />
                {qrBlurred && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-md transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-purple-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <p className="text-white font-medium select-none">
                      Click to reveal QR code
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center text-sm text-gray-400">
              <p className="font-medium text-lg text-purple-400 bg-purple-900/30 px-3 py-1 rounded-md inline-block">
                Amount: ₹500
              </p>
              <p>Click on the QR code to {qrBlurred ? "reveal" : "blur"} it</p>
            </div>
          </div>

          <div className="flex-1 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="senderName" className="text-white">
                  Sender's Name
                </Label>
                <Input
                  id="senderName"
                  type="text"
                  placeholder="Enter the name of the person who made the payment"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="text-white">
                  Mobile Number (used for payment)
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot" className="text-white">
                  Payment Screenshot
                </Label>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>

              <div className="mt-4 border-t border-gray-800 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">
                    Example Screenshot:
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowExamplePopup(true)}
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 cursor-pointer"
                    title="button"
                  >
                    View Example
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Your screenshot should show the complete payment confirmation
                  with transaction ID
                </p>
              </div>

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2 text-white">
                    Your Screenshot Preview:
                  </p>
                  <div className="relative w-full h-[200px] border border-gray-700 rounded-md overflow-hidden">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Screenshot Preview"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-md text-red-300 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Payment Details"}
              </Button>
            </form>
          </div>
        </div>
      </CardContent>

      {/* Example Screenshot Popup */}
      {showExamplePopup && (
        <ExampleScreenshotPopup
          onClose={() => setShowExamplePopup(false)}
          exampleImage={ExampleScreenshotImage}
        />
      )}
    </Card>
  );
}

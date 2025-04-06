"use client";
import Image, { type StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

interface ExampleScreenshotPopupProps {
  onClose: () => void;
  exampleImage: StaticImageData;
}

export function ExampleScreenshotPopup({
  onClose,
  exampleImage,
}: ExampleScreenshotPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-md max-h-[90vh] flex flex-col relative border border-purple-700">
        {/* Fixed header with close button */}
        <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 rounded-t-lg z-10">
          <h3 className="text-lg font-medium text-white">
            Example Payment Screenshot
          </h3>
          <button
            className="text-gray-400 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[300px] h-auto aspect-[3/5]">
              <Image
                src={exampleImage || "/placeholder.svg"}
                alt="Example Screenshot"
                style={{ objectFit: "contain" }}
                className="rounded-md"
                fill
              />
            </div>
          </div>

          <p className="text-sm text-gray-300 text-center">
            Your screenshot should clearly show the transaction details
            including:
          </p>

          <ul className="text-sm list-disc pl-5 space-y-1 text-gray-300">
            <li>Transaction ID</li>
            <li>Amount (₹500)</li>
            <li>Date and time</li>
            <li>Payment status (Successful)</li>
          </ul>
        </div>

        {/* Fixed footer */}
        <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900 rounded-b-lg">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

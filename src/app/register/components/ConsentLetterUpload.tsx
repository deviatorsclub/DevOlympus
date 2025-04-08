"use client";

import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileCheck,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { uploadConsentLetter } from "@/actions/uploadConsentLetter";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface ConsentLetterUploadProps {
  user: Prisma.UserGetPayload<{ include: { consentLetter: true } }>;
  team?: { selectedForRound2: string };
}

export function ConsentLetterUpload({ user, team }: ConsentLetterUploadProps) {
  const [uploadState, setUploadState] = useState<{
    isUploading: boolean;
    error: string | null;
    success: boolean;
  }>({ isUploading: false, error: null, success: false });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isTeamSelectedForRound2 = team?.selectedForRound2 === "SELECTED";

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setUploadState({ isUploading: true, error: null, success: false });

      try {
        const formData = new FormData();
        formData.append("consentLetter", file);

        const result = await uploadConsentLetter(formData);

        if (result.error) {
          setUploadState({
            isUploading: false,
            error: result.error,
            success: false,
          });
        } else {
          setUploadState({ isUploading: false, error: null, success: true });
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      } catch (err) {
        console.error("Consent letter upload error:", err);
        setUploadState({
          isUploading: false,
          error: "Failed to upload consent letter. Please try again.",
          success: false,
        });
      }
    },
    []
  );

  const { isUploading, error, success } = uploadState;

  if (!isTeamSelectedForRound2) {
    return null;
  }

  if (user?.consentLetter?.id) {
    return (
      <div className="mt-4 bg-indigo-900/100 p-3 rounded text-sm text-indigo-200 flex items-center gap-2">
        <FileCheck size={18} className="mt-0.5 flex-shrink-0" />
        <p>Consent letter uploaded</p>
        <Link
          href={`/api/round-2-consent-letter/${user?.consentLetter?.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-indigo-300 hover:text-indigo-100 transition-colors underline flex items-center gap-1"
        >
          <span>View</span>
          <ExternalLink size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <label
          htmlFor="consentLetter"
          className={`
            mt-2 cursor-pointer bg-indigo-900/100 p-3 rounded text-sm 
            text-indigo-200 flex items-center gap-2 hover:bg-indigo-800 
            transition-colors ${isUploading ? "opacity-70 pointer-events-none" : ""}
          `}
        >
          {isUploading ? (
            <Loader2 size={18} className="mt-0.5 flex-shrink-0 animate-spin" />
          ) : (
            <Upload size={18} className="mt-0.5 flex-shrink-0" />
          )}
          <span>
            {isUploading ? "Uploading..." : "Upload Consent Letter (PDF/Image)"}
          </span>
        </label>

        <input
          ref={fileInputRef}
          id="consentLetter"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
          aria-label="Upload consent letter"
        />

        {error && (
          <div className="mt-2 bg-red-900/50 p-2 rounded text-xs text-red-200 flex items-start gap-2">
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mt-2 bg-emerald-900/50 p-2 rounded text-xs text-emerald-200 flex items-start gap-2">
            <FileCheck size={14} className="mt-0.5 flex-shrink-0" />
            <p>Consent letter uploaded successfully!</p>
          </div>
        )}

        <p className="mt-2 text-xs text-gray-400">
          Upload your signed consent letter (PDF, JPEG, or PNG format, max 5MB)
        </p>

        <div className="mt-3 p-3 bg-indigo-900/60 border border-indigo-500/40 rounded-md shadow-sm">
          <div className="flex items-center gap-2">
            <FileCheck size={18} className="text-indigo-300 flex-shrink-0" />
            <p className="text-sm font-medium text-indigo-200">
              Not sure what to upload?
            </p>
          </div>
          <Link
            href="https://docs.google.com/document/d/1BxMMYDZzn6efjWyLppPtxE_J8eRAAyZ6VdGS3nqCUzc/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 bg-indigo-700/70 hover:bg-indigo-600/70 text-white py-2 px-3 rounded transition-colors w-full justify-center"
          >
            <span className="font-medium">View Sample Consent Letter</span>
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

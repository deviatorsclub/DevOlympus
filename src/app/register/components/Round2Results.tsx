import React from "react";
import { ExternalLink, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { ROUND_1_SPREADSHEET_URL } from "@/data";

export default function Round2Results() {
  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-blue-800/20 border border-indigo-600/60 rounded-lg p-5 my-6 shadow-md">
      <div className="flex items-center gap-3 mb-3">
        <FileSpreadsheet size={24} className="text-indigo-400" />
        <h3 className="text-xl font-medium">Round 1 Results</h3>
      </div>
      <p className="text-gray-200 text-base">
        The complete Round 1 results and team selection status are available in
        the Google Sheets document.
      </p>

      <Link
        href={ROUND_1_SPREADSHEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 bg-indigo-900/60 p-3 rounded text-sm text-indigo-200 flex items-center gap-2 hover:bg-indigo-800/80 transition-colors w-fit"
      >
        <ExternalLink size={18} className="flex-shrink-0" />
        View Results Spreadsheet
      </Link>
    </div>
  );
}

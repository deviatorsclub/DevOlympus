"use client";

import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface TeamHeaderProps {
  teamName: string;
  teamId: string;
}

export function TeamHeader({ teamName, teamId }: TeamHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyTeamId = useCallback(() => {
    navigator.clipboard.writeText(teamId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [teamId]);

  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-violet-400 break-words">
        TEAM {teamName.toUpperCase()}
      </h1>
      <div className="flex gap-2 justify-center items-center text-lg md:text-xl font-medium mt-3 text-violet-400">
        <span className="break-all">ID: {teamId}</span>
        <button
          onClick={copyTeamId}
          className="relative group p-1 rounded-md hover:bg-violet-800/20 transition-colors cursor-pointer"
          aria-label="Copy team ID"
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy
              size={18}
              className="text-violet-400 group-hover:text-violet-300 transition-colors"
            />
          )}
          <span
            className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 transition-opacity ${copied ? "opacity-100" : "group-hover:opacity-100"}`}
          >
            {copied ? "Copied!" : "Copy ID"}
          </span>
        </button>
      </div>
    </div>
  );
}

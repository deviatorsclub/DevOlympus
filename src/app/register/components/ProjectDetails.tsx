"use client";

import { FileText, ExternalLink } from "lucide-react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/custom-accordian";

interface ProjectDetailsProps {
  theme: string;
  displayId: string;
  presentationUrl: string;
}

export function ProjectDetails({ theme, displayId, presentationUrl }: ProjectDetailsProps) {
  return (
    <AccordionItem
      value="project"
      className="border border-indigo-600 rounded-lg bg-[#13112a] overflow-hidden"
    >
      <AccordionTrigger className="cursor-pointer px-5 py-4 hover:bg-[#1a1838] data-[state=open]:border-b border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-900/30 rounded-full">
            <FileText size={20} className="text-violet-400" />
          </div>
          <h2 className="text-lg font-medium text-violet-300">
            Project Details
          </h2>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-[#0f0d24]">
        <div className="px-5 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-sm text-violet-200 mb-1">Theme</p>
              <p className="text-white text-base font-medium break-words">
                {theme}
              </p>
            </div>
            <div>
              <p className="text-sm text-violet-200 mb-1">
                Registration ID
              </p>
              <p className="text-white text-base font-medium break-all">
                {displayId}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-violet-200 mb-1">Presentation</p>
              <a
                href={presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center text-base break-all hover:underline cursor-pointer"
              >
                <span>{presentationUrl}</span>
                <ExternalLink size={14} className="ml-2 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

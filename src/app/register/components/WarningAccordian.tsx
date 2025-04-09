"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AlertOctagon,
  ChevronDown,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function WarningsAccordion({
  warnings,
}: {
  warnings: {
    type: "warning" | "error";
    message: string;
    details?: React.ReactNode;
    action?: { label: string; href: string };
    icon?: React.ReactNode;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (warnings.length === 0) return null;

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full cursor-pointer flex items-center justify-between p-4 bg-amber-950/50 text-amber-100 font-medium",
          isOpen ? "border-b border-gray-700" : ""
        )}
      >
        <div className="flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-amber-400" />
          <span>Required actions ({warnings.length})</span>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen ? "" : "-rotate-90"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-gray-800">
              {warnings.map((warning, i) => (
                <div
                  key={i}
                  className={cn(
                    "p-4 flex gap-3",
                    warning.type === "error"
                      ? "bg-red-950/20"
                      : "bg-amber-950/20"
                  )}
                >
                  <div className="shrink-0 mt-0.5">
                    {warning.icon ? (
                      warning.icon
                    ) : warning.type === "error" ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3
                      className={cn(
                        "font-medium",
                        warning.type === "error"
                          ? "text-red-300"
                          : "text-amber-300"
                      )}
                    >
                      {warning.message}
                    </h3>
                    {warning.details}
                    {warning.action && (
                      <div className="pt-1">
                        <Link
                          href={warning.action.href}
                          className="inline-flex items-center gap-1 text-sm font-medium bg-gray-800 hover:bg-gray-700 transition px-3 py-1.5 rounded-md"
                        >
                          {warning.action.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

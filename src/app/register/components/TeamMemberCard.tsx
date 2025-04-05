"use client";

import { Crown, User, Phone } from "lucide-react";

interface TeamMemberProps {
  member: {
    name: string;
    email: string;
    rollNo: string;
    number: string;
    isLead: boolean;
  };
  isLead: boolean;
  index?: number;
}

export function TeamMemberCard({ member, isLead, index }: TeamMemberProps) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isLead
          ? "border-violet-700 bg-[#1a1838]"
          : "border-indigo-800 bg-[#0e0c20]"
      }`}
    >
      <div className="flex items-center mb-3">
        {isLead ? (
          <Crown size={18} className="text-violet-400 mr-2 flex-shrink-0" />
        ) : (
          <User size={18} className="text-indigo-400 mr-2 flex-shrink-0" />
        )}
        <h3 className="text-base font-medium text-violet-300">
          {isLead ? "Team Lead" : `Team Member ${index! + 1}`}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-violet-200">Name</p>
          <p className="text-white text-base break-words">{member.name}</p>
        </div>
        <div>
          <p className="text-sm text-violet-200">Email</p>
          <p className="text-white text-base break-all">{member.email}</p>
        </div>
        <div>
          <p className="text-sm text-violet-200">Roll Number</p>
          <p className="text-white text-base break-all">{member.rollNo}</p>
        </div>
        {member.number && (
          <div>
            <p className="text-sm text-violet-200 flex items-center">
              <Phone size={14} className="mr-1 flex-shrink-0" />
              Phone
            </p>
            <p className="text-white text-base break-all">{member.number}</p>
          </div>
        )}
      </div>
    </div>
  );
}

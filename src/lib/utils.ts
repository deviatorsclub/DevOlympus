import { UserWithTeam, UserTeam } from "@/types/user-data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTeam(
  users: UserWithTeam[],
  userEmail: string,
): UserTeam | null {
  if (!userEmail) return null;

  const lowerCaseEmail = userEmail.toLowerCase();

  for (const user of users) {
    if (user.email.toLowerCase() === lowerCaseEmail && user.team) {
      return user.team as UserTeam;
    }
  }

  for (const user of users) {
    if (user.team?.members?.length) {
      for (const teamMember of user.team.members) {
        if (teamMember.email.toLowerCase() === lowerCaseEmail) {
          return user.team as UserTeam;
        }
      }
    }
  }

  return null;
}

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month}, ${year}`;
};

const getDaySuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

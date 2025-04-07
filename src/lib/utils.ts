import { UserWithTeam, UserTeam } from "@/types/user-data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTeam(
  users: UserWithTeam[],
  userEmail: string
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

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
  const lowerCaseEmail = userEmail.toLowerCase();
  for (const user of users) {
    if (user.email.toLowerCase() === lowerCaseEmail) {
      return user.team || null;
    } else {
      for (const teamMember of user.team?.members || []) {
        if (teamMember.email.toLowerCase() === lowerCaseEmail) {
          return user.team || null;
        }
      }
    }
  }
  return null;
}

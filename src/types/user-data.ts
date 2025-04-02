import { Theme } from "@/lib/flags";
import { Prisma, TeamSelectionStatus } from "@prisma/client";

export type UserWithTeam = Prisma.UserGetPayload<{
  include: {
    team: {
      include: {
        members: true;
      };
    };
  };
}>;
export type SortField = keyof Omit<
  UserWithTeam,
  "team" | "image" | "createdAt" | "updatedAt"
>;
export type SortDirection = "asc" | "desc";
export interface FilterState {
  search: string;
  role: "all" | "admin" | "user" | "lead" | "member";
  status: "all" | "active" | "blocked";
  loginStatus: "all" | "today" | "yesterday" | "week" | "month" | "never";
  team: "all" | "yes" | "no";
  teamTheme: Theme | "all";
  round2: "all" | "SELECTED" | "REJECTED" | "NOT_DECIDED";
}
export interface StatusChangeLog {
  timestamp: Date | string;
  adminId: string;
  adminName: string;
  adminEmail: string;
  previousStatus: TeamSelectionStatus | null;
  newStatus: TeamSelectionStatus;
}

export type UserTeam = UserWithTeam["team"] & {
  selectionStatusLogs?: StatusChangeLog[];
};

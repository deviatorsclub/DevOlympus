import { Prisma } from "@prisma/client";

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
  role: "all" | "admin" | "user";
  status: "all" | "active" | "blocked";
  loginStatus: "all" | "today" | "week" | "month" | "never";
  team: "all" | "yes" | "no";
}
export type UserTeam = UserWithTeam["team"]
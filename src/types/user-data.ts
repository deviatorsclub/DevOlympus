export interface UserTableType {
  id: number;
  name: string | null;
  email: string;
  image: string | null;
  isBlocked: boolean;
  loggedInTimes: number;
  lastLogin: Date;
  canEditData: boolean;
  isAdmin: boolean;
  team: {
    id: string;
  } | null;
}

export type SortField = keyof Omit<UserTableType, "team" | "image">;
export type SortDirection = "asc" | "desc";

export interface FilterState {
  search: string;
  role: "all" | "admin" | "editor" | "user";
  status: "all" | "active" | "blocked";
  loginStatus: "all" | "today" | "week" | "month" | "never";
}

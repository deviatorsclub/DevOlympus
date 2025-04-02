"use client";

import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import {
  FilterState,
  SortDirection,
  SortField,
  UserTeam,
  UserWithTeam,
} from "@/types/user-data";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";
import { RefreshCw, Users } from "lucide-react";
import { getTeam } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getData } from "./data";

interface UserDashboardProps {
  initialUsers: UserWithTeam[];
}

export default function UserDashboard({ initialUsers }: UserDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserWithTeam[]>(initialUsers);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortField, setSortField] = useState<SortField>("lastLogin");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "all",
    status: "all",
    loginStatus: "all",
    team: "all",
    teamTheme: "all",
    round2: "all",
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dateCache = useRef({
    now: new Date(),
    yesterday: new Date(new Date().setDate(new Date().getDate() - 1)),
    weekAgo: new Date(new Date().setDate(new Date().getDate() - 7)),
    monthAgo: new Date(new Date().setMonth(new Date().getMonth() - 1)),
  }).current;

  const debouncedSearch = useDebounce(filters.search, 300);

  // Define refreshData function before using it in useEffect
  const refreshData = async () => {
    try {
      setIsRefreshing(true);
      const users: UserWithTeam[] = await getData();
      setUsers(users);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Listen for team status updates from UserDetailPopup
  useEffect(() => {
    const handleTeamStatusUpdate = (event: CustomEvent) => {
      if (event.detail?.updatedUsers) {
        setUsers(event.detail.updatedUsers);
      } else {
        // If no updated users data is provided, refresh data from the server
        refreshData();
      }
    };

    // Add event listener for team status updates
    window.addEventListener('teamStatusUpdated', handleTeamStatusUpdate as EventListener);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('teamStatusUpdated', handleTeamStatusUpdate as EventListener);
    };
  }, []);

  useEffect(() => {
    const urlFilters: Partial<FilterState> = {};
    let hasUrlFilters = false;

    if (searchParams.has("search")) {
      urlFilters.search = searchParams.get("search") || "";
      hasUrlFilters = true;
    }

    if (searchParams.has("role")) {
      const role = searchParams.get("role");
      if (role && ["all", "admin", "user", "lead", "member"].includes(role)) {
        urlFilters.role = role as FilterState["role"];
        hasUrlFilters = true;
      }
    }

    if (searchParams.has("status")) {
      const status = searchParams.get("status");
      if (status && ["all", "active", "blocked"].includes(status)) {
        urlFilters.status = status as FilterState["status"];
        hasUrlFilters = true;
      }
    }

    if (searchParams.has("loginStatus")) {
      const loginStatus = searchParams.get("loginStatus");
      if (
        loginStatus &&
        ["all", "today", "yesterday", "week", "month", "never"].includes(
          loginStatus
        )
      ) {
        urlFilters.loginStatus = loginStatus as FilterState["loginStatus"];
        hasUrlFilters = true;
      }
    }

    if (searchParams.has("team")) {
      const team = searchParams.get("team");
      if (team && ["all", "yes", "no"].includes(team)) {
        urlFilters.team = team as FilterState["team"];
        hasUrlFilters = true;
      }
    }

    if (searchParams.has("teamTheme")) {
      const teamTheme = searchParams.get("teamTheme");
      if (
        teamTheme &&
        ["all", "ai", "blockchain", "security", "robotics", "open"].includes(
          teamTheme
        )
      ) {
        urlFilters.teamTheme = teamTheme as FilterState["teamTheme"];
        hasUrlFilters = true;
      }
    }

    if (searchParams.has("round2")) {
      const round2 = searchParams.get("round2");
      if (
        round2 &&
        ["all", "SELECTED", "REJECTED", "NOT_DECIDED"].includes(round2)
      ) {
        urlFilters.round2 = round2 as FilterState["round2"];
        hasUrlFilters = true;
      }
    }

    if (hasUrlFilters) {
      setFilters((prev) => ({
        ...prev,
        ...urlFilters,
      }));
    }

    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [searchParams]);

  useEffect(() => {
    if (isLoading) return;

    const params = new URLSearchParams();

    if (filters.search) {
      params.set("search", filters.search);
    }

    if (filters.role !== "all") {
      params.set("role", filters.role);
    }

    if (filters.status !== "all") {
      params.set("status", filters.status);
    }

    if (filters.loginStatus !== "all") {
      params.set("loginStatus", filters.loginStatus);
    }

    if (filters.team !== "all") {
      params.set("team", filters.team);
    }

    if (filters.teamTheme !== "all") {
      params.set("teamTheme", filters.teamTheme);
    }

    if (filters.round2 !== "all") {
      params.set("round2", filters.round2);
    }

    const queryString = params.toString();
    const url = pathname + (queryString ? `?${queryString}` : "");
    router.replace(url, { scroll: false });
  }, [filters, pathname, router, isLoading]);

  const handleSortChange = useCallback(
    (field: SortField) => {
      if (field === sortField) {
        setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDir("asc");
      }
    },
    [sortField]
  );

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({
      search: "",
      role: "all",
      status: "all",
      loginStatus: "all",
      team: "all",
      teamTheme: "all",
      round2: "all",
    });
  }, []);
  
  // refreshData function is now defined above
  
  const usersWithVisibility = useMemo(() => {
    if (isLoading) return [];
    
    const hasActiveFilters =
      debouncedSearch ||
      filters.role !== "all" ||
      filters.status !== "all" ||
      filters.loginStatus !== "all" ||
      filters.team !== "all" ||
      filters.teamTheme !== "all" ||
      filters.round2 !== "all";

    const teamCache = new Map<string, UserTeam | null>();
    const getTeamCached = (email: string) => {
      if (!teamCache.has(email)) {
        teamCache.set(email, getTeam(users, email));
      }
      return teamCache.get(email);
    };

    const sortedUsers = [...users].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "lastLogin":
          comparison =
            new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime();
          break;
        case "loggedInTimes":
          comparison = a.loggedInTimes - b.loggedInTimes;
          break;
        case "name":
          comparison = (a.name || "").localeCompare(b.name || "");
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "isAdmin":
          comparison = Number(a.isAdmin) - Number(b.isAdmin);
          break;
        case "isBlocked":
          comparison = Number(a.isBlocked) - Number(b.isBlocked);
          break;
      }

      return sortDir === "asc" ? comparison : -comparison;
    });

    if (!hasActiveFilters) {
      return sortedUsers.map((user) => ({ ...user, visible: true }));
    }

    return sortedUsers.map((user) => {
      let visible = true;

      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const nameMatch =
          user.name?.toLowerCase().includes(searchLower) || false;
        const emailMatch = user.email.toLowerCase().includes(searchLower);
        if (!nameMatch && !emailMatch) visible = false;
      }

      if (visible && filters.role === "admin" && !user.isAdmin) visible = false;
      if (visible && filters.role === "user" && user.isAdmin) visible = false;

      if (visible && (filters.role === "lead" || filters.role === "member")) {
        const userTeam = getTeamCached(user.email);
        if (!userTeam) {
          visible = false;
        } else {
          const currentMember = userTeam.members.find(
            (member) => member.email === user.email
          );

          if (!currentMember) {
            visible = false;
          } else if (filters.role === "lead") {
            visible = currentMember.isLead === true;
          } else {
            visible = currentMember.isLead === false;
          }
        }
      }

      if (visible && filters.status === "blocked" && !user.isBlocked)
        visible = false;
      if (visible && filters.status === "active" && user.isBlocked)
        visible = false;

      if (visible && filters.team === "yes") {
        const userTeam = getTeamCached(user.email);
        if (
          !userTeam ||
          !userTeam.members ||
          userTeam.members.length === 0 ||
          !userTeam.members.some((member) => member.email === user.email)
        ) {
          visible = false;
        }
      }

      if (visible && filters.team === "no") {
        const userTeam = getTeamCached(user.email);
        if (
          userTeam &&
          userTeam.members &&
          userTeam.members.some((member) => member.email === user.email)
        ) {
          visible = false;
        }
      }

      if (visible && filters.teamTheme !== "all") {
        const userTeam = getTeamCached(user.email);
        if (
          !userTeam ||
          !userTeam.theme ||
          userTeam.theme.toLowerCase() !== filters.teamTheme.toLowerCase()
        ) {
          visible = false;
        }
      }

      if (visible && filters.loginStatus !== "all") {
        const lastLogin = new Date(user.lastLogin);

        if (
          filters.loginStatus === "today" &&
          lastLogin.toDateString() !== dateCache.now.toDateString()
        ) {
          visible = false;
        }

        if (
          filters.loginStatus === "yesterday" &&
          lastLogin.toDateString() !== dateCache.yesterday.toDateString()
        ) {
          visible = false;
        }

        if (filters.loginStatus === "week" && lastLogin < dateCache.weekAgo) {
          visible = false;
        }

        if (filters.loginStatus === "month" && lastLogin < dateCache.monthAgo) {
          visible = false;
        }

        if (filters.loginStatus === "never" && user.loggedInTimes > 0) {
          visible = false;
        }
      }

      if (visible && filters.round2 !== "all") {
        const userTeam = getTeamCached(user.email);
        if (!userTeam) {
          visible = false;
        } else {
          // Only filter if the team's Round 2 selection status doesn't match the filter
          if (userTeam.selectedForRound2 !== filters.round2) {
            visible = false;
          }
        }
      }

      return { ...user, visible };
    });
  }, [
    debouncedSearch,
    filters.role,
    filters.status,
    filters.loginStatus,
    filters.team,
    filters.teamTheme,
    filters.round2,
    isLoading,
    dateCache,
    sortField,
    sortDir,
    users,
  ]);

  const activeUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          new Date(user.lastLogin).toDateString() ===
          dateCache.now.toDateString()
      ).length,
    [users, dateCache]
  );

  return (
    <div
      className="flex flex-col gap-4 max-w-full"
      style={{ display: isLoading ? "none" : "flex" }}
    >
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          User Management
        </h1>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData} 
            disabled={isRefreshing}
            className="flex items-center gap-1 bg-gray-800 border-gray-700 hover:bg-gray-700"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 inline-flex items-center gap-2">
            <span className="text-sm text-gray-400">Active Today:</span>
            <span className="text-lg font-semibold text-white">
              {activeUsers}
            </span>
            <span className="text-sm text-gray-400">/ {users.length}</span>
          </div>
        </div>
      </div>

      <UserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      <UserTable
        users={usersWithVisibility}
        initialUsers={users}
        sortField={sortField}
        sortDir={sortDir}
        onSortChange={handleSortChange}
        setUsers={setUsers}
      />
    </div>
  );
}

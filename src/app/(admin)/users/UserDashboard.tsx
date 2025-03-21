"use client";

import { useEffect, useMemo, useCallback, useState } from "react";
import {
  FilterState,
  SortDirection,
  SortField,
  UserWithTeam,
} from "@/types/user-data";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";
import { Users } from "lucide-react";

const FILTER_STORAGE_KEY = "user-dashboard-filters";

interface UserDashboardProps {
  initialUsers: UserWithTeam[];
}

export default function UserDashboard({ initialUsers }: UserDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [sortField, setSortField] = useState<SortField>("lastLogin");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "all",
    status: "all",
    loginStatus: "all",
    team: "all",
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
      if (savedFilters) {
        setFilters(JSON.parse(savedFilters));
      }
    } catch (error) {
      console.error("Failed to load filters from localStorage:", error);
    }

    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
    } catch (error) {
      console.error("Failed to save filters to localStorage:", error);
    }
  }, [filters]);

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
    });
  }, []);

  const filteredAndSortedUsers = useMemo(() => {
    if (isLoading) return [];

    return initialUsers
      .filter((user) => {
        if (
          filters.search &&
          !user.name?.toLowerCase().includes(filters.search.toLowerCase()) &&
          !user.email.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        if (filters.role === "admin" && !user.isAdmin) return false;
        if (filters.role === "user" && user.isAdmin) return false;

        if (filters.status === "blocked" && !user.isBlocked) return false;
        if (filters.status === "active" && user.isBlocked) return false;

        if (filters.team === "yes" && !user.team) return false;
        if (filters.team === "no" && user.team) return false;

        const now = new Date();
        const lastLogin = new Date(user.lastLogin);

        if (
          filters.loginStatus === "today" &&
          lastLogin.toDateString() !== now.toDateString()
        )
          return false;
        if (filters.loginStatus === "week") {
          const weekAgo = new Date();
          weekAgo.setDate(now.getDate() - 7);
          if (lastLogin < weekAgo) return false;
        }
        if (filters.loginStatus === "month") {
          const monthAgo = new Date();
          monthAgo.setMonth(now.getMonth() - 1);
          if (lastLogin < monthAgo) return false;
        }
        if (filters.loginStatus === "never" && user.loggedInTimes > 0)
          return false;

        return true;
      })
      .sort((a, b) => {
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
  }, [initialUsers, filters, sortField, sortDir, isLoading]);

  const activeUsers = useMemo(
    () =>
      initialUsers.filter(
        (user) =>
          new Date(user.lastLogin).toDateString() === new Date().toDateString()
      ).length,
    [initialUsers]
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
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 inline-flex items-center gap-2">
          <span className="text-sm text-gray-400">Active Today:</span>
          <span className="text-lg font-semibold text-white">
            {activeUsers}
          </span>
          <span className="text-sm text-gray-400">/ {initialUsers.length}</span>
        </div>
      </div>

      <UserFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      <UserTable
        users={filteredAndSortedUsers}
        sortField={sortField}
        sortDir={sortDir}
        onSortChange={handleSortChange}
      />
    </div>
  );
}

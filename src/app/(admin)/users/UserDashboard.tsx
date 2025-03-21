"use client";

import React, { useState, useMemo } from "react";
import UserTable from "./UserTable";
import UserFilters from "./UserFilters";
import { FilterState, SortDirection, SortField, UserTableType } from "@/types/user-data";

type UserDashboardProps = {
  initialUsers: UserTableType[];
};

export default function UserDashboard({ initialUsers }: UserDashboardProps) {
  const [sortField, setSortField] = useState<SortField>("lastLogin");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "all",
    status: "all",
    loginStatus: "all",
  });

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "all",
      status: "all",
      loginStatus: "all",
    });
  };

  const filteredAndSortedUsers = useMemo(() => {
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
        if (filters.role === "editor" && !user.canEditData) return false;
        if (filters.role === "user" && (user.isAdmin || user.canEditData))
          return false;

        if (filters.status === "blocked" && !user.isBlocked) return false;
        if (filters.status === "active" && user.isBlocked) return false;

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
          case "canEditData":
            comparison = Number(a.canEditData) - Number(b.canEditData);
            break;
          default:
            comparison = 0;
        }

        return sortDir === "asc" ? comparison : -comparison;
      });
  }, [initialUsers, filters, sortField, sortDir]);

  const activeUsers = useMemo(
    () =>
      initialUsers.filter(
        (user) =>
          new Date(user.lastLogin).toDateString() === new Date().toDateString()
      ).length,
    [initialUsers]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <div className="bg-gray-800 rounded-lg p-3 flex flex-col gap-1">
          <span className="text-sm text-gray-400">Active Today</span>
          <span className="text-xl font-semibold text-white">
            {activeUsers} / {initialUsers.length}
          </span>
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

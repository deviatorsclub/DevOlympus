import React, { memo } from "react";
import { Search, Filter, X } from "lucide-react";
import { FilterState } from "@/types/user-data";

interface UserFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const UserFilters = memo(
  ({ filters, onFilterChange, onClearFilters }: UserFiltersProps) => {
    const activeFilterCount = Object.values(filters).filter(
      (value) => value && value !== "all"
    ).length;

    return (
      <div className="bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium text-gray-200">Filters</h2>
            {activeFilterCount > 0 && (
              <button
                onClick={onClearFilters}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-9 pr-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
              />
            </div>

            <select
              className="block w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filters.role}
              onChange={(e) => onFilterChange("role", e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>

            <select
              className="block w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filters.status}
              onChange={(e) => onFilterChange("status", e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>

            <select
              className="block w-full pl-3 pr-8 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={filters.loginStatus}
              onChange={(e) => onFilterChange("loginStatus", e.target.value)}
            >
              <option value="all">Login Activity</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Filter className="w-3.5 h-3.5" />
            <span>
              {activeFilterCount > 0
                ? `${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""}`
                : "No active filters"}
            </span>
          </div>
        </div>
      </div>
    );
  }
);
UserFilters.displayName = "UserFilters";

export default UserFilters;

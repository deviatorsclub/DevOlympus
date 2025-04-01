import { memo, useState, useCallback } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { FilterState } from "@/types/user-data";

interface UserFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const UserFilters = memo(
  ({ filters, onFilterChange, onClearFilters }: UserFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const activeFilterCount = Object.values(filters).filter(
      (value) => value && value !== "all"
    ).length;

    const toggleExpanded = useCallback(
      () => setIsExpanded((prev) => !prev),
      []
    );

    const handleClick = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    );

    return (
      <div className="bg-gray-800 rounded-lg shadow">
        <div
          className="p-3 flex items-center justify-between cursor-pointer"
          onClick={toggleExpanded}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <h2 className="text-base font-medium text-gray-200">Filters</h2>
            {!!activeFilterCount && (
              <span className="text-xs px-2 py-0.5 bg-blue-900 bg-opacity-40 rounded-full text-blue-300">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!!activeFilterCount && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearFilters();
                }}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>

        {/* Using CSS for conditional rendering instead of removing from DOM */}
        <div
          className="p-3 pt-0 border-t border-gray-700 transition-all duration-200 overflow-hidden"
          style={{
            maxHeight: isExpanded ? "500px" : "0",
            opacity: isExpanded ? 1 : 0,
            borderTopWidth: isExpanded ? "1px" : "0",
            padding: isExpanded ? "12px 12px 0 12px" : "0 12px",
          }}
        >
          <div className="mt-3 flex flex-col gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-8 pr-2 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => onFilterChange("search", e.target.value)}
                onClick={handleClick}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <select
                className="block w-full pl-2 pr-6 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filters.role}
                onChange={(e) => onFilterChange("role", e.target.value)}
                onClick={handleClick}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <select
                className="block w-full pl-2 pr-6 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filters.status}
                onChange={(e) => onFilterChange("status", e.target.value)}
                onClick={handleClick}
              >
                <option value="all">Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>

              <select
                className="block w-full pl-2 pr-6 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filters.loginStatus}
                onChange={(e) => onFilterChange("loginStatus", e.target.value)}
                onClick={handleClick}
              >
                <option value="all">Login</option>
                <option value="today">Today</option>
                <option value="Yesterday">Today</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="never">Never</option>
              </select>

              <select
                className="block w-full pl-2 pr-6 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filters.team}
                onChange={(e) => onFilterChange("team", e.target.value)}
                onClick={handleClick}
              >
                <option value="all">Team</option>
                <option value="yes">Has Team</option>
                <option value="no">No Team</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
UserFilters.displayName = "UserFilters";

export default UserFilters;

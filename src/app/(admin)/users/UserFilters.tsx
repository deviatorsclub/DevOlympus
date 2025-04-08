"use client";

import { memo, useState, useCallback, useMemo } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { FilterState } from "@/types/user-data";

interface UserFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

const FilterSelect = memo(
  ({
    name,
    value,
    onChange,
    options,
    onClick,
  }: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    onClick: (e: React.MouseEvent) => void;
  }) => (
    <select
      className="block w-full pl-2 pr-6 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        const params = new URLSearchParams(window.location.search);
        if (e.target.value === "all") {
          params.delete(name);
        } else {
          params.set(name, e.target.value);
        }
        window.history.replaceState(null, "", `?${params.toString()}`);
      }}
      onClick={onClick}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
);
FilterSelect.displayName = "FilterSelect";

const SearchInput = memo(
  ({
    value,
    onChange,
    onClick,
  }: {
    value: string;
    onChange: (value: string) => void;
    onClick: (e: React.MouseEvent) => void;
  }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
        <Search className="h-3.5 w-3.5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-8 pr-2 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
        placeholder="Search users..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          const params = new URLSearchParams(window.location.search);
          params.set("search", e.target.value);
          window.history.replaceState(null, "", `?${params.toString()}`);
        }}
        onClick={onClick}
      />
    </div>
  )
);
SearchInput.displayName = "SearchInput";

const UserFilters = memo(
  ({ filters, onFilterChange, onClearFilters }: UserFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const activeFilterCount = useMemo(() => {
      return Object.values(filters).filter((value) => value && value !== "all")
        .length;
    }, [filters]);

    const toggleExpanded = useCallback(
      () => setIsExpanded((prev) => !prev),
      []
    );

    const toggleCategory = useCallback((category: string) => {
      setActiveCategory((prev) => (prev === category ? null : category));
    }, []);

    const handleClick = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      []
    );

    // Define all filter options
    const filterCategories = useMemo(
      () => [
        {
          name: "User Info",
          filters: [
            {
              name: "role",
              value: filters.role,
              onChange: (value: string) => onFilterChange("role", value),
              options: [
                { value: "all", label: "All Roles" },
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
                { value: "lead", label: "Lead" },
                { value: "member", label: "Member" },
              ],
              onClick: handleClick,
            },
            {
              name: "status",
              value: filters.status,
              onChange: (value: string) => onFilterChange("status", value),
              options: [
                { value: "all", label: "Status" },
                { value: "active", label: "Active" },
                { value: "blocked", label: "Blocked" },
              ],
              onClick: handleClick,
            },
            {
              name: "loginStatus",
              value: filters.loginStatus,
              onChange: (value: string) => onFilterChange("loginStatus", value),
              options: [
                { value: "all", label: "Login" },
                { value: "today", label: "Today" },
                { value: "yesterday", label: "Yesterday" },
                { value: "week", label: "Week" },
                { value: "month", label: "Month" },
                { value: "never", label: "Never" },
              ],
              onClick: handleClick,
            },
          ],
        },
        {
          name: "Team Info",
          filters: [
            {
              name: "team",
              value: filters.team,
              onChange: (value: string) => onFilterChange("team", value),
              options: [
                { value: "all", label: "Team" },
                { value: "yes", label: "Has Team" },
                { value: "no", label: "No Team" },
              ],
              onClick: handleClick,
            },
            {
              name: "teamTheme",
              value: filters.teamTheme,
              onChange: (value: string) => onFilterChange("teamTheme", value),
              options: [
                { value: "all", label: "Theme" },
                { value: "AI & Machine Learning", label: "AI & ML" },
                { value: "Blockchain & Web3", label: "Blockchain" },
                { value: "Cybersecurity & Privacy", label: "Cybersecurity" },
                { value: "Open Innovation", label: "Open Innovation" },
                { value: "Robotics", label: "Robotics" },
              ],
              onClick: handleClick,
            },
            {
              name: "round2",
              value: filters.round2,
              onChange: (value: string) => onFilterChange("round2", value),
              options: [
                { value: "all", label: "Round 2" },
                { value: "SELECTED", label: "Selected" },
                { value: "REJECTED", label: "Rejected" },
                { value: "NOT_DECIDED", label: "Not Decided" },
              ],
              onClick: handleClick,
            },
          ],
        },
        {
          name: "Documentation",
          filters: [
            {
              name: "payment",
              value: filters.payment,
              onChange: (value: string) => onFilterChange("payment", value),
              options: [
                { value: "all", label: "Payment" },
                { value: "VERIFIED", label: "Verified" },
                { value: "NOT_VERIFIED", label: "Not Verified" },
                { value: "UNPAID", label: "Unpaid" },
              ],
              onClick: handleClick,
            },
            {
              name: "consentLetter",
              value: filters.consentLetter,
              onChange: (value: string) =>
                onFilterChange("consentLetter", value),
              options: [
                { value: "all", label: "Consent Letter" },
                { value: "UPLOADED", label: "Uploaded" },
                { value: "NOT_UPLOADED", label: "Not Uploaded" },
              ],
              onClick: handleClick,
            },
          ],
        },
      ],
      [filters, handleClick, onFilterChange]
    );

    return (
      <div className="bg-gray-800 rounded-lg shadow-md mb-4">
        <div
          className="p-3 flex items-center justify-between cursor-pointer"
          onClick={toggleExpanded}
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-200">Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs font-semibold rounded-full bg-blue-600 text-white">
                {activeFilterCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {activeFilterCount > 0 && (
              <button
                className="text-xs text-gray-400 hover:text-gray-200 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearFilters();
                }}
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </button>
            )}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-3 border-t border-gray-700">
            <div className="grid grid-cols-1 gap-3">
              <SearchInput
                value={filters.search}
                onChange={(value) => onFilterChange("search", value)}
                onClick={handleClick}
              />

              {filterCategories.map((category, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-md overflow-hidden"
                >
                  <div
                    className="bg-gray-750 p-2 flex justify-between items-center cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className="text-sm font-medium text-gray-200">
                      {category.name}
                    </span>
                    {activeCategory === category.name ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {activeCategory === category.name && (
                    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {category.filters.map((filter) => (
                        <FilterSelect
                          key={filter.name}
                          name={filter.name}
                          value={filter.value}
                          onChange={filter.onChange}
                          options={filter.options}
                          onClick={filter.onClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);
UserFilters.displayName = "UserFilters";

export default UserFilters;

import { memo, useState, useCallback, useMemo } from "react";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { FilterState } from "@/types/user-data";
import { Theme } from "@/lib/flags";

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
        params.set(name, e.target.value);
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
  ),
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
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
      />
    </div>
  ),
);
SearchInput.displayName = "SearchInput";

const UserFilters = memo(
  ({ filters, onFilterChange, onClearFilters }: UserFiltersProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const activeFilterCount = useMemo(() => {
      return Object.values(filters).filter((value) => value && value !== "all")
        .length;
    }, [filters]);

    const toggleExpanded = useCallback(
      () => setIsExpanded((prev) => !prev),
      [],
    );

    const handleClick = useCallback(
      (e: React.MouseEvent) => e.stopPropagation(),
      [],
    );

    const roleOptions = useMemo(
      () => [
        { value: "all", label: "All Roles" },
        { value: "admin", label: "Admin" },
        { value: "user", label: "User" },
        { value: "lead", label: "Lead" },
        { value: "member", label: "Member" },
      ],
      [],
    );

    const statusOptions = useMemo(
      () => [
        { value: "all", label: "Status" },
        { value: "active", label: "Active" },
        { value: "blocked", label: "Blocked" },
      ],
      [],
    );

    const loginOptions = useMemo(
      () => [
        { value: "all", label: "Login" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "never", label: "Never" },
      ],
      [],
    );

    const teamOptions = useMemo(
      () => [
        { value: "all", label: "Team" },
        { value: "yes", label: "Has Team" },
        { value: "no", label: "No Team" },
      ],
      [],
    );

    const teamThemeOptions = useMemo<{ value: Theme | "all"; label: string }[]>(
      () => [
        { value: "all", label: "Theme" },
        { value: "AI & Machine Learning", label: "AI & Machine Learning" },
        { value: "Blockchain & Web3", label: "Blockchain" },
        { value: "Cybersecurity & Privacy", label: "Cybersecurity" },
        { value: "Open Innovation", label: "Open Innovation" },
        { value: "Robotics", label: "Robotics" },
      ],
      [],
    );

    const round2Options = useMemo(
      () => [
        { value: "all", label: "Round 2" },
        { value: "SELECTED", label: "Selected" },
        { value: "REJECTED", label: "Rejected" },
        { value: "NOT_DECIDED", label: "Not Decided" },
      ],
      [],
    );

    return (
      <div className="bg-gray-800 rounded-lg shadow">
        <div
          className="p-3 flex items-center justify-between cursor-pointer select-none"
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

        <div
          className="relative border-t border-gray-700 transition-all duration-200 overflow-hidden"
          style={{
            maxHeight: isExpanded ? "500px" : "0",
            opacity: isExpanded ? 1 : 0,
            borderTopWidth: isExpanded ? "1px" : "0",
            padding: isExpanded ? "12px 12px 12px 12px" : "0 12px",
          }}
        >
          <div className="flex flex-col gap-2">
            <SearchInput
              value={filters.search}
              onChange={(value) => onFilterChange("search", value)}
              onClick={handleClick}
            />

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                {
                  value: filters.role,
                  key: "role",
                  options: roleOptions,
                  onClick: handleClick,
                },
                {
                  value: filters.status,
                  key: "status",
                  options: statusOptions,
                  onClick: handleClick,
                },
                {
                  value: filters.loginStatus,
                  key: "loginStatus",
                  options: loginOptions,
                  onClick: handleClick,
                },
                {
                  value: filters.team,
                  key: "team",
                  options: teamOptions,
                  onClick: handleClick,
                },
                {
                  value: filters.teamTheme,
                  key: "teamTheme",
                  options: teamThemeOptions,
                  onClick: handleClick,
                },
                {
                  value: filters.round2,
                  key: "round2",
                  options: round2Options,
                  onClick: handleClick,
                },
              ].map((option) => (
                <FilterSelect
                  name={option.key}
                  key={option.key}
                  value={option.value}
                  onChange={(value) =>
                    onFilterChange(option.key as keyof FilterState, value)
                  }
                  options={option.options}
                  onClick={option.onClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
UserFilters.displayName = "UserFilters";

export default UserFilters;

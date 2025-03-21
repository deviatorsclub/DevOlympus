import React, { memo } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  XCircle,
  Calendar,
  Shield,
  Pencil,
  UserCircle,
  MoreHorizontal,
} from "lucide-react";
import { SortDirection, SortField, UserTableType } from "@/types/user-data";
import Image from "next/image";

interface UserTableProps {
  users: UserTableType[];
  sortField: SortField;
  sortDir: SortDirection;
  onSortChange: (field: SortField) => void;
}

const UserTable = memo(
  ({ users, sortField, sortDir, onSortChange }: UserTableProps) => {
    const renderSortIcon = (field: SortField) =>
      sortField === field ? (
        sortDir === "asc" ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : null;

    if (users.length === 0) {
      return (
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400">No users match your criteria</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center px-2">
          <p className="text-sm text-gray-400">
            Showing{" "}
            <span className="font-medium text-white">{users.length}</span> users
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600">
            <table className="w-full table-auto">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-10">
                    #
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("name")}
                    >
                      User {renderSortIcon("name")}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("email")}
                    >
                      Email {renderSortIcon("email")}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("isAdmin")}
                    >
                      Role {renderSortIcon("isAdmin")}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("isBlocked")}
                    >
                      Status {renderSortIcon("isBlocked")}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("lastLogin")}
                    >
                      Last {renderSortIcon("lastLogin")}
                    </div>
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("loggedInTimes")}
                    >
                      Count {renderSortIcon("loggedInTimes")}
                    </div>
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider w-10">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-400 text-center">
                      {index + 1}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 flex-shrink-0 bg-gray-600 rounded-full overflow-hidden">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || "User"}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <UserCircle className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-200 truncate max-w-[120px] sm:max-w-full">
                            {user.name || "Unnamed"}
                          </div>
                          <div className="text-xs text-gray-400 md:hidden truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300 hidden md:table-cell">
                      <span className="truncate max-w-[180px] lg:max-w-full block">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">
                      <div className="flex flex-col gap-1">
                        {user.isAdmin && (
                          <span className="inline-flex items-center gap-1 text-purple-300 bg-purple-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        )}
                        {user.canEditData && (
                          <span className="inline-flex items-center gap-1 text-blue-300 bg-blue-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                            <Pencil className="w-3 h-3" /> Editor
                          </span>
                        )}
                        {!user.isAdmin && !user.canEditData && (
                          <span className="inline-flex items-center gap-1 text-gray-300 bg-gray-700 px-2 py-0.5 rounded-full text-xs">
                            <UserCircle className="w-3 h-3" /> User
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-1 text-red-300 bg-red-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                          <XCircle className="w-3 h-3" /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-300 bg-green-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(user.lastLogin).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                      {user.loggedInTimes}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-right text-sm text-gray-400">
                      <button className="p-1 hover:bg-gray-600 rounded-full transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
);
UserTable.displayName = "UserTable";

export default UserTable;

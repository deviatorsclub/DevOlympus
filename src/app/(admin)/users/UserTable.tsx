import { memo, useState, useCallback, useMemo } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle,
  XCircle,
  Calendar,
  Shield,
  UserCircle,
  X,
  Users,
  Link,
  Palette,
  User,
  Info,
} from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/types/registration";
import { SortDirection, SortField, UserWithTeam } from "@/types/user-data";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const DetailItem = memo(({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-700 bg-opacity-50">
    <div className="text-gray-400 mt-0.5">{icon}</div>
    <div className="flex-1">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-gray-200 font-medium">{value}</div>
    </div>
  </div>
));
DetailItem.displayName = "DetailItem";

interface TeamMemberCardProps {
  member: TeamMember;
  isLead: boolean;
}

const TeamMemberCard = memo(({ member, isLead }: TeamMemberCardProps) => (
  <div className="flex items-center p-2 rounded-lg bg-gray-700 bg-opacity-30">
    <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-300 mr-3">
      <User className="w-4 h-4" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-200">{member.name}</span>
        {isLead && (
          <span className="bg-amber-900 bg-opacity-40 text-amber-300 text-xs px-1.5 py-0.5 rounded-full">
            Lead
          </span>
        )}
      </div>
      <div className="text-xs text-gray-400">{member.email}</div>
      <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
        <span>Roll: {member.rollNo}</span>
        <span>•</span>
        <span>Ph: {member.number}</span>
      </div>
    </div>
  </div>
));
TeamMemberCard.displayName = "TeamMemberCard";

interface UserDetailPopupProps {
  user: UserWithTeam | null;
  onClose: () => void;
  isVisible: boolean;
}

const UserDetailPopup = memo(
  ({ user, onClose, isVisible }: UserDetailPopupProps) => {
    if (!isVisible || !user) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const teamMembers = user.team?.members || [];
    const teamLead = teamMembers.find((member) => member.isLead);

    return (
      <div
        className="fixed inset-0 backdrop-blur-xl bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gray-900 p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="h-20 w-20 bg-gray-700 rounded-full overflow-hidden ring-2 ring-gray-600">
                {user.image ? (
                  <Image
                    src={user.image.replace("=s96-c", "")}
                    alt={user.name || "User"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    unoptimized
                    width={200}
                    height={200}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <UserCircle className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {user.name || "Unnamed User"}
                </h3>
                <div className="text-sm text-gray-400 mt-1">{user.email}</div>
                <div className="flex gap-2 mt-2">
                  {user.isBlocked ? (
                    <span className="inline-flex items-center gap-1 text-red-300 bg-red-900 bg-opacity-40 px-2 py-1 rounded-full text-sm">
                      <XCircle className="w-3 h-3" /> Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-green-300 bg-green-900 bg-opacity-40 px-2 py-1 rounded-full text-sm">
                      <CheckCircle className="w-3 h-3" /> Active
                    </span>
                  )}
                  {user.team && (
                    <span className="inline-flex items-center gap-1 text-teal-300 bg-teal-900 bg-opacity-40 px-2 py-1 rounded-full text-sm">
                      <Users className="w-3 h-3" /> {user.team.displayId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <DetailItem
                icon={<Info className="w-4 h-4" />}
                label="User ID"
                value={`#${user.id}`}
              />
              <DetailItem
                icon={<Shield className="w-4 h-4" />}
                label="Role"
                value={
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                      user.isAdmin
                        ? "text-purple-300 bg-purple-900 bg-opacity-40"
                        : "text-gray-300 bg-gray-700"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                }
              />
              <DetailItem
                icon={<Info className="w-4 h-4" />}
                label="Login Count"
                value={
                  <span className="text-amber-300">{user.loggedInTimes}</span>
                }
              />
              <DetailItem
                icon={<Calendar className="w-4 h-4" />}
                label="Last Login"
                value={
                  <div>
                    <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(user.lastLogin).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                }
              />
            </div>

            {user.team && "name" in user.team && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">
                    Team Information
                  </h4>
                  <span className="text-sm text-teal-300">
                    {user.team.displayId}
                  </span>
                </div>

                <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-md font-medium text-white">
                        {user.team.name}
                      </h5>
                      <div className="text-xs text-gray-400 mt-1">
                        {teamMembers.length} members
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Registered At:{" "}
                        {user.team.createdAt.toLocaleDateString()} at{" "}
                        {user.team.createdAt.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>

                      {teamLead && (
                        <div className="mt-2 bg-amber-900 bg-opacity-30 text-amber-300 text-xs px-2 py-1 rounded-lg inline-flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Lead: {teamLead.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Palette className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Theme: </span>
                        <span className="ml-1 text-teal-300">
                          {user.team.theme}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        <Link className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Presentation: </span>
                        <a
                          href={user.team.presentationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-1 text-blue-400 hover:underline truncate max-w-[200px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {user.team.presentationUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">
                    Team Members
                  </h5>
                  <div className="grid grid-cols-1 gap-2">
                    {teamMembers.map((member) => (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        isLead={member.isLead}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {!user.team && (
              <div className="flex items-center justify-center p-6 bg-gray-700 bg-opacity-20 rounded-lg">
                <div className="text-center">
                  <Info className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300">
                    User have not created a team yet.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 p-4 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
);

UserDetailPopup.displayName = "UserDetailPopup";

interface UserTableProps {
  users: UserWithTeam[];
  sortField: SortField;
  sortDir: SortDirection;
  onSortChange: (field: SortField) => void;
}

export default function UserTable({
  users,
  sortField,
  sortDir,
  onSortChange,
}: UserTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [users, selectedUserId]
  );

  const handleRowClick = useCallback((user: UserWithTeam) => {
    setSelectedUserId(user.id);
  }, []);

  const closeUserDetail = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  const renderSortIcon = useCallback(
    (field: SortField) =>
      sortField === field ? (
        sortDir === "asc" ? (
          <ArrowUp className="w-4 h-4" />
        ) : (
          <ArrowDown className="w-4 h-4" />
        )
      ) : null,
    [sortField, sortDir]
  );

  const isEmptyState = users.length === 0;

  if (isEmptyState) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 text-center">
        <p className="text-gray-400">No users match the current filters</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="px-2 py-1 text-sm text-gray-400">
          <span className="font-medium text-white">{users.length}</span> users
          found
        </div>

        <div className="bg-gray-800 rounded-lg shadow">
          <div className="overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="sticky left-0 bg-gray-700 p-3 text-left text-xs font-medium text-gray-300 uppercase w-10">
                    #
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("name")}
                    >
                      User {renderSortIcon("name")}
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("email")}
                    >
                      Email {renderSortIcon("email")}
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("isAdmin")}
                    >
                      Role {renderSortIcon("isAdmin")}
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Team ID
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("isBlocked")}
                    >
                      Status {renderSortIcon("isBlocked")}
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("lastLogin")}
                    >
                      Last {renderSortIcon("lastLogin")}
                    </div>
                  </th>
                  <th className="p-3 text-left text-xs font-medium text-gray-300 uppercase">
                    <div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => onSortChange("loggedInTimes")}
                    >
                      Count {renderSortIcon("loggedInTimes")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(user)}
                  >
                    <td className="sticky left-0 bg-gray-800 p-3 text-sm text-gray-400 text-center">
                      {index + 1}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="h-9 w-9 flex-shrink-0 bg-gray-600 rounded-full overflow-hidden">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || "User"}
                              width={36}
                              height={36}
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
                          <div className="font-medium text-gray-200 text-sm">
                            {user.name || "Unnamed"}
                          </div>
                          <div className="text-xs text-gray-400">
                            #{user.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        {user.isAdmin && (
                          <span className="inline-flex items-center gap-1 text-purple-300 bg-purple-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                            <Shield className="w-3 h-3" /> Admin
                          </span>
                        )}
                        {!user.isAdmin && (
                          <span className="inline-flex items-center gap-1 text-gray-300 bg-gray-700 px-2 py-0.5 rounded-full text-sm">
                            <UserCircle className="w-3 h-3" /> User
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {user.team ? (
                        <span className="inline-flex items-center gap-1 text-teal-300 bg-teal-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                          <Users className="w-3 h-3" /> {user.team.displayId}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      {user.isBlocked ? (
                        <span className="inline-flex items-center gap-1 text-red-300 bg-red-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                          <XCircle className="w-3 h-3" /> Blocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-green-300 bg-green-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {new Date(user.lastLogin).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-300">
                      {user.loggedInTimes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserDetailPopup
        user={selectedUser}
        onClose={closeUserDetail}
        isVisible={!!selectedUser}
      />
    </>
  );
}

import {
  memo,
  useState,
  useCallback,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { updateTeamRound2Status } from "@/app/actions/teamActions";
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
  Award,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { TeamMember } from "@/types/registration";
import {
  SortDirection,
  SortField,
  UserWithTeam,
  UserTeam,
} from "@/types/user-data";
import { getTeam } from "@/lib/utils";
import { Prisma } from "@prisma/client";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

type TeamSelectionStatus = Prisma.TeamGetPayload<{
  select: {
    selectedForRound2: true;
  };
}>["selectedForRound2"];

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
  isCurrentUser?: boolean;
}

const TeamMemberCard = memo(
  ({ member, isLead, isCurrentUser }: TeamMemberCardProps) => (
    <div
      className={`flex items-center p-2 rounded-lg ${isCurrentUser ? "bg-blue-900 bg-opacity-30" : "bg-gray-700 bg-opacity-30"}`}
    >
      <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-300 mr-3">
        <User className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-200">
            {member.name}
          </span>
          {isLead && (
            <span className="bg-amber-900 bg-opacity-40 text-amber-300 text-xs px-1.5 py-0.5 rounded-full">
              Lead
            </span>
          )}
          {isCurrentUser && (
            <span className="bg-blue-900 bg-opacity-40 text-blue-300 text-xs px-1.5 py-0.5 rounded-full">
              You
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
  )
);
TeamMemberCard.displayName = "TeamMemberCard";

interface UserDetailPopupProps {
  user: UserWithTeam | null;
  setUsers: Dispatch<SetStateAction<(UserWithTeam & { visible?: boolean })[]>>;
  team: UserTeam;
  onClose: () => void;
  isVisible: boolean;
  isAdmin: boolean;
}

const UserDetailPopup = memo(
  ({
    user,
    setUsers,
    team,
    onClose,
    isVisible,
    isAdmin,
  }: UserDetailPopupProps) => {
    const [updatingTeamIds, setUpdatingTeamIds] = useState<Record<string, boolean>>({});

    const [selectedStatus, setSelectedStatus] = useState<TeamSelectionStatus>(
      team?.selectedForRound2 ?? "NOT_DECIDED"
    );
    
    const isUpdating = team?.id ? updatingTeamIds[team.id] : false;

    useEffect(() => {
      if (team && isVisible) {
        setSelectedStatus(team.selectedForRound2 ?? "NOT_DECIDED");
        // Reset loading state when opening a new popup
        if (team.id) {
          setUpdatingTeamIds(prev => ({
            ...prev,
            [team.id]: false
          }));
        }
      }
    }, [team, isVisible]);

    if (!isVisible || !user) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const teamMembers = team?.members || [];
    const teamLead = teamMembers.find((member) => member.isLead);

    const currentMember = teamMembers.find(
      (member) => member.email === user.email
    );

    const userIsMember = !!currentMember;

    const userIsLead = userIsMember && currentMember?.isLead === true;

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
                  {team && (
                    <span className="inline-flex items-center gap-1 text-teal-300 bg-teal-900 bg-opacity-40 px-2 py-1 rounded-full text-sm">
                      <Users className="w-3 h-3" /> {team.displayId}
                    </span>
                  )}
                  {team && userIsLead && (
                    <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-900 bg-opacity-40 px-2 py-1 rounded-full text-sm">
                      <Shield className="w-3 h-3" /> Team Lead
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

            {team && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">
                    Team Information
                  </h4>
                  <span className="text-sm text-teal-300">
                    {team.displayId}
                  </span>
                </div>

                <div className="bg-gray-700 bg-opacity-30 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-md font-medium text-white">
                        {team.name}
                      </h5>
                      <div className="text-xs text-gray-400 mt-1">
                        {teamMembers.length} members
                      </div>
                      {team.createdAt && (
                        <div className="text-xs text-gray-400 mt-1">
                          Registered At:{" "}
                          {new Date(team.createdAt).toLocaleDateString()} at{" "}
                          {new Date(team.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}

                      {teamLead && (
                        <div className="mt-2 bg-amber-900 bg-opacity-30 text-amber-300 text-xs px-2 py-1 rounded-lg inline-flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          <span>Lead: {teamLead.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {team.theme && (
                        <div className="flex items-center text-sm">
                          <Palette className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-300">Theme: </span>
                          <span className="ml-1 text-teal-300">
                            {team.theme}
                          </span>
                        </div>
                      )}

                      {/* Round 2 Selection Status */}
                      <div className="flex items-center text-sm">
                        <Award className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-gray-300">Round 2: </span>
                        {isAdmin ? (
                          <div className="relative inline-block">
                            {isUpdating && (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 rounded-md z-10">
                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                              </div>
                            )}
                            <select
                              className="ml-1 bg-gray-700 border border-gray-600 rounded-md text-sm px-2 py-1 text-gray-200"
                              value={selectedStatus}
                              disabled={isUpdating}
                              onChange={async (e) => {
                                const value = e.target.value;
                                const status = value === "" ? null : value;

                                if (team.id) {
                                  setUpdatingTeamIds(prev => ({
                                    ...prev,
                                    [team.id]: true
                                  }));
                                }
                                setSelectedStatus(value as TeamSelectionStatus);
                                try {
                                  const res = await updateTeamRound2Status(
                                    team.id,
                                    status
                                  );

                                  if (res.error) {
                                    alert(res.error);
                                    return;
                                  }

                                  setUsers((prevUsers) => {
                                    return prevUsers.map((user) => {
                                      if (user.team?.id === team.id) {
                                        return {
                                          ...user,
                                          team: {
                                            ...user.team,
                                            selectedForRound2:
                                              status as TeamSelectionStatus,
                                          },
                                        };
                                      }
                                      return user;
                                    });
                                  });

                                  if (isVisible && team.id) {
                                    setUpdatingTeamIds(prev => ({
                                      ...prev,
                                      [team.id]: false
                                    }));
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error updating status:",
                                    error
                                  );
                                  alert(
                                    "Failed to update Round 2 selection status"
                                  );

                                  if (isVisible && team.id) {
                                    setUpdatingTeamIds(prev => ({
                                      ...prev,
                                      [team.id]: false
                                    }));
                                  }
                                }
                              }}
                            >
                              <option value="">Select Status</option>
                              <option value="SELECTED">Selected</option>
                              <option value="REJECTED">Rejected</option>
                              <option value="NOT_DECIDED">Not Decided</option>
                            </select>
                          </div>
                        ) : (
                          <span
                            className={`ml-1 ${
                              team.selectedForRound2 === "SELECTED"
                                ? "text-green-300"
                                : team.selectedForRound2 === "REJECTED"
                                  ? "text-red-300"
                                  : team.selectedForRound2 === "NOT_DECIDED"
                                    ? "text-yellow-300"
                                    : "text-gray-400"
                            }`}
                          >
                            {team.selectedForRound2 === "SELECTED"
                              ? "Selected"
                              : team.selectedForRound2 === "REJECTED"
                                ? "Rejected"
                                : team.selectedForRound2 === "NOT_DECIDED"
                                  ? "Not Decided"
                                  : "Not Set"}
                          </span>
                        )}
                      </div>

                      {team.presentationUrl && (
                        <div className="flex items-center text-sm">
                          <Link className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-300">Presentation: </span>
                          <a
                            href={team.presentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-blue-400 hover:underline truncate max-w-[200px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {team.presentationUrl}
                          </a>
                        </div>
                      )}
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
                        isCurrentUser={member.email === user.email}
                      />
                    ))}
                  </div>
                </div>

                {/* Show user's team role information */}
                {team && teamMembers.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-blue-900 bg-opacity-20 border border-blue-800">
                    <div className="flex items-center gap-2 text-blue-300 mb-2">
                      <Info className="w-4 h-4" />
                      <span className="font-medium">Team Role</span>
                    </div>
                    <p className="text-sm text-blue-200">
                      {userIsLead
                        ? "This user is the team leader."
                        : userIsMember
                          ? "This user is a member of this team but not the team leader."
                          : "This user is associated with this team but not listed as a team member."}
                    </p>
                  </div>
                )}
              </>
            )}

            {!team && (
              <div className="flex items-center justify-center p-6 bg-gray-700 bg-opacity-20 rounded-lg">
                <div className="text-center">
                  <Info className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-300">User is not part of any team.</p>
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
  users: (UserWithTeam & { visible?: boolean })[];
  setUsers: Dispatch<SetStateAction<(UserWithTeam & { visible?: boolean })[]>>;
  initialUsers: UserWithTeam[];
  sortField: SortField;
  sortDir: SortDirection;
  onSortChange: (field: SortField) => void;
}

export default function UserTable({
  users,
  setUsers,
  initialUsers,
  sortField,
  sortDir,
  onSortChange,
}: UserTableProps) {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) || null,
    [users, selectedUserId]
  );
  const selectedTeam = useMemo(
    () => getTeam(initialUsers, selectedUser?.email || ""),
    [selectedUser, initialUsers]
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

  const visibleUsers = useMemo(
    () => users.filter((user) => user.visible !== false),
    [users]
  );
  const isEmptyState = visibleUsers.length === 0;

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
          <span className="font-medium text-white">{visibleUsers.length}</span>{" "}
          users found
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
                {users.map((user, index) => {
                  const team = getTeam(initialUsers, user.email);
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-700 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(user)}
                      style={{
                        display: user.visible === false ? "none" : undefined,
                      }}
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
                        {team ? (
                          <div className="flex flex-col gap-1">
                            <span className="inline-flex items-center gap-1 text-teal-300 bg-teal-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                              <Users className="w-3 h-3" /> {team.displayId}
                            </span>
                            {team.members &&
                              team.members.some(
                                (member) =>
                                  !member.isLead && member.email === user.email
                              ) && (
                                <span className="inline-flex items-center gap-1 text-blue-300 bg-blue-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                                  <Info className="w-3 h-3" /> Member
                                </span>
                              )}
                            {team.members &&
                              team.members.some(
                                (member) =>
                                  member.isLead && member.email === user.email
                              ) && (
                                <span className="inline-flex items-center gap-1 text-amber-300 bg-amber-900 bg-opacity-40 px-2 py-0.5 rounded-full text-xs">
                                  <Shield className="w-3 h-3" /> Lead
                                </span>
                              )}
                          </div>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserDetailPopup
        user={selectedUser}
        team={selectedTeam}
        onClose={closeUserDetail}
        isVisible={!!selectedUser}
        isAdmin={true}
        setUsers={setUsers}
      />
    </>
  );
}

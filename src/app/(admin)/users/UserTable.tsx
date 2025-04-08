import {
  memo,
  useState,
  useCallback,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { updateTeamRound2Status, getTeamHistory } from "@/actions/teamActions";
import { updatePaymentVerificationStatus } from "@/actions/paymentActions";
import {
  ArrowDown,
  ExternalLink,
  ArrowUp,
  CheckCircle,
  XCircle,
  Calendar,
  Shield,
  UserCircle,
  X,
  Users,
  Link as LinkIcon,
  Palette,
  User,
  Info,
  Award,
  Loader2,
  Clock,
  History,
  RefreshCw,
  CreditCard,
  DollarSign,
  Hash,
  Check,
  AlertCircle,
  CheckSquare,
  XSquare,
  FileText,
} from "lucide-react";
import {
  SortDirection,
  SortField,
  UserWithTeam,
  UserTeam,
  StatusChangeLog,
} from "@/types/user-data";
import { getTeam } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { FLAGS } from "@/lib/flags";

interface DetailItemProps {
  icon: React.ReactNode;
  label: string | undefined;
  value: React.ReactNode;
  extLink?: string;
}

type TeamSelectionStatus = Prisma.TeamGetPayload<{
  select: {
    selectedForRound2: true;
  };
}>["selectedForRound2"];

const DetailItem = memo(({ icon, label, value, extLink }: DetailItemProps) => (
  <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-700 bg-opacity-50">
    <div className="text-gray-400 mt-0.5 flex-shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="text-xs flex items-center gap-1 text-gray-400 mb-1">
        {label}
        {extLink && (
          <Link href={extLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </Link>
        )}
      </div>
      <div className="text-gray-200 font-medium overflow-hidden text-ellipsis">
        {value}
      </div>
    </div>
  </div>
));
DetailItem.displayName = "DetailItem";

interface TeamMemberCardProps {
  member: {
    number: string;
    name: string;
    id: string;
    email: string;
    rollNo: string;
    isLead: boolean;
    teamId: string;
    consentLetter?: Prisma.ConsentLetterGetPayload<{
      select: {
        id: true;
        fileUrl: true;
      };
    }>;
  };
  isLead: boolean;
  isCurrentUser?: boolean;
  consentUploaded?: boolean;
}

const TeamMemberCard = memo(
  ({ member, isLead, isCurrentUser, consentUploaded }: TeamMemberCardProps) => (
    <div
      className={`flex items-start p-2 rounded-lg ${isCurrentUser ? "bg-blue-900 bg-opacity-30" : "bg-gray-700 bg-opacity-30"}`}
    >
      <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-300 mr-3 flex-shrink-0">
        <User className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <div className="flex gap-2 items-center text-sm font-medium text-gray-200 break-all">
            {member.name}
            <Link
              href={`/register?e=${member.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
          {isLead && (
            <span className="bg-amber-900 bg-opacity-40 text-amber-300 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">
              Lead
            </span>
          )}
          {isCurrentUser && (
            <span className="bg-blue-900 bg-opacity-40 text-blue-300 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0">
              You
            </span>
          )}
        </div>
        <div className="text-xs text-gray-400 break-all">{member.email}</div>
        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5">
          <span>Roll: {member.rollNo}</span>
          <span className="hidden sm:inline">•</span>
          <span>Ph: {member.number}</span>
        </div>
        {/* consent */}
        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5">
          <span>Consent Letter:</span>
          <span className="hidden sm:inline">•</span>
          <span>{consentUploaded ? "Uploaded" : "Not Uploaded"}</span>
        </div>
      </div>
    </div>
  )
);
TeamMemberCard.displayName = "TeamMemberCard";

const PaymentDetails = memo(
  ({
    team,
    user,
    isAdmin,
  }: {
    team: UserTeam;
    user: UserWithTeam;
    isAdmin?: boolean;
  }) => {
    const payment = team?.payment;
    const [isUpdating, setIsUpdating] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<
      boolean | undefined
    >(payment?.verified);
    const [statusMessage, setStatusMessage] = useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);

    useEffect(() => {
      if (payment) {
        setVerificationStatus(payment.verified);
      }
    }, [payment]);

    const paymentStatus = useMemo(() => {
      if (!payment) return "UNPAID";
      return verificationStatus ? "VERIFIED" : "PENDING";
    }, [payment, verificationStatus]);

    const handleVerificationChange = useCallback(
      async (newStatus: boolean) => {
        if (!payment || !team.id || !FLAGS.canUpdatePayment) return;

        try {
          setIsUpdating(true);
          setStatusMessage(null);

          const result = await updatePaymentVerificationStatus(
            team.id,
            newStatus
          );

          if (result.error) {
            setStatusMessage({ type: "error", text: result.error });
            return;
          }

          setVerificationStatus(newStatus);
          setStatusMessage({
            type: "success",
            text: `Payment ${newStatus ? "verified" : "marked as pending"} successfully`,
          });

          setTimeout(() => {
            setStatusMessage(null);
          }, 3000);
        } catch (error) {
          console.error("Error updating payment status:", error);
          setStatusMessage({
            type: "error",
            text: "Failed to update payment status",
          });
        } finally {
          setIsUpdating(false);
        }
      },
      [payment, team.id]
    );

    const paymentDetails = useMemo(() => {
      const statusDetail = {
        icon: <CreditCard className="w-4 h-4" />,
        label: "Payment Status",
        value: payment ? (
          isAdmin && FLAGS.canUpdatePayment ? (
            <div className="flex items-center gap-2">
              <span
                className={`${verificationStatus ? "text-green-400" : "text-yellow-400"}`}
              >
                {paymentStatus}
              </span>
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              ) : (
                <div className="flex gap-1">
                  <button
                    onClick={() => handleVerificationChange(true)}
                    disabled={isUpdating || verificationStatus === true}
                    className={`p-1 rounded ${verificationStatus === true ? "bg-green-900/30 text-green-400" : "hover:bg-green-900/30 text-gray-400 hover:text-green-400"}`}
                    title="Mark as verified"
                  >
                    <CheckSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleVerificationChange(false)}
                    disabled={isUpdating || verificationStatus === false}
                    className={`p-1 rounded ${verificationStatus === false ? "bg-yellow-900/30 text-yellow-400" : "hover:bg-yellow-900/30 text-gray-400 hover:text-yellow-400"}`}
                    title="Mark as pending"
                  >
                    <XSquare className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span
              className={`${verificationStatus ? "text-green-400" : "text-yellow-400"}`}
            >
              {paymentStatus}
            </span>
          )
        ) : (
          <span className="text-gray-400">UNPAID</span>
        ),
      };

      if (!payment) {
        return [statusDetail];
      }

      return [
        statusDetail,
        {
          icon: <DollarSign className="w-4 h-4" />,
          label: "Sender Name",
          value: payment.senderName,
        },
        {
          icon: <Hash className="w-4 h-4" />,
          label: "Mobile Number",
          value: payment.mobileNumber,
        },
        {
          icon: <Calendar className="w-4 h-4" />,
          label: "Payment Date",
          value: new Date(payment.createdAt).toLocaleDateString(),
        },
        payment.id
          ? {
              icon: <Check className="w-4 h-4" />,
              label: "Screenshot",
              value: (
                <Link
                  href={`/api/round-2-pay-screenshot/${payment.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Receipt
                </Link>
              ),
            }
          : undefined,
      ].filter(Boolean);
    }, [
      payment,
      paymentStatus,
      isAdmin,
      verificationStatus,
      isUpdating,
      handleVerificationChange,
    ]);

    return (
      <div className="mt-6 border-t border-gray-700 pt-4">
        <div className="flex gap-2 items-center mb-3">
          <h3 className="text-lg font-medium text-white">Payment Details</h3>
          <Link href={"/round-2-payment?e=" + user.email} target="_blank">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
        {statusMessage && (
          <div
            className={`mb-3 p-2 rounded-md flex items-center gap-2 text-sm ${statusMessage.type === "success" ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {statusMessage.text}
          </div>
        )}
        {!payment && !isAdmin && (
          <div className="mb-3 p-3 rounded-md bg-gray-700 bg-opacity-30 text-sm text-gray-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-gray-400" />
            No payment has been submitted yet
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {paymentDetails.map((detail, index) => (
            <DetailItem
              key={index}
              icon={detail?.icon}
              label={detail?.label}
              value={detail?.value}
            />
          ))}
        </div>
      </div>
    );
  }
);

PaymentDetails.displayName = "PaymentDetails";

interface UserDetailPopupProps {
  users: (UserWithTeam & { visible?: boolean })[];
  user: UserWithTeam | null;
  setUsers: Dispatch<SetStateAction<(UserWithTeam & { visible?: boolean })[]>>;
  team: UserTeam;
  onClose: () => void;
  isVisible: boolean;
  isAdmin: boolean;
}

const UserDetailPopup = memo(
  ({
    users,
    user,
    setUsers,
    team,
    onClose,
    isVisible,
    isAdmin,
  }: UserDetailPopupProps) => {
    console.log({
      user,
      team,
    });

    const [updatingTeamIds, setUpdatingTeamIds] = useState<
      Record<string, boolean>
    >({});

    const [selectedStatus, setSelectedStatus] = useState<TeamSelectionStatus>(
      team?.selectedForRound2 ?? "NOT_DECIDED"
    );

    const [isRefreshingHistory, setIsRefreshingHistory] = useState(false);
    const [historyData, setHistoryData] = useState<StatusChangeLog[]>([]);

    const isUpdating = team?.id ? updatingTeamIds[team.id] : false;

    useEffect(() => {
      if (team && isVisible) {
        setSelectedStatus(team.selectedForRound2 ?? "NOT_DECIDED");
        if (team.id) {
          setUpdatingTeamIds((prev) => ({
            ...prev,
            [team.id]: false,
          }));

          if (
            team.selectionStatusLogs &&
            Array.isArray(team.selectionStatusLogs)
          ) {
            setHistoryData(team.selectionStatusLogs as StatusChangeLog[]);
          }
        }
      }
    }, [team, isVisible]);

    const refreshTeamHistory = async () => {
      if (!team?.id) return;

      try {
        setIsRefreshingHistory(true);
        const response = await getTeamHistory(team.id);

        if (response.error) {
          console.error("Error refreshing history:", response.error);
          return;
        }

        if (response.data?.selectionStatusLogs) {
          setHistoryData(
            response.data.selectionStatusLogs as unknown as StatusChangeLog[]
          );

          setUsers((prevUsers) => {
            return prevUsers.map((user) => {
              if (user.team?.id === team.id) {
                return {
                  ...user,
                  team: {
                    ...user.team,
                    selectionStatusLogs: response.data.selectionStatusLogs,
                    selectedForRound2: response.data
                      .selectedForRound2 as TeamSelectionStatus,
                  },
                };
              }
              return user;
            });
          });
        }
      } catch (error) {
        console.error("Failed to refresh team history:", error);
      } finally {
        setIsRefreshingHistory(false);
      }
    };

    if (!isVisible || !user) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const teamMembers = team?.members || [];

    const consentStatus = teamMembers.map((a) => ({
      uploaded: false,
      email: a.email,
    }));

    for (const member of consentStatus) {
      const user = users.find((u) => u.email === member.email);
      console.log({
        user,
        member,
      });

      if (user?.consentLetter?.fileUrl) {
        member.uploaded = true;
      }
    }

    const teamLead = teamMembers.find((member) => member.isLead);

    const currentMember = teamMembers.find(
      (member) => member.email === user.email
    );

    const userIsMember = !!currentMember;

    const userIsLead = userIsMember && currentMember?.isLead === true;

    return (
      <div
        className="fixed inset-0 backdrop-blur-xl bg-opacity-60 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gray-900 p-3 sm:p-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 bg-gray-700 rounded-full overflow-hidden ring-2 ring-gray-600">
                {user.image ? (
                  <img
                    src={user.image.replace("=s96-c", "")}
                    alt={user.name || "User"}
                    className="h-[200px] w-[200px] object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <UserCircle className="w-10 h-10" />
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left mt-2 sm:mt-0">
                <h3 className="text-lg sm:text-xl font-bold text-white flex gap-2 items-center">
                  {user.name || "Unnamed User"}{" "}
                  {teamLead && (
                    <Link
                      target="_blank"
                      href={"/register?e=" + teamLead.email}
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </Link>
                  )}
                </h3>
                <div className="text-sm text-gray-400 mt-1 break-all">
                  {user.email}
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
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

          <div className="p-3 sm:p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <DetailItem
                icon={<Info className="w-4 h-4" />}
                label="User ID"
                value={<span className="break-all">{`#${user.id}`}</span>}
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
                  <>
                    {new Date(user.lastLogin).toLocaleDateString()}{" "}
                    <span className="text-gray-400">
                      {new Date(user.lastLogin).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </>
                }
              />
              <DetailItem
                icon={<FileText className="w-4 h-4" />}
                label="Consent Letter"
                extLink={"/round-2-payment?e=" + user.email}
                value={
                  user.consentLetter?.id ? (
                    <Link
                      href={`/api/round-2-consent-letter/${user.consentLetter.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Link>
                  ) : (
                    <span className="text-yellow-300">Not Uploaded</span>
                  )
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
                <div className="bg-gray-700 bg-opacity-30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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

                    <div className="space-y-2 mt-3 sm:mt-0">
                      {team.theme && (
                        <div className="flex items-center text-sm">
                          <Palette className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-300">Theme: </span>
                          <span className="ml-1 text-teal-300">
                            {team.theme}
                          </span>
                        </div>
                      )}

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
                                  setUpdatingTeamIds((prev) => ({
                                    ...prev,
                                    [team.id]: true,
                                  }));
                                }

                                try {
                                  const res = await updateTeamRound2Status(
                                    team.id,
                                    status
                                  );

                                  if (res.error) {
                                    alert(res.error);
                                    if (isVisible && team.id) {
                                      setUpdatingTeamIds((prev) => ({
                                        ...prev,
                                        [team.id]: false,
                                      }));
                                    }
                                  } else {
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
                                      setUpdatingTeamIds((prev) => ({
                                        ...prev,
                                        [team.id]: false,
                                      }));
                                    }
                                  }
                                } catch (error) {
                                  console.error(
                                    "Error updating status:",
                                    error
                                  );

                                  if (isVisible && team.id) {
                                    setUpdatingTeamIds((prev) => ({
                                      ...prev,
                                      [team.id]: false,
                                    }));
                                  }

                                  alert(
                                    "Failed to update Round 2 selection status"
                                  );
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
                        <div className="flex items-start text-sm">
                          <LinkIcon className="w-4 h-4 mr-2 text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-gray-300">
                              Presentation:{" "}
                            </span>
                            <a
                              href={team.presentationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-1 text-blue-400 hover:underline break-all inline-block"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {team.presentationUrl}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">
                    Team Members
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {teamMembers.map((member) => (
                      <TeamMemberCard
                        key={member.id}
                        member={member}
                        isLead={member.isLead}
                        isCurrentUser={member.email === user.email}
                        consentUploaded={
                          consentStatus.find((s) => s.email === member.email)
                            ?.uploaded
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-sm font-medium text-gray-300 flex items-center gap-2">
                      <History className="w-4 h-4 text-gray-400" />
                      Round 2 Selection Status Change History
                    </h5>
                    <div className="w-24 h-5 flex justify-end">
                      {isRefreshingHistory ? (
                        <div className="flex items-center gap-1 text-xs text-blue-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Refreshing...</span>
                        </div>
                      ) : (
                        <button
                          onClick={refreshTeamHistory}
                          className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-gray-700 transition-colors"
                          title="Refresh history"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                    <div className="max-h-48 overflow-x-auto overflow-y-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-700 text-gray-300 sticky top-0">
                          <tr>
                            <th className="p-1.5 sm:p-2.5 text-left font-medium whitespace-nowrap">
                              Date & Time
                            </th>
                            <th className="p-1.5 sm:p-2.5 text-left font-medium whitespace-nowrap">
                              Changed By
                            </th>
                            <th className="p-1.5 sm:p-2.5 text-left font-medium whitespace-nowrap">
                              From Status
                            </th>
                            <th className="p-1.5 sm:p-2.5 text-left font-medium whitespace-nowrap">
                              To Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          {historyData.length === 0 &&
                            (!team.selectionStatusLogs ||
                              !Array.isArray(team.selectionStatusLogs) ||
                              team.selectionStatusLogs.length === 0) && (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="p-4 text-center text-gray-400"
                                >
                                  <div className="flex flex-col items-center justify-center py-4">
                                    <History className="w-5 h-5 mb-2 text-gray-500" />
                                    <p>No status change history available</p>
                                    <p className="text-xs mt-1">
                                      Click the refresh button to check for
                                      updates
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            )}

                          {(historyData.length > 0 ||
                            (team.selectionStatusLogs &&
                              Array.isArray(team.selectionStatusLogs) &&
                              team.selectionStatusLogs.length > 0)) &&
                            (historyData.length > 0
                              ? historyData
                              : (team.selectionStatusLogs as StatusChangeLog[])
                            )
                              .sort(
                                (a, b) =>
                                  new Date(b.timestamp).getTime() -
                                  new Date(a.timestamp).getTime()
                              )
                              .map((log, index) => (
                                <tr
                                  key={index}
                                  className="hover:bg-gray-750 transition-colors"
                                >
                                  <td className="p-1.5 sm:p-2.5 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5 text-gray-400">
                                      <Clock className="w-3 h-3 flex-shrink-0" />
                                      <span>
                                        {new Date(log.timestamp).toLocaleString(
                                          undefined,
                                          {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                          }
                                        )}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-2.5 text-gray-300">
                                    <div className="flex items-center gap-1.5">
                                      <User className="w-3 h-3 flex-shrink-0 text-gray-400" />
                                      <span className="font-medium">
                                        {log.adminName || log.adminEmail}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-2.5">
                                    <span
                                      className={`px-2 py-0.5 rounded-full inline-block ${log.previousStatus === "SELECTED" ? "bg-green-900 bg-opacity-30 text-green-300" : log.previousStatus === "REJECTED" ? "bg-red-900 bg-opacity-30 text-red-300" : "bg-yellow-900 bg-opacity-30 text-yellow-300"}`}
                                    >
                                      {log.previousStatus || "NOT_DECIDED"}
                                    </span>
                                  </td>
                                  <td className="p-2.5">
                                    <span
                                      className={`px-2 py-0.5 rounded-full inline-block ${log.newStatus === "SELECTED" ? "bg-green-900 bg-opacity-30 text-green-300" : log.newStatus === "REJECTED" ? "bg-red-900 bg-opacity-30 text-red-300" : "bg-yellow-900 bg-opacity-30 text-yellow-300"}`}
                                    >
                                      {log.newStatus}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {historyData.length > 0 ||
                    (team.selectionStatusLogs &&
                      Array.isArray(team.selectionStatusLogs) &&
                      team.selectionStatusLogs.length > 0) ? (
                      <>
                        Showing{" "}
                        {historyData.length > 0
                          ? historyData.length
                          : team.selectionStatusLogs &&
                              Array.isArray(team.selectionStatusLogs)
                            ? (team.selectionStatusLogs as StatusChangeLog[])
                                .length
                            : 0}{" "}
                        status change
                        {(historyData.length > 0
                          ? historyData.length
                          : team.selectionStatusLogs &&
                              Array.isArray(team.selectionStatusLogs)
                            ? (team.selectionStatusLogs as StatusChangeLog[])
                                .length
                            : 0) !== 1
                          ? "s"
                          : ""}
                        , sorted by most recent first
                      </>
                    ) : (
                      <>
                        No status changes yet. Use the refresh button to check
                        for updates.
                      </>
                    )}
                  </p>
                </div>
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

            {team && (
              <PaymentDetails team={team} user={user} isAdmin={isAdmin} />
            )}
          </div>

          <div className="border-t border-gray-700 p-3 sm:p-4 flex justify-end">
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
                    Consent Letter
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
                              <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="h-[36px] w-[36px] object-cover"
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
                      <td className="p-3 whitespace-nowrap">
                        {user.consentLetter?.fileUrl ? (
                          <span className="inline-flex items-center gap-1 text-green-300 bg-green-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                            <FileText className="w-3 h-3" /> Uploaded
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-yellow-300 bg-yellow-900 bg-opacity-40 px-2 py-0.5 rounded-full text-sm">
                            <FileText className="w-3 h-3" /> Not Uploaded
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
        users={users}
        user={selectedUser}
        team={selectedTeam!}
        onClose={closeUserDetail}
        isVisible={!!selectedUser}
        isAdmin={true}
        setUsers={setUsers}
      />
    </>
  );
}

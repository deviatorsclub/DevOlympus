import { memo, useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Loader2,
  AlertCircle,
  Trash2,
  User,
} from "lucide-react";
import {
  AlertProps,
  ConfirmDialogProps,
  DeadlineBannerProps,
  SubmitDialogProps,
  TeamMemberCardProps,
} from "@/types/registration";

export const ConfirmDialog = memo(
  ({ isOpen, title, message, onConfirm, onCancel }: ConfirmDialogProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#13112a] rounded-lg border border-indigo-600 p-6 max-w-md w-full">
          <h3 className="text-lg font-medium text-violet-400 mb-2">{title}</h3>
          <p className="text-gray-300 mb-6">{message}</p>
          <div className="flex space-x-4 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
);
ConfirmDialog.displayName = "ConfirmDialog";

export const SubmitDialog = memo(
  ({ isOpen, onConfirm, onCancel, isPending = false }: SubmitDialogProps) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#13112a] rounded-lg border border-indigo-600 p-6 max-w-2xl w-full">
          <h3 className="text-xl font-bold text-violet-400 mb-4">
            Confirm Registration
          </h3>

          <div className="bg-[#0a0918] p-4 rounded-lg border border-indigo-800 mb-6">
            <h4 className="text-lg font-medium text-violet-300 mb-2">
              Welcome to DevOlympus!
            </h4>
            <p className="text-gray-300 mb-4">
              Where innovation meets limitless possibilities! ⚡
            </p>

            <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
              <li>
                An intense 30-hour innovation sprint where the sharpest minds
                ascend to new heights.
              </li>
              <li>
                A platform for building real-world solutions that make a genuine
                impact.
              </li>
              <li>
                A competitive environment fostering innovation, problem-solving,
                and teamwork.
              </li>
            </ul>

            <p className="text-gray-300">
              Visit our website for further Information.
            </p>
            <p className="text-yellow-400 font-medium mt-2">
              Teams moving on to the next round will have to pay a registration
              fee of Rs.500.
            </p>
          </div>

          <div className="bg-[#0a0918] p-4 rounded-lg border border-indigo-800 mb-6">
            <h4 className="text-lg font-medium text-violet-300 mb-2">
              Agreement & Commitment
            </h4>
            <p className="text-gray-300 italic">
              &quot;I understand that DevOlympus is a 30-hour hackathon, I am
              expected to be present on campus for the entire duration of the
              event. I agree to dedicate my time and efforts.&quot;
            </p>
          </div>

          <div className="flex space-x-4 justify-end">
            <button
              onClick={onCancel}
              disabled={isPending}
              className={`px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className={`px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isPending ? (
                <span className="flex items-center">
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                "I Agree & Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
);
SubmitDialog.displayName = "SubmitDialog";

export const Alert = memo(({ type, message, onDismiss }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center ${
        type === "success"
          ? "bg-green-900 text-green-100"
          : "bg-red-900 text-red-100"
      }`}
    >
      {type === "success" ? (
        <CheckCircle className="mr-2 h-5 w-5 text-green-300" />
      ) : (
        <AlertCircle className="mr-2 h-5 w-5 text-red-300" />
      )}
      <p>{message}</p>
      <button
        onClick={onDismiss}
        className="ml-4 text-gray-300 hover:text-white"
      >
        ×
      </button>
    </div>
  );
});
Alert.displayName = "Alert";

export const DeadlineBanner = memo(({ deadline }: DeadlineBannerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Registration closed");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="bg-indigo-900/60 border border-indigo-500 rounded-lg p-3 mb-6 flex items-center text-sm">
      <Calendar className="text-violet-300 mr-2" size={18} />
      <div className="flex-1">
        <p className="text-violet-200">
          Registration deadline: {deadline.toLocaleDateString()} at{" "}
          {deadline.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="flex items-center bg-indigo-800 px-3 py-1 rounded-full">
        <Clock className="text-violet-300 mr-1" size={14} />
        <span className="text-violet-200 font-medium">{timeLeft}</span>
      </div>
    </div>
  );
});
DeadlineBanner.displayName = "DeadlineBanner";

export const TeamMemberCard = memo(
  ({
    member,
    index,
    canRemove,
    onRemove,
    updateMember,
    errors,
    disabled,
  }: TeamMemberCardProps) => {
    return (
      <div
        className={`p-4 border rounded-lg ${
          member.isLead
            ? "border-violet-700 bg-[#1a1838]"
            : "border-indigo-800 bg-[#0e0c20]"
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          {member.isLead ? (
            <div className="flex items-center text-violet-400 text-sm font-medium">
              <Crown size={14} className="mr-1" />
              Team Lead
            </div>
          ) : (
            <div className="flex items-center text-indigo-400 text-sm font-medium">
              <User size={14} className="mr-1" />
              Team Member {index}
            </div>
          )}

          {!member.isLead && canRemove && (
            <button
              type="button"
              onClick={() => onRemove(member.id)}
              disabled={disabled}
              className={`text-red-400 hover:text-red-300 text-sm flex items-center ${
                disabled ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm mb-2 block text-violet-300">Name</label>
            <input
              type="text"
              value={member.name}
              onChange={(e) => updateMember(member.id, "name", e.target.value)}
              disabled={disabled}
              className={`w-full px-3 py-2 rounded-md bg-[#0a0918] text-white border ${
                errors[`member-${member.id}-name`]
                  ? "border-red-500"
                  : "border-indigo-800"
              } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                disabled ? "opacity-70 cursor-not-allowed" : ""
              }`}
            />
            {errors[`member-${member.id}-name`] && (
              <p className="mt-1 text-sm text-red-400">
                {errors[`member-${member.id}-name`]}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm mb-2 block text-violet-300">Email</label>
            {member.isLead ? (
              <div className="w-full px-3 py-2 rounded-md bg-indigo-900/30 text-gray-400 border border-indigo-800 filter cursor-not-allowed">
                {member.email}
              </div>
            ) : (
              <input
                type="email"
                value={member.email}
                onChange={(e) =>
                  updateMember(member.id, "email", e.target.value)
                }
                placeholder="example@email.com"
                disabled={disabled}
                className={`w-full px-3 py-2 rounded-md bg-[#0a0918] text-white border ${
                  errors[`member-${member.id}-email`]
                    ? "border-red-500"
                    : "border-indigo-800"
                } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                  disabled ? "opacity-70 cursor-not-allowed" : ""
                }`}
              />
            )}
            {errors[`member-${member.id}-email`] && (
              <p className="mt-1 text-sm text-red-400">
                {errors[`member-${member.id}-email`]}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm mb-2 block text-violet-300">
              Roll Number
            </label>
            <input
              type="text"
              value={member.rollNo}
              onChange={(e) =>
                updateMember(member.id, "rollNo", e.target.value)
              }
              placeholder="e.g., 25127"
              disabled={disabled}
              className={`w-full px-3 py-2 rounded-md bg-[#0a0918] text-white border ${
                errors[`member-${member.id}-rollNo`]
                  ? "border-red-500"
                  : "border-indigo-800"
              } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                disabled ? "opacity-70 cursor-not-allowed" : ""
              }`}
            />
            {errors[`member-${member.id}-rollNo`] && (
              <p className="mt-1 text-sm text-red-400">
                {errors[`member-${member.id}-rollNo`]}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
TeamMemberCard.displayName = "TeamMemberCard";

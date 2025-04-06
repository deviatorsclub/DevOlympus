"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import {
  CheckCircle,
  Plus,
  Link as LinkIcon,
  RefreshCw,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Session } from "next-auth";
import {
  ConfirmDialog,
  SubmitDialog,
  Alert,
  DeadlineBanner,
  TeamMemberCard,
} from "@/components/ui/registration";
import { TeamMember, ExtendedFormState } from "@/types/registration";
import { FLAGS, THEMES, DEFAULT_VALUES } from "@/lib/flags";
import LoginFallback from "./LoginFallback";
import { registerTeam, RegistrationFormData } from "@/actions/regsiter";
import Link from "next/link";
import VideoGuide from "./VideoGuide";
import { FaFileDownload } from "react-icons/fa";

interface RegistrationFormProps {
  initialSession: Session | null;
}

export default function RegistrationForm({
  initialSession,
}: RegistrationFormProps) {
  const [isPending, startTransition] = useTransition();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [formState, setFormState] = useState<ExtendedFormState>({
    teamName: DEFAULT_VALUES.teamNameSuggestion,
    members: Array(FLAGS.minTeamSize)
      .fill(0)
      .map(() => ({
        id: Math.random() * 1000000 + "",
        name: "",
        email: "",
        rollNo: "",
        number: "",
        isLead: false,
      })),
    presentationUrl: DEFAULT_VALUES.presentationUrl,
    theme: FLAGS.defaultTheme,
    presentationPublic: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState<boolean>(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isDeadlinePassed = useCallback((): boolean => {
    return new Date() > FLAGS.submissionDeadline;
  }, []);

  const initializeForm = useCallback(() => {
    if (!initialSession?.user || initialized) return;

    const userMember: TeamMember = {
      id: Math.random() * 1000000 + "",
      name: initialSession.user.name || "",
      email: initialSession.user.email || "",
      rollNo: "",
      number: "",
      isLead: true,
    };

    setFormState((prev) => {
      const savedData = localStorage.getItem("hackathon-registration");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData) as ExtendedFormState;
          const existingLeadIndex = parsedData.members.findIndex(
            (m) => m.isLead,
          );

          if (existingLeadIndex >= 0) {
            parsedData.members[existingLeadIndex] = {
              ...parsedData.members[existingLeadIndex],
              email:
                initialSession.user.email ||
                parsedData.members[existingLeadIndex].email,
            };

            parsedData.members = parsedData.members.map((member) => ({
              ...member,
              number: member.number || "",
            }));

            parsedData.presentationPublic =
              parsedData.presentationPublic || false;

            setLastSaved(localStorage.getItem("hackathon-last-saved") || null);
            return parsedData;
          } else {
            const defaultMembers = Array(FLAGS.minTeamSize - 1)
              .fill(0)
              .map(() => ({
                id: Math.random() * 1000000 + "",
                name: "",
                email: "",
                rollNo: "",
                number: "",
                isLead: false,
              }));

            return {
              ...parsedData,
              members: [userMember, ...defaultMembers],
              presentationPublic: parsedData.presentationPublic || false,
            };
          }
        } catch (e) {
          console.error("Failed to parse saved data", e);
        }
      }

      const defaultMembers = Array(FLAGS.minTeamSize - 1)
        .fill(0)
        .map(() => ({
          id: Math.random() * 1000000 + "",
          name: "",
          email: "",
          rollNo: "",
          number: "",
          isLead: false,
        }));

      return {
        ...prev,
        members: [userMember, ...defaultMembers],
      };
    });

    setInitialized(true);
  }, [initialSession, initialized]);

  useEffect(() => {
    initializeForm();
  }, [initializeForm]);

  const saveToLocalStorage = useCallback(() => {
    if (!initialized) return;

    setSaveStatus("saving");

    const saveTimer = setTimeout(() => {
      localStorage.setItem("hackathon-registration", JSON.stringify(formState));
      const now = new Date().toLocaleString();
      localStorage.setItem("hackathon-last-saved", now);
      setLastSaved(now);
      setSaveStatus("saved");

      const resetTimer = setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);

      return () => clearTimeout(resetTimer);
    }, 600);

    return () => clearTimeout(saveTimer);
  }, [formState, initialized]);

  useEffect(() => {
    if (!initialized) return;

    const debounceTimer = setTimeout(() => {
      if (
        formState.teamName ||
        formState.presentationUrl ||
        formState.theme ||
        formState.members.some((m) => m.name || m.email || m.rollNo || m.number)
      ) {
        saveToLocalStorage();
      }
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [formState, saveToLocalStorage, initialized]);

  const addTeamMember = useCallback(() => {
    if (formState.members.length >= FLAGS.maxTeamSize) return;

    setFormState((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        {
          id: Math.random() * 1000000 + "",
          name: "",
          email: "",
          rollNo: "",
          number: "",
          isLead: false,
        },
      ],
    }));
  }, [formState.members.length]);

  const removeTeamMember = useCallback(
    (id: string) => {
      if (formState.members.length <= FLAGS.minTeamSize) {
        setErrors((prev) => ({
          ...prev,
          members: `Minimum ${FLAGS.minTeamSize} team members required`,
        }));
        return;
      }

      if (formState.members.find((m) => m.id === id)?.isLead) return;

      setFormState((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member.id !== id),
      }));
    },
    [formState.members],
  );

  const updateMember = useCallback(
    (
      id: string,
      field: keyof Omit<TeamMember, "id" | "isLead">,
      value: string,
    ) => {
      if (
        field === "email" &&
        formState.members.find((m) => m.id === id)?.isLead
      )
        return;

      let formattedValue = value;

      if (field === "number") {
        formattedValue = value.replace(/\D/g, "").substring(0, 10);
      } else if (field === "rollNo") {
        formattedValue = value.trim();
      } else if (field === "email") {
        formattedValue = value.trim();
      }

      setFormState((prev) => ({
        ...prev,
        members: prev.members.map((member) =>
          member.id === id ? { ...member, [field]: formattedValue } : member,
        ),
      }));

      if (errors[`member-${id}-${field}`]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`member-${id}-${field}`];
          return newErrors;
        });
      }
    },
    [errors, formState.members],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    const incompleteMembers: string[] = [];

    if (isDeadlinePassed()) {
      newErrors.deadline =
        "Registration deadline has passed - The submission window is now closed";
      setErrors(newErrors);
      return false;
    }

    if (!FLAGS.isRegistrationOpen) {
      newErrors.registration =
        "Registration is currently closed - Please check back later when registration opens";
      setErrors(newErrors);
      return false;
    }

    if (!formState.teamName.trim()) {
      newErrors.teamName =
        "Team name is required - Please choose a name that represents your project";
    }

    if (!formState.theme) {
      newErrors.theme =
        "Project theme selection is required - Please choose from the available options";
    }

    let validMembers = 0;
    const incompleteFields: Record<string, string[]> = {};

    formState.members.forEach((member, index) => {
      const { id, name, email, rollNo, number } = member;
      const memberTitle = member.isLead ? "Team Lead" : `Member ${index + 1}`;
      const missingFields: string[] = [];

      if (!name.trim()) {
        newErrors[`member-${id}-name`] =
          "Full name is required - Enter your complete name as registered with the university";
        missingFields.push("name");
      }

      if (!email.trim()) {
        newErrors[`member-${id}-email`] =
          "Email address is required - We'll send important updates to this address";
        missingFields.push("email");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors[`member-${id}-email`] =
          "Invalid email format - Please enter a valid email address (example: name@domain.com)";
        missingFields.push("email format");
      }

      if (!rollNo.trim()) {
        newErrors[`member-${id}-rollNo`] =
          "Roll number is required - Enter your university roll number for verification";
        missingFields.push("roll number");
      }

      if (!number.trim()) {
        newErrors[`member-${id}-number`] =
          "Phone number is required - Enter a number where we can reach you";
        missingFields.push("phone number");
      } else if (number.length !== 10 || !/^\d+$/.test(number)) {
        newErrors[`member-${id}-number`] =
          "Invalid phone number - Please enter exactly 10 digits without spaces or special characters";
        missingFields.push("valid phone number");
      }

      const isComplete = missingFields.length === 0;

      if (isComplete) {
        validMembers++;
      } else {
        incompleteMembers.push(memberTitle);
        incompleteFields[memberTitle] = missingFields;
      }
    });

    if (validMembers < FLAGS.minTeamSize) {
      if (incompleteMembers.length > 0) {
        let errorMsg = `⚠️ Incomplete team information ⚠️\n\nPlease complete all required fields for: `;

        incompleteMembers.forEach((member, idx) => {
          const fields = incompleteFields[member].join(", ");
          errorMsg += `${member} (missing: ${fields})`;

          if (idx < incompleteMembers.length - 1) {
            errorMsg += "; ";
          }
        });

        newErrors.members = errorMsg;
      } else {
        newErrors.members = `Team size requirement not met - You need at least ${FLAGS.minTeamSize} complete member profiles to register`;
      }
    }

    if (!formState.presentationUrl.trim()) {
      newErrors.presentationUrl =
        "Presentation URL is required - Share a link to your project slides (Google Drive/Dropbox)";
    } else if (!/^https?:\/\/.+/.test(formState.presentationUrl)) {
      newErrors.presentationUrl =
        "Invalid URL format - Your link must start with http:// or https://";
    }

    if (!formState.presentationPublic) {
      newErrors.presentationPublic =
        "Public access confirmation required - Check this box to confirm your presentation is accessible to evaluators";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, isDeadlinePassed]);

  const handlePreSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        setSubmitDialogOpen(true);
      }
    },
    [validateForm],
  );

  const handleSubmit = useCallback(() => {
    if (isDeadlinePassed()) {
      setAlert({ type: "error", message: "Registration deadline has passed" });
      setSubmitDialogOpen(false);
      return;
    }

    const formData: RegistrationFormData = {
      teamName: formState.teamName,
      members: formState.members.map((member) => ({
        id: member.id,
        name: member.name,
        email: member.email,
        rollNo: member.rollNo,
        number: parseInt(member.number, 10),
        isLead: member.isLead || false,
      })),
      presentationUrl: formState.presentationUrl,
      theme: formState.theme || THEMES[0],
    };

    startTransition(async () => {
      try {
        const result = await registerTeam(formData);

        if (result.success) {
          localStorage.removeItem("hackathon-registration");
          localStorage.removeItem("hackathon-last-saved");
          setAlert({ type: "success", message: result.message });

          if (initialSession?.user) {
            const defaultMembers: TeamMember[] = Array(FLAGS.minTeamSize - 1)
              .fill(0)
              .map(() => ({
                id: Math.random() * 1000000 + "",
                name: "",
                email: "",
                rollNo: "",
                number: "",
                isLead: false,
              }));

            setFormState({
              teamName: DEFAULT_VALUES.teamNameSuggestion,
              members: [
                {
                  id: Math.random() * 1000000 + "",
                  name: initialSession.user.name || "",
                  email: initialSession.user.email || "",
                  rollNo: "",
                  number: "",
                  isLead: true,
                },
                ...defaultMembers,
              ],
              presentationUrl: DEFAULT_VALUES.presentationUrl,
              theme: FLAGS.defaultTheme,
              presentationPublic: false,
            });
          }
        } else {
          setAlert({ type: "error", message: result.message });
        }

        setSubmitDialogOpen(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        setAlert({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
        setSubmitDialogOpen(false);
      }
    });
  }, [formState, initialSession, isDeadlinePassed]);

  const handleResetForm = useCallback(() => {
    setResetDialogOpen(true);
  }, []);

  const confirmReset = useCallback(() => {
    localStorage.removeItem("hackathon-registration");
    localStorage.removeItem("hackathon-last-saved");
    setLastSaved(null);

    const defaultMembers: TeamMember[] = Array(FLAGS.minTeamSize - 1)
      .fill(0)
      .map(() => ({
        id: Math.random() * 1000000 + "",
        name: "",
        email: "",
        rollNo: "",
        number: "",
        isLead: false,
      }));

    if (initialSession?.user) {
      setFormState({
        teamName: DEFAULT_VALUES.teamNameSuggestion,
        members: [
          {
            id: Math.random() * 1000000 + "",
            name: initialSession.user.name || "",
            email: initialSession.user.email || "",
            rollNo: "",
            number: "",
            isLead: true,
          },
          ...defaultMembers,
        ],
        presentationUrl: DEFAULT_VALUES.presentationUrl,
        theme: FLAGS.defaultTheme,
        presentationPublic: false,
      });
    } else {
      setFormState({
        teamName: DEFAULT_VALUES.teamNameSuggestion,
        members: [
          ...defaultMembers,
          {
            id: Math.random() * 1000000 + "",
            name: "",
            email: "",
            rollNo: "",
            number: "",
            isLead: false,
          },
        ],
        presentationUrl: DEFAULT_VALUES.presentationUrl,
        theme: FLAGS.defaultTheme,
        presentationPublic: false,
      });
    }

    setErrors({});
    setResetDialogOpen(false);
    setAlert({ type: "success", message: "Form has been reset successfully" });
  }, [initialSession]);

  const updateFormField = useCallback(
    (
      field: keyof Omit<ExtendedFormState, "members">,
      value: string | boolean,
    ) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const dismissAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const isFormDisabled = useCallback((): boolean => {
    return !FLAGS.isRegistrationOpen || isDeadlinePassed() || isPending;
  }, [isPending, isDeadlinePassed]);

  if (!initialSession) {
    return <LoginFallback />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-4 py-4 sm:py-8 md:py-16 pt-12 sm:pt-16 md:pt-24 lg:pt-32 px-3 sm:px-4 md:px-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onDismiss={dismissAlert}
        />
      )}

      <div className="bg-[#0a0918] border border-indigo-600 rounded-xl shadow-xl p-3 sm:p-4 md:p-8 text-gray-100 relative">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-violet-400">
          REGISTER YOUR TEAM
        </h1>

        <DeadlineBanner deadline={FLAGS.submissionDeadline} />

        {!FLAGS.isRegistrationOpen && (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-red-200 font-medium text-sm sm:text-base">
              Registration is currently closed.
            </p>
          </div>
        )}

        {isDeadlinePassed() && (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-red-200 font-medium text-sm sm:text-base">
              Registration deadline has passed.
            </p>
          </div>
        )}

        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col sm:flex-row items-end sm:items-center sm:space-x-3 md:space-x-4">
          {saveStatus === "saving" && (
            <div className="text-xs text-gray-400 flex items-center mb-2 sm:mb-0">
              <div className="animate-spin h-3 w-3 mr-1 sm:mr-2 border-t-2 border-violet-400 rounded-full"></div>
              Saving...
            </div>
          )}

          {saveStatus === "saved" && (
            <div className="text-xs text-green-400 flex items-center mb-2 sm:mb-0">
              <CheckCircle size={12} className="mr-1" />
              Saved
            </div>
          )}

          {lastSaved && saveStatus === "idle" && (
            <div className="text-xs text-gray-400 mb-2 sm:mb-0 hidden sm:block">
              Last saved: {lastSaved}
            </div>
          )}

          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs flex items-center text-red-400 hover:text-red-300"
          >
            <RefreshCw size={12} className="mr-1" />
            Reset
          </button>
        </div>

        <form
          onSubmit={handlePreSubmit}
          className="space-y-4 sm:space-y-6 md:space-y-8"
        >
          <div>
            <label
              htmlFor="teamName"
              className="text-sm mb-1 sm:mb-2 block text-violet-300"
            >
              Team Name
            </label>
            <input
              id="teamName"
              type="text"
              value={formState.teamName}
              onChange={(e) => updateFormField("teamName", e.target.value)}
              placeholder="Enter your team name"
              disabled={isFormDisabled()}
              className={`w-full px-3 py-2 rounded-md bg-[#13112a] text-white border ${
                errors.teamName ? "border-red-500" : "border-indigo-600"
              } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
              }`}
            />
            {errors.teamName && (
              <div className="flex items-start mt-1 text-xs sm:text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-2">
                <AlertTriangle
                  size={14}
                  className="mr-1.5 flex-shrink-0 mt-0.5"
                />
                <span>{errors.teamName}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm mb-1 sm:mb-2 block text-violet-300">
              Project Theme
            </label>
            <select
              value={formState.theme || ""}
              onChange={(e) => updateFormField("theme", e.target.value)}
              disabled={isFormDisabled()}
              className={`w-full px-3 py-2 rounded-md bg-[#13112a] text-white border ${
                errors.theme ? "border-red-500" : "border-indigo-600"
              } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <option value="" disabled>
                Select a theme for your project
              </option>
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
            {errors.theme && (
              <div className="flex items-start mt-1 text-xs sm:text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-2">
                <AlertTriangle
                  size={14}
                  className="mr-1.5 flex-shrink-0 mt-0.5"
                />
                <span>{errors.theme}</span>
              </div>
            )}
          </div>

          <div className="bg-[#13112a] p-3 sm:p-4 rounded-lg border border-indigo-800">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-medium text-violet-400 flex flex-wrap items-center mb-2 xs:mb-0">
                Team Members
                <span className="ml-2 text-xs bg-indigo-900 text-violet-300 px-2 py-0.5 rounded-full">
                  Min {FLAGS.minTeamSize} required
                </span>
              </h2>
              {formState.members.length < FLAGS.maxTeamSize && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  disabled={isFormDisabled()}
                  className={`flex items-center px-3 sm:px-4 py-1 rounded bg-indigo-800 hover:bg-indigo-700 text-white text-xs sm:text-sm transition-colors ${
                    isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Plus size={16} className="mr-1" />
                  Add Member
                </button>
              )}
            </div>

            {errors.members && (
              <div className="mb-4 flex items-start text-xs sm:text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-2">
                <AlertTriangle
                  size={14}
                  className="mr-1.5 flex-shrink-0 mt-0.5"
                />
                <span>{errors.members}</span>
              </div>
            )}

            <div className="space-y-3 sm:space-y-4">
              {formState.members.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  canRemove={formState.members.length > FLAGS.minTeamSize}
                  onRemove={removeTeamMember}
                  updateMember={updateMember}
                  errors={errors}
                  disabled={isFormDisabled()}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm mb-1 sm:mb-2 block text-violet-300">
              Presentation URL (Max 5MB)
            </label>
            <div className="mb-2 flex items-center gap-2">
              <Link
                href="https://docs.google.com/presentation/d/1qRArIWIZzc2lpEmC1fS_7lydpXkvPcVL/edit?usp=sharing&ouid=100076728637005351213&rtpof=true&sd=true"
                target="_blank"
                className="flex items-center px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-md hover:from-violet-500 hover:to-indigo-500 transition-all shadow-md hover:shadow-lg text-sm font-medium"
              >
                <FaFileDownload size={16} className="mr-1" />
                Download Presentation Template
              </Link>
            </div>

            <VideoGuide />

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon size={16} className="text-indigo-400" />
              </div>
              <input
                type="url"
                value={formState.presentationUrl}
                onChange={(e) =>
                  updateFormField("presentationUrl", e.target.value)
                }
                placeholder="https://drive.google.com/your-presentation"
                disabled={isFormDisabled()}
                className={`w-full pl-10 pr-3 py-2 rounded-md bg-[#13112a] text-white border ${
                  errors.presentationUrl
                    ? "border-red-500"
                    : "border-indigo-600"
                } focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 ${
                  isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
                }`}
              />
            </div>
            {errors.presentationUrl && (
              <div className="flex items-start mt-1 text-xs sm:text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-2">
                <AlertTriangle
                  size={14}
                  className="mr-1.5 flex-shrink-0 mt-0.5"
                />
                <span>{errors.presentationUrl}</span>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Share your presentation via Google Drive, Dropbox, or similar
              service
            </p>
          </div>

          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="presentationPublic"
                type="checkbox"
                checked={formState.presentationPublic}
                onChange={(e) =>
                  updateFormField("presentationPublic", e.target.checked)
                }
                disabled={isFormDisabled()}
                className={`h-4 w-4 rounded border-indigo-600 bg-[#13112a] text-violet-600 focus:ring-violet-500 ${
                  isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="presentationPublic"
                className="text-gray-200 cursor-pointer"
              >
                I confirm that I have made my presentation publicly accessible
                with view permissions for anyone with the link
              </label>
            </div>
          </div>
          {errors.presentationPublic && (
            <div className="flex items-start mt-1 text-xs sm:text-sm text-red-400 bg-red-950/30 border border-red-800/50 rounded-md p-2">
              <AlertTriangle
                size={14}
                className="mr-1.5 flex-shrink-0 mt-0.5"
              />
              <span>{errors.presentationPublic}</span>
            </div>
          )}

          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={isFormDisabled()}
              className={`w-full px-4 py-2 sm:py-3 bg-violet-600 text-white font-medium rounded-md transition-colors ${
                isFormDisabled()
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-violet-700"
              }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                "Register Team"
              )}
            </button>

            {errors.submit && (
              <p className="mt-2 text-xs sm:text-sm text-red-400 text-center">
                {errors.submit}
              </p>
            )}
          </div>
        </form>
      </div>

      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Reset Form"
        message="Are you sure you want to reset the form? All entered data will be lost."
        onConfirm={confirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />

      <SubmitDialog
        isOpen={submitDialogOpen}
        onConfirm={handleSubmit}
        onCancel={() => setSubmitDialogOpen(false)}
        isPending={isPending}
      />
    </div>
  );
}

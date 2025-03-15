"use client";

import { useState, useCallback, useTransition, useEffect, memo } from "react";
import { CheckCircle, Plus, Link, RefreshCw, Loader2 } from "lucide-react";
import { Session } from "next-auth";
import {
  ConfirmDialog,
  SubmitDialog,
  Alert,
  DeadlineBanner,
  TeamMemberCard,
} from "@/components/ui/registration";
import { FormState, TeamMember } from "@/types/registration";
import { FLAGS, THEMES, DEFAULT_VALUES } from "@/lib/flags";
import LoginFallback from "./LoginFallback";
import { registerTeam, RegistrationFormData } from "@/actions/regsiter";

interface RegistrationFormProps {
  initialSession: Session | null;
}

export default function RegistrationForm({
  initialSession,
}: RegistrationFormProps) {
  const [isPending, startTransition] = useTransition();
  const [initialized, setInitialized] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    teamName: DEFAULT_VALUES.teamNameSuggestion,
    members: Array(FLAGS.maxTeamSize)
      .fill(0)
      .map(() => ({
        id: crypto.randomUUID(),
        name: "",
        email: "",
        rollNo: "",
      })),
    presentationUrl: DEFAULT_VALUES.presentationUrl,
    theme: FLAGS.defaultTheme,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isDeadlinePassed = useCallback(() => {
    return new Date() > FLAGS.submissionDeadline;
  }, []);

  const initializeForm = useCallback(() => {
    if (!initialSession?.user || initialized) return;

    const userMember: TeamMember = {
      id: crypto.randomUUID(),
      name: initialSession.user.name || "",
      email: initialSession.user.email || "",
      rollNo: "",
      isLead: true,
    };

    setFormState((prev) => {
      const savedData = localStorage.getItem("hackathon-registration");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData) as FormState;

          const existingLeadIndex = parsedData.members.findIndex(
            (m) => m.isLead
          );

          if (existingLeadIndex >= 0) {
            parsedData.members[existingLeadIndex] = {
              ...parsedData.members[existingLeadIndex],
              email:
                initialSession.user.email ||
                parsedData.members[existingLeadIndex].email,
            };

            setLastSaved(localStorage.getItem("hackathon-last-saved") || null);
            return parsedData;
          } else {
            const defaultMembers = Array(FLAGS.maxTeamSize - 1)
              .fill(0)
              .map(() => ({
                id: crypto.randomUUID(),
                name: "",
                email: "",
                rollNo: "",
              }));

            return {
              ...parsedData,
              members: [userMember, ...defaultMembers].slice(
                0,
                FLAGS.maxTeamSize
              ),
            };
          }
        } catch (e) {
          console.error("Failed to parse saved data");
        }
      }

      const defaultMembers = Array(FLAGS.maxTeamSize - 1)
        .fill(0)
        .map(() => ({
          id: crypto.randomUUID(),
          name: "",
          email: "",
          rollNo: "",
        }));

      return {
        ...prev,
        members: [userMember, ...defaultMembers].slice(0, FLAGS.maxTeamSize),
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
        formState.members.some((m) => m.name || m.email || m.rollNo)
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
        { id: crypto.randomUUID(), name: "", email: "", rollNo: "" },
      ],
    }));
  }, [formState.members.length]);

  const removeTeamMember = useCallback(
    (id: string) => {
      if (formState.members.length <= 3) {
        setErrors((prev) => ({
          ...prev,
          members: "Minimum 3 team members required",
        }));
        return;
      }

      if (formState.members.find((m) => m.id === id)?.isLead) return;

      setFormState((prev) => ({
        ...prev,
        members: prev.members.filter((member) => member.id !== id),
      }));
    },
    [formState.members]
  );

  const updateMember = useCallback(
    (
      id: string,
      field: keyof Omit<TeamMember, "id" | "isLead">,
      value: string
    ) => {
      if (
        field === "email" &&
        formState.members.find((m) => m.id === id)?.isLead
      )
        return;

      setFormState((prev) => ({
        ...prev,
        members: prev.members.map((member) =>
          member.id === id ? { ...member, [field]: value } : member
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
    [errors, formState.members]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (isDeadlinePassed()) {
      newErrors.deadline = "Registration deadline has passed";
      setErrors(newErrors);
      return false;
    }

    if (!FLAGS.isRegistrationOpen) {
      newErrors.registration = "Registration is currently closed";
      setErrors(newErrors);
      return false;
    }

    if (!formState.teamName.trim()) {
      newErrors.teamName = "Team name is required";
    }

    if (!formState.theme) {
      newErrors.theme = "Please select a project theme";
    }

    let validMembers = 0;

    formState.members.forEach((member) => {
      const { id, name, email, rollNo } = member;

      if (!name.trim()) {
        newErrors[`member-${id}-name`] = "Name is required";
      }

      if (!email.trim()) {
        newErrors[`member-${id}-email`] = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors[`member-${id}-email`] = "Invalid email format";
      }

      if (!rollNo.trim()) {
        newErrors[`member-${id}-rollNo`] = "Roll number is required";
      }

      if (name && email && rollNo && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        validMembers++;
      }
    });

    if (validMembers < 3) {
      newErrors.members = "At least 3 complete team member profiles required";
    }

    if (!formState.presentationUrl.trim()) {
      newErrors.presentationUrl = "Presentation URL is required";
    } else if (!/^https?:\/\/.+/.test(formState.presentationUrl)) {
      newErrors.presentationUrl =
        "Must be a valid URL starting with http:// or https://";
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
    [validateForm]
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
            const defaultMembers = Array(FLAGS.maxTeamSize - 1)
              .fill(0)
              .map(() => ({
                id: crypto.randomUUID(),
                name: "",
                email: "",
                rollNo: "",
              }));

            setFormState({
              teamName: DEFAULT_VALUES.teamNameSuggestion,
              members: [
                {
                  id: crypto.randomUUID(),
                  name: initialSession.user.name || "",
                  email: initialSession.user.email || "",
                  rollNo: "",
                  isLead: true,
                },
                ...defaultMembers,
              ].slice(0, FLAGS.maxTeamSize),
              presentationUrl: DEFAULT_VALUES.presentationUrl,
              theme: FLAGS.defaultTheme,
            });
          }
        } else {
          setAlert({ type: "error", message: result.message });
        }

        setSubmitDialogOpen(false);
      } catch (error) {
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

    const defaultMembers = Array(FLAGS.maxTeamSize - 1)
      .fill(0)
      .map(() => ({
        id: crypto.randomUUID(),
        name: "",
        email: "",
        rollNo: "",
      }));

    if (initialSession?.user) {
      setFormState({
        teamName: DEFAULT_VALUES.teamNameSuggestion,
        members: [
          {
            id: crypto.randomUUID(),
            name: initialSession.user.name || "",
            email: initialSession.user.email || "",
            rollNo: "",
            isLead: true,
          },
          ...defaultMembers,
        ].slice(0, FLAGS.maxTeamSize),
        presentationUrl: DEFAULT_VALUES.presentationUrl,
        theme: FLAGS.defaultTheme,
      });
    } else {
      setFormState({
        teamName: DEFAULT_VALUES.teamNameSuggestion,
        members: [
          ...defaultMembers,
          {
            id: crypto.randomUUID(),
            name: "",
            email: "",
            rollNo: "",
          },
        ].slice(0, FLAGS.maxTeamSize),
        presentationUrl: DEFAULT_VALUES.presentationUrl,
        theme: FLAGS.defaultTheme,
      });
    }

    setErrors({});
    setResetDialogOpen(false);
    setAlert({ type: "success", message: "Form has been reset successfully" });
  }, [initialSession]);

  const updateFormField = useCallback(
    (field: keyof Omit<FormState, "members">, value: string) => {
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
    [errors]
  );

  const dismissAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const isFormDisabled = useCallback(() => {
    return !FLAGS.isRegistrationOpen || isDeadlinePassed() || isPending;
  }, [isPending, isDeadlinePassed]);

  if (!initialSession) {
    return <LoginFallback />;
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-16 pt-32 px-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onDismiss={dismissAlert}
        />
      )}

      <div className="bg-[#0a0918] border border-indigo-600 rounded-xl shadow-xl p-8 text-gray-100 relative">
        <h1 className="text-3xl font-bold mb-8 text-violet-400">
          REGISTER YOUR TEAM
        </h1>

        <DeadlineBanner deadline={FLAGS.submissionDeadline} />

        {!FLAGS.isRegistrationOpen && (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200 font-medium">
              Registration is currently closed.
            </p>
          </div>
        )}

        {isDeadlinePassed() && (
          <div className="bg-red-900/60 border border-red-500 rounded-lg p-4 mb-6">
            <p className="text-red-200 font-medium">
              Registration deadline has passed.
            </p>
          </div>
        )}

        <div className="absolute top-4 right-4 flex items-center space-x-4">
          {saveStatus === "saving" && (
            <div className="text-xs text-gray-400 flex items-center">
              <div className="animate-spin h-3 w-3 mr-2 border-t-2 border-violet-400 rounded-full"></div>
              Saving...
            </div>
          )}

          {saveStatus === "saved" && (
            <div className="text-xs text-green-400 flex items-center">
              <CheckCircle size={12} className="mr-1" />
              Saved
            </div>
          )}

          {lastSaved && saveStatus === "idle" && (
            <div className="text-xs text-gray-400">Last saved: {lastSaved}</div>
          )}

          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs flex items-center text-red-400 hover:text-red-300"
          >
            <RefreshCw size={12} className="mr-1" />
            Reset Form
          </button>
        </div>

        <form onSubmit={handlePreSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="teamName"
              className="text-sm mb-2 block text-violet-300"
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
              <p className="mt-1 text-sm text-red-400">{errors.teamName}</p>
            )}
          </div>

          <div>
            <label className="text-sm mb-2 block text-violet-300">
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
              <p className="mt-1 text-sm text-red-400">{errors.theme}</p>
            )}
          </div>

          <div className="bg-[#13112a] p-4 rounded-lg border border-indigo-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-violet-400 flex items-center">
                Team Members
                <span className="ml-2 text-xs bg-indigo-900 text-violet-300 px-2 py-1 rounded-full">
                  Min 3 required
                </span>
              </h2>
              {formState.members.length < FLAGS.maxTeamSize && (
                <button
                  type="button"
                  onClick={addTeamMember}
                  disabled={isFormDisabled()}
                  className={`flex items-center px-4 py-1 rounded bg-indigo-800 hover:bg-indigo-700 text-white text-sm transition-colors ${
                    isFormDisabled() ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Plus size={16} className="mr-1" />
                  Add Member
                </button>
              )}
            </div>

            {errors.members && (
              <p className="mb-4 text-sm text-red-400">{errors.members}</p>
            )}

            <div className="space-y-4">
              {formState.members.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  canRemove={formState.members.length > 3}
                  onRemove={removeTeamMember}
                  updateMember={updateMember}
                  errors={errors}
                  disabled={isFormDisabled()}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block text-violet-300">
              Presentation URL (Max 5MB)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link size={16} className="text-indigo-400" />
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
              <p className="mt-1 text-sm text-red-400">
                {errors.presentationUrl}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Share your presentation via Google Drive, Dropbox, or similar
              service
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isFormDisabled()}
              className={`w-full px-4 py-3 bg-violet-600 text-white font-medium rounded-md transition-colors ${
                isFormDisabled()
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-violet-700"
              }`}
            >
              {isPending ? (
                <span className="flex items-center justify-center">
                  <Loader2 size={20} className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                "Register Team"
              )}
            </button>

            {errors.submit && (
              <p className="mt-2 text-sm text-red-400 text-center">
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

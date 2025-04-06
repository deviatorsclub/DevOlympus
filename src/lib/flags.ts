export type Theme =
  | "AI & Machine Learning"
  | "Blockchain & Web3"
  | "Cybersecurity & Privacy"
  | "Robotics"
  | "Open Innovation";

export const THEMES: Theme[] = [
  "AI & Machine Learning",
  "Blockchain & Web3",
  "Cybersecurity & Privacy",
  "Robotics",
  "Open Innovation",
];

export interface FeatureFlags {
  isRegistrationOpen: boolean;
  maxTeamSize: number;
  defaultTheme: Theme;
  submissionDeadline: Date;
  minTeamSize: number;
  startShowingRound2Status: Date;
  isRound2ResultFinalized: boolean;
  showPaymentForm: boolean;
}

export const FLAGS: FeatureFlags = {
  isRegistrationOpen: true,
  maxTeamSize: 4,
  minTeamSize: 3,
  defaultTheme: "AI & Machine Learning",
  submissionDeadline: new Date("2025-04-02T00:30:00+05:30"),
  startShowingRound2Status: new Date("2025-04-06T16:00:00+05:30"), // 6th April 2025, 4:00 PM
  isRound2ResultFinalized: true,
  showPaymentForm: true,
};

export const DEFAULT_VALUES = {
  presentationUrl: "",
  teamNameSuggestion: "",
};

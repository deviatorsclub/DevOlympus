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
}

export const FLAGS: FeatureFlags = {
  isRegistrationOpen: true,
  maxTeamSize: 4,
  defaultTheme: "AI & Machine Learning",
  submissionDeadline: new Date("2025-03-26T18:29:59+05:30"),
};

export const DEFAULT_VALUES = {
  presentationUrl: "",
  teamNameSuggestion: "",
};

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
}

export const FLAGS: FeatureFlags = {
  isRegistrationOpen: true,
  maxTeamSize: 4,
  minTeamSize: 3,
  defaultTheme: "AI & Machine Learning",
  submissionDeadline: new Date("2025-04-01T23:59:59Z"),
};

export const DEFAULT_VALUES = {
  presentationUrl: "",
  teamNameSuggestion: "",
};

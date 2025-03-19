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
  submissionDeadline: new Date(Date.UTC(2025, 3, 1, 18, 29, 0)),
};

export const DEFAULT_VALUES = {
  presentationUrl: "",
  teamNameSuggestion: "",
};

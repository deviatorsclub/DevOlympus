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
  showPaymentFormAndConsent: boolean;
  canUpdatePayment: boolean;
  paymentAndConsentDeadline: Date;
}

export const FLAGS: FeatureFlags = {
  isRegistrationOpen: true,
  maxTeamSize: 4,
  minTeamSize: 3,
  defaultTheme: "AI & Machine Learning",
  submissionDeadline: new Date("2025-04-02T00:30:00+05:30"),
  startShowingRound2Status: new Date("2025-04-06T16:00:00+05:30"),
  isRound2ResultFinalized: true,
  showPaymentFormAndConsent: true,
  canUpdatePayment: false,
  paymentAndConsentDeadline: new Date("2025-04-09T23:59:00+05:30"),
};

export const DEFAULT_VALUES = {
  presentationUrl: "",
  teamNameSuggestion: "",
};

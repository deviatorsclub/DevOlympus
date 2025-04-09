import { Theme } from "@/lib/flags";
import { Prisma } from "@prisma/client";

export type TeamMember = Prisma.TeamMemberGetPayload<{
  select: {
    id: true;
    name: true;
    email: true;
    rollNo: true;
    number: true;
    isLead: true;
  };
}> & {
  consentLetter: Prisma.ConsentLetterGetPayload<{
    select: {
      id: true;
      fileUrl: true;
    };
  }>;
};

export interface FormState {
  teamName: string;
  members: TeamMember[];
  presentationUrl: string;
  theme: Theme;
}

export interface ExtendedFormState extends FormState {
  presentationPublic: boolean;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface SubmitDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}

export interface AlertProps {
  type: "success" | "error";
  message: string;
  onDismiss: () => void;
}

export interface DeadlineBannerProps {
  deadline: Date;
  text?: string;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  canRemove: boolean;
  onRemove: (id: string) => void;
  updateMember: (
    id: string,
    field: keyof Omit<TeamMember, "id" | "isLead">,
    value: string,
  ) => void;
  errors: Record<string, string>;
  disabled: boolean;
}

export type TeamWithMembers = Prisma.TeamGetPayload<{
  select: {
    id: true;
    displayId: true;
    name: true;
    presentationUrl: true;
    theme: true;
    selectedForRound2: true;
    members: {
      select: {
        email: true;
        name: true;
        isLead: true;
        rollNo: true;
        number: true;
      };
    };
    payment: {
      select: {
        id: true;
        screenshotUrl: true;
        verified: true;
      };
    };
  };
}>;

export interface ErrorDisplayProps {
  error: string;
}

export type TeamMemberWithConsent = Prisma.UserGetPayload<{
  select: {
    email: true;
    name: true;
    consentLetter: {
      select: {
        id: true;
      };
    };
  };
}>;

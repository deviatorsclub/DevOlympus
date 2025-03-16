import { Theme } from "@/lib/flags";
import { Prisma } from "@prisma/client";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  isLead?: boolean;
  number: string;
}

export interface FormState {
  teamName: string;
  members: TeamMember[];
  presentationUrl: string;
  theme?: Theme;
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
}

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  canRemove: boolean;
  onRemove: (id: string) => void;
  updateMember: (
    id: string,
    field: keyof Omit<TeamMember, "id" | "isLead">,
    value: string
  ) => void;
  errors: Record<string, string>;
  disabled: boolean;
}

export type TeamWithMembers = Prisma.TeamGetPayload<{
  select: {
    id: true;
    name: true;
    presentationUrl: true;
    theme: true;
    members: {
      select: {
        email: true;
        name: true;
        isLead: true;
        rollNo: true;
        number: true;
      };
    };
  };
}>;

export interface ErrorDisplayProps {
  error: string;
}

"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/authOptions";
import { FLAGS, THEMES, Theme } from "@/lib/flags";
import { prisma } from "@/prisma";

const ThemeEnum = z.enum(THEMES as [Theme, ...Theme[]]);

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(1, "Roll number is required"),
  isLead: z.boolean().optional(),
  number: z.number().min(1, "Phone number is required"),
});

const RegistrationSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  members: z
    .array(TeamMemberSchema)
    .min(
      FLAGS.minTeamSize,
      `At least ${FLAGS.minTeamSize} team members required`,
    )
    .max(
      FLAGS.maxTeamSize,
      `Maximum ${FLAGS.maxTeamSize} team members allowed`,
    ),
  presentationUrl: z.string().url("Must be a valid URL"),
  theme: ThemeEnum,
});

export type RegistrationFormData = z.infer<typeof RegistrationSchema>;

type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function registerTeam(
  data: RegistrationFormData,
): Promise<ActionResponse> {
  try {
    if (!FLAGS.isRegistrationOpen) {
      return {
        success: false,
        message: "Registration is currently closed",
      };
    }

    if (new Date() > FLAGS.submissionDeadline) {
      return {
        success: false,
        message: "Registration deadline has passed",
      };
    }

    const session = await auth();

    if (!session?.user?.email) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const validatedData = RegistrationSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    if (existingUser.team) {
      return {
        success: false,
        message: "You have already registered a team",
      };
    }

    const uniqueEmails = new Set(validatedData.members.map((m) => m.email));
    if (uniqueEmails.size !== validatedData.members.length) {
      return {
        success: false,
        message: "Each team member must have a unique email address",
      };
    }

    const memberEmails = validatedData.members.map((member) => member.email);
    const existingMember = await prisma.teamMember.findFirst({
      where: { email: { in: memberEmails } },
      include: { team: true },
    });

    if (existingMember) {
      return {
        success: false,
        message: `Member with email ${existingMember.email} is already registered with team "${existingMember.team?.name}"`,
      };
    }

    await prisma.team.create({
      data: {
        displayId: "DEV_" + session?.user?.email.split("@")[0],
        name: validatedData.teamName,
        presentationUrl: validatedData.presentationUrl,
        theme: validatedData.theme,
        captainId: existingUser.id,
        members: {
          create: validatedData.members.map((member) => ({
            name: member.name,
            email: member.email,
            rollNo: member.rollNo,
            number: String(member.number),
            isLead: !!member.isLead,
          })),
        },
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Team registered successfully! Good luck with your project.",
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string> = {};
      const errorMessage: string[] = [];

      error.errors.forEach((err) => {
        const path = err.path.join(".");
        formattedErrors[path] = err.message;

        if (path.includes("members")) {
          const memberIndex = parseInt(path.split(".")[1]);
          const memberNumber = memberIndex + 1;

          errorMessage.push(`Team Member ${memberNumber}: ${err.message}`);
        } else {
          errorMessage.push(`${path}: ${err.message}`);
        }
      });

      return {
        success: false,
        message: `Please fix the following issues: ${errorMessage.join("; ")}`,
        errors: formattedErrors,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

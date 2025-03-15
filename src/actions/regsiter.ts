"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/authOptions";
import { FLAGS, THEMES, Theme } from "@/lib/flags";

const prisma = new PrismaClient();

const ThemeEnum = z.enum(THEMES as [Theme, ...Theme[]]);

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  rollNo: z.string().min(1, "Roll number is required"),
  isLead: z.boolean().optional(),
});

const RegistrationSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  members: z
    .array(TeamMemberSchema)
    .min(3, "At least 3 team members required")
    .max(
      FLAGS.maxTeamSize,
      `Maximum ${FLAGS.maxTeamSize} team members allowed`
    ),
  presentationUrl: z.string().url("Must be a valid URL"),
  theme: ThemeEnum,
});

export type RegistrationFormData = z.infer<typeof RegistrationSchema>;

type ActionResponse = {
  success: boolean;
  message: string;
};

export async function registerTeam(
  data: RegistrationFormData
): Promise<ActionResponse> {
  const session = await auth();

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

    const memberEmails = validatedData.members.map((member) => member.email);

    const existingMember = await prisma.teamMember.findFirst({
      where: { email: { in: memberEmails } },
    });

    if (existingMember) {
      return {
        success: false,
        message: `Member with email ${existingMember.email} is already part of another team`,
      };
    }

    await prisma.team.create({
      data: {
        name: validatedData.teamName,
        presentationUrl: validatedData.presentationUrl,
        theme: validatedData.theme,
        captainId: existingUser.id,
        members: {
          create: validatedData.members.map((member) => ({
            name: member.name,
            email: member.email,
            rollNo: member.rollNo,
            isLead: !!member.isLead,
          })),
        },
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Team registered successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors
        .map((e) => `${e.path.join(".")}: ${e.message}`)
        .join(", ");
      return {
        success: false,
        message: `Validation error: ${message}`,
      };
    }

    console.error("Registration error:", error);

    return {
      success: false,
      message: "Failed to register team. Please try again later.",
    };
  }
}

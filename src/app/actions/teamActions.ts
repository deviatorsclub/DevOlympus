"use server";

import { PrismaClient, TeamSelectionStatus } from "@prisma/client";
import { auth } from "@/lib/authOptions";

export async function updateTeamRound2Status(
  teamId: string,
  status: string | null,
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Unauthorized", status: 401 };
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user?.isAdmin) {
      return {
        error: "Only admins can update Round 2 selection status",
        status: 403,
      };
    }

    let selectionStatus: TeamSelectionStatus | null = null;

    if (status === null) {
      selectionStatus = null;
    } else if (
      status === TeamSelectionStatus.SELECTED ||
      status === TeamSelectionStatus.REJECTED ||
      status === TeamSelectionStatus.NOT_DECIDED
    ) {
      selectionStatus = status as TeamSelectionStatus;
    } else {
      return { error: "Invalid selection status", status: 400 };
    }

    const currentTeam = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!currentTeam) {
      return { error: "Team not found", status: 404 };
    }

    const newLog = {
      timestamp: new Date(),
      adminId: user.id,
      adminName: user.name || user.email,
      adminEmail: user.email,
      previousStatus: currentTeam.selectedForRound2,
      newStatus: selectionStatus ?? "NOT_DECIDED",
    };

    const currentLogs = Array.isArray(currentTeam.selectionStatusLogs)
      ? currentTeam.selectionStatusLogs
      : [];

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        selectedForRound2: selectionStatus ?? "NOT_DECIDED",
        selectionStatusLogs: [...currentLogs, newLog],
      },
      select: {
        selectedForRound2: true,
      },
    });

    return { data: updatedTeam, status: 200 };
  } catch (error) {
    console.error("Error updating Round 2 selection status:", error);
    return {
      error: "Failed to update Round 2 selection status",
      status: 500,
    };
  }
}

// Function to get all users with their teams
export async function getAllUsers() {
  try {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany({
      orderBy: {
        lastLogin: "desc",
      },
    });

    const teams = await prisma.team.findMany({
      include: {
        members: true,
      },
    });

    return { data: { users, teams }, status: 200 };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      error: "Failed to fetch users",
      status: 500,
    };
  }
}

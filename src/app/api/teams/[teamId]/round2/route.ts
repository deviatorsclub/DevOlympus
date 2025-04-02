import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, TeamSelectionStatus } from "@prisma/client";
import { auth } from "@/lib/authOptions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { error: "Only admins can update Round 2 selection status" },
        { status: 403 }
      );
    }

    const { teamId } = await params;
    const { status } = await req.json();

    let selectionStatus: TeamSelectionStatus | null = null;

    if (status === null) {
      selectionStatus = null;
    } else if (
      status === TeamSelectionStatus.SELECTED ||
      status === TeamSelectionStatus.REJECTED ||
      status === TeamSelectionStatus.NOT_DECIDED
    ) {
      selectionStatus = status;
    } else {
      return NextResponse.json(
        { error: "Invalid selection status" },
        { status: 400 }
      );
    }

    const currentTeam = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!currentTeam) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
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
    });

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error("Error updating Round 2 selection status:", error);
    return NextResponse.json(
      { error: "Failed to update Round 2 selection status" },
      { status: 500 }
    );
  }
}

"use server";

import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
import { FLAGS } from "@/lib/flags";

export async function submitPayment(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Authentication required", status: 401 };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });

    if (!user?.team) {
      return { error: "You don't have a team", status: 400 };
    }

    if (user.team.selectedForRound2 !== "SELECTED") {
      return { error: "Your team is not selected for Round 2", status: 400 };
    }

    const existingPayment = await prisma.payment.findUnique({
      where: { teamId: user.team.id },
    });

    if (existingPayment) {
      return {
        success: true,
        message: "Payment already submitted",
        status: 200,
        alreadySubmitted: true,
      };
    }

    const senderName = formData.get("senderName") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    const screenshot = formData.get("screenshot") as File;

    if (!senderName || !mobileNumber || !screenshot) {
      return { error: "All fields are required", status: 400 };
    }

    const arrayBuffer = await screenshot.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${screenshot.type};base64,${base64Image}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "round2-payments",
      resource_type: "image",
      public_id: `payment-${user.team.id}`,
    });

    await prisma.payment.create({
      data: {
        teamId: user.team.id,
        senderName,
        mobileNumber,
        screenshotUrl: uploadResult.secure_url,
        screenshotPublicId: uploadResult.public_id,
      },
    });

    revalidatePath("/round-2-payment");

    return {
      success: true,
      message: "Payment submitted successfully",
      status: 200,
    };
  } catch (error) {
    console.error("Payment submission error:", error);
    return {
      error: "Failed to submit payment. Please try again.",
      status: 500,
    };
  }
}

export async function getPaymentStatus() {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Authentication required", status: 401 };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            payment: true,
          },
        },
      },
    });

    if (!user?.team) {
      return {
        hasTeam: false,
        isSelected: false,
        paymentSubmitted: false,
        status: 200,
      };
    }

    const isSelected = user.team.selectedForRound2 === "SELECTED";

    const paymentSubmitted = !!user.team.payment;

    return {
      hasTeam: true,
      isSelected,
      paymentSubmitted,
      paymentDetails: user.team.payment,
      status: 200,
    };
  } catch (error) {
    console.error("Get payment status error:", error);
    return {
      error: "Failed to get payment status",
      status: 500,
    };
  }
}

export async function updatePaymentVerificationStatus(
  teamId: string,
  verified: boolean,
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "Authentication required", status: 401 };
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return { error: "Unauthorized", status: 403 };
    }

    if (!FLAGS.canUpdatePayment) {
      return { error: "Payment updates are currently disabled", status: 403 };
    }

    const payment = await prisma.payment.findUnique({
      where: { teamId },
    });

    if (!payment) {
      return { error: "Payment not found", status: 404 };
    }

    const updatedPayment = await prisma.payment.update({
      where: { teamId },
      data: { verified },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");

    return {
      success: true,
      message: `Payment ${verified ? "verified" : "unverified"} successfully`,
      payment: updatedPayment,
      status: 200,
    };
  } catch (error) {
    console.error("Update payment verification error:", error);
    return {
      error: "Failed to update payment verification status",
      status: 500,
    };
  }
}

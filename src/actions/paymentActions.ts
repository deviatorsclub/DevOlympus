"use server";

import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function submitPayment(formData: FormData) {
  try {
    // Get the current user session
    const session = await auth();
    if (!session?.user) {
      return { error: "Authentication required", status: 401 };
    }

    // Check if user has a team
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { team: true },
    });

    if (!user?.team) {
      return { error: "You don't have a team", status: 400 };
    }

    // Check if team is selected for Round 2
    if (user.team.selectedForRound2 !== "SELECTED") {
      return { error: "Your team is not selected for Round 2", status: 400 };
    }

    // Check if payment already exists
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

    // Get form data
    const senderName = formData.get("senderName") as string;
    const mobileNumber = formData.get("mobileNumber") as string;
    const screenshot = formData.get("screenshot") as File;

    // Validate form data
    if (!senderName || !mobileNumber || !screenshot) {
      return { error: "All fields are required", status: 400 };
    }

    // Convert the file to base64
    const arrayBuffer = await screenshot.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${screenshot.type};base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "round2-payments",
      resource_type: "image",
      public_id: `payment-${user.team.id}`,
    });

    // Save payment to database
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
    // Get the current user session
    const session = await auth();
    if (!session?.user) {
      return { error: "Authentication required", status: 401 };
    }

    // Check if user has a team
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

    // Check if team is selected for Round 2
    const isSelected = user.team.selectedForRound2 === "SELECTED";

    // Check if payment exists
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

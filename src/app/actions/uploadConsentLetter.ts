"use server";

import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { cloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadConsentLetter(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "You must be logged in to upload a consent letter" };
    }

    const file = formData.get("consentLetter") as File;

    if (!file || file.size === 0) {
      return { error: "No file selected" };
    }

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      return { error: "Only PDF, JPEG, and PNG files are allowed" };
    }

    if (file.size > 5 * 1024 * 1024) {
      return { error: "File size must be less than 5MB" };
    }

    const team = await prisma.team.findFirst({
      where: {
        members: {
          some: {
            email: session.user.email,
          },
        },
      },
      include: {
        payment: true,
      },
    });

    if (!team) {
      return { error: "Team not found" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64File}`;

    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder:
        "consent-letters" +
        (process.env.NODE_ENV === "development" ? "-dev" : ""),
      resource_type: file.type.startsWith("image/") ? "image" : "raw",
      public_id: `consent-letter-${team.id}`,
    });

    const existingConsentLetter = await prisma.consentLetter.findUnique({
      where: { teamId: team.id },
    });

    if (existingConsentLetter) {
      await prisma.consentLetter.update({
        where: { id: existingConsentLetter.id },
        data: {
          fileUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      });
    } else {
      await prisma.consentLetter.create({
        data: {
          teamId: team.id,
          fileUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      });
    }

    revalidatePath("/register");
    revalidatePath("/round-2-payment");

    return { success: true };
  } catch (error) {
    console.error("Error uploading consent letter:", error);
    return {
      error: "Failed to upload consent letter",
      details: error instanceof Error ? error.message : String(error),
    };
  }
}

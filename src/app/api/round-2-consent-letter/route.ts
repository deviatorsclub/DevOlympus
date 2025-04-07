import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const consentLetter = await prisma.consentLetter.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        fileUrl: true,
        user: {
          select: {
            id: true,
            team: {
              select: {
                displayId: true,
              },
            },
          },
        },
      },
    });

    if (!consentLetter?.fileUrl) {
      return new NextResponse(
        JSON.stringify({ error: "Consent letter not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    try {
      const response = await fetch(consentLetter.fileUrl, {
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch document: ${response.status} ${response.statusText}`,
        );
      }

      const fileBuffer = await response.arrayBuffer();

      let contentType = response.headers.get("content-type") || "";
      const fileUrl = consentLetter.fileUrl.toLowerCase();

      if (!contentType || contentType === "application/octet-stream") {
        if (fileUrl.endsWith(".pdf")) {
          contentType = "application/pdf";
        } else if (fileUrl.endsWith(".jpg") || fileUrl.endsWith(".jpeg")) {
          contentType = "image/jpeg";
        } else if (fileUrl.endsWith(".png")) {
          contentType = "image/png";
        } else {
          contentType = "application/pdf";
        }
      }

      let extension = "pdf";
      if (contentType === "image/jpeg") extension = "jpg";
      if (contentType === "image/png") extension = "png";

      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control":
            "public, max-age=604800, stale-while-revalidate=86400",
          ETag: `"${Buffer.from(consentLetter.fileUrl).toString("base64").slice(0, 16)}"`,
          "Content-Disposition": `inline; filename="consent-letter-${consentLetter.user.team?.displayId || consentLetter.user.id}.${extension}"`,
        },
      });
    } catch (error: unknown) {
      console.error("Error fetching document from URL:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to fetch document from source",
          details: errorMessage,
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
  } catch (error) {
    console.error("Error serving document:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to process document request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

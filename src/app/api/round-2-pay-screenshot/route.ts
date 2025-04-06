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

    const payment = await prisma.payment.findFirst({
      where: {
        team: {
          members: {
            some: {
              email: session.user.email,
            },
          },
        },
      },
      select: {
        screenshotUrl: true,
      },
    });

    if (!payment?.screenshotUrl) {
      return new NextResponse(JSON.stringify({ error: "Payment not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    try {
      const response = await fetch(payment.screenshotUrl, {
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`
        );
      }

      const imageBuffer = await response.arrayBuffer();
      const contentType = response.headers.get("content-type") || "image/jpeg";

      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,

          "Cache-Control":
            "public, max-age=604800, stale-while-revalidate=86400",
          ETag: `"${Buffer.from(payment.screenshotUrl).toString("base64").slice(0, 16)}"`,
        },
      });
    } catch (error: unknown) {
      console.error("Error fetching image from URL:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return new NextResponse(
        JSON.stringify({
          error: "Failed to fetch image from source",
          details: errorMessage,
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to process image request",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

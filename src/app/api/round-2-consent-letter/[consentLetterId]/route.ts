import { auth } from "@/lib/authOptions";
import { prisma } from "@/prisma";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ consentLetterId: string }> }
) {
  if (request)
    try {
      const { consentLetterId } = await params;
      const session = await auth();
      const isAdmin = session?.user?.isAdmin;

      if (!session?.user) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      const consentLetter = await prisma.consentLetter.findFirst({
        where: {
          id: consentLetterId,
          user: {
            email: isAdmin ? undefined : session.user.email,
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
          }
        );
      }

      try {
        const response = await axios.get(consentLetter.fileUrl, {
          responseType: "arraybuffer",
          headers: {
            Accept: "image/*, application/pdf",
          },
        });

        const fileBuffer = response.data;

        const headers = new Headers();

        Object.entries(response.headers).forEach(([key, value]) => {
          if (
            value &&
            !["content-disposition", "content-length"].includes(
              key.toLowerCase()
            )
          ) {
            headers.set(key, value.toString());
          }
        });

        let contentType = response.headers["content-type"] || "";
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

        headers.set("Content-Type", contentType);

        const extension =
          contentType === "image/jpeg"
            ? "jpg"
            : contentType === "image/png"
              ? "png"
              : "pdf";

        const etag = `"${Buffer.from(consentLetter.fileUrl).toString("base64").slice(0, 16)}"`;
        headers.set("ETag", etag);

        const filename = `consent-letter-${consentLetter.user.team?.displayId || consentLetter.user.id}.${extension}`;
        headers.set("Content-Disposition", `inline; filename="${filename}"`);

        return new NextResponse(fileBuffer, {
          status: 200,
          headers,
        });
      } catch (error) {
        console.error("Error fetching document from URL:", error);

        if (axios.isAxiosError(error)) {
          const status = error.response?.status || 502;
          const statusText = error.response?.statusText || "Bad Gateway";

          return new NextResponse(
            JSON.stringify({
              error: `Failed to fetch document: ${status} ${statusText}`,
              details: error.message,
            }),
            {
              status,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        return new NextResponse(
          JSON.stringify({
            error: "Failed to fetch document from source",
            details: error instanceof Error ? error.message : String(error),
          }),
          {
            status: 502,
            headers: { "Content-Type": "application/json" },
          }
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
          headers: { "Content-Type": "application/json" },
        }
      );
    }
}

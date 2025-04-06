import { NextResponse } from "next/server";

export async function GET() {
  try {
    const imageUrl =
      "https://th.bing.com/th/id/OIP.WmT_HUA0LhDXD49wsmV98wHaFK?rs=1&pid=ImgDetMain";

    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch image: ${response.status} ${response.statusText}`,
      );
    }

    const imageBuffer = await response.arrayBuffer();

    const contentType = response.headers.get("content-type") || "image/jpeg";

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch image" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get("imageUrl");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "No image URL provided" },
      { status: 400 }
    );
  }

  try {
    // Fetch the image from the external URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // Set the correct content type from the response headers
    const contentType = response.headers["content-type"] || "image/jpeg";

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching image" },
      { status: 500 }
    );
  }
}

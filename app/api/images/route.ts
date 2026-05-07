import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { prompt } = body;

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { message: "Image prompt is required" },
      { status: 400 }
    );
  }

  try {
    const backendUrl = process.env.IMAGE_GENERATOR_URL;

    if (!backendUrl) {
      return NextResponse.json(
        { message: "Image generator URL is not configured" },
        { status: 500 }
      );
    }

    const res = await fetch(`${backendUrl}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { message: data.error || data.message || "Image generation failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      imageUrl: data.imageUrl || data.url || data.image,
    });
  } catch (error) {
    console.error("IMAGE GENERATION ERROR:", error);

    return NextResponse.json(
      { message: "Unable to connect to image generator" },
      { status: 500 }
    );
  }
}
// app/api/whitepaper/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const filePath = path.join(process.cwd(), "private", "whitepaper.pdf");
  const file = fs.readFileSync(filePath);

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=s8nt-whitepaper.pdf",
    },
  });
}
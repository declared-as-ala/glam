import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createCloudinarySignature, getCloudinaryConfig } from "@/lib/cloudinary";

export async function POST() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Acces refuse." }, { status: 403 });
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const folder = "glam-parapharmacie";
  const signature = createCloudinarySignature({ folder, timestamp });
  const { cloudName, apiKey } = getCloudinaryConfig();

  return NextResponse.json({
    cloudName,
    apiKey,
    folder,
    timestamp,
    signature,
  });
}

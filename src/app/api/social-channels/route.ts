import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { platforms } = await req.json();

    // Create social channel records
    const channelPromises = platforms.map((platform: string) =>
      prisma.socialChannel.create({
        data: {
          userId: session.user.id,
          platform,
          name: getPlatformName(platform),
          isActive: true,
        },
      })
    );

    await Promise.all(channelPromises);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Social channels error:", error);
    return NextResponse.json(
      { error: "Failed to create channels" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const channels = await prisma.socialChannel.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ channels });
  } catch (error) {
    console.error("Get channels error:", error);
    return NextResponse.json(
      { error: "Failed to fetch channels" },
      { status: 500 }
    );
  }
}

function getPlatformName(platform: string): string {
  const names: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    x: "X (Twitter)",
    tiktok: "TikTok",
    youtube: "YouTube",
    google_business: "Google Business Profile",
  };
  return names[platform] || platform;
}

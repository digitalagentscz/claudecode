import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: {
        campaign: {
          userId: session.user.id,
        },
        status: "scheduled",
        scheduledFor: {
          gte: new Date(),
        },
      },
      include: {
        channel: true,
      },
      orderBy: {
        scheduledFor: "asc",
      },
      take: 10,
    });

    const formattedPosts = posts.map((post) => ({
      id: post.id,
      content: post.content.substring(0, 100),
      platform: post.channel.platform,
      scheduledFor: post.scheduledFor?.toISOString(),
    }));

    return NextResponse.json({ posts: formattedPosts });
  } catch (error) {
    console.error("Upcoming posts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

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

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get campaigns this month
    const campaignsThisMonth = await prisma.campaign.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get scheduled posts
    const scheduledPosts = await prisma.post.count({
      where: {
        campaign: {
          userId: session.user.id,
        },
        status: "scheduled",
        scheduledFor: {
          gte: now,
        },
      },
    });

    // Get published posts this month
    const publishedPosts = await prisma.post.count({
      where: {
        campaign: {
          userId: session.user.id,
        },
        status: "published",
        publishedAt: {
          gte: startOfMonth,
        },
      },
    });

    // Get credits
    const creditBalance = await prisma.creditBalance.findUnique({
      where: { userId: session.user.id },
    });

    return NextResponse.json({
      campaignsThisMonth,
      scheduledPosts,
      publishedPosts,
      creditsRemaining: creditBalance?.credits || 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

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

    const data = await req.json();

    // In a real app, if mode is "url", scrape the listing URL
    // For now, just use the manual data

    const listing = await prisma.listing.create({
      data: {
        userId: session.user.id,
        title: data.title || "Untitled Listing",
        address: data.address,
        area: data.area,
        propertyType: data.propertyType,
        price: data.price,
        currency: data.currency || "CZK",
        features: JSON.stringify(data.features || []),
        images: JSON.stringify(data.images || []),
        sourceUrl: data.mode === "url" ? data.url : null,
        description: data.description,
        status: "active",
      },
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error("Create listing error:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
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

    const listings = await prisma.listing.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        campaigns: {
          select: {
            id: true,
            type: true,
            status: true,
          },
        },
      },
    });

    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Get listings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

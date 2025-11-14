import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCampaign } from "@/lib/openai";
import { safeJSONParse } from "@/lib/utils";

const CAMPAIGN_GENERATION_CREDITS = 20;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { listingId, campaignType } = await req.json();

    // Check credits
    const creditBalance = await prisma.creditBalance.findUnique({
      where: { userId: session.user.id },
    });

    if (!creditBalance || creditBalance.credits < CAMPAIGN_GENERATION_CREDITS) {
      return NextResponse.json(
        { error: "Nedostatek kreditů" },
        { status: 402 }
      );
    }

    // Get listing
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
    });

    if (!listing || listing.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    // Get user profile and branding
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        settings: true,
        brandingProfile: true,
      },
    });

    if (!user || !user.settings || !user.brandingProfile) {
      return NextResponse.json(
        { error: "User profile incomplete" },
        { status: 400 }
      );
    }

    // Generate campaign with AI
    const aiOutput = await generateCampaign({
      listing: {
        title: listing.title,
        address: listing.address || undefined,
        area: listing.area || undefined,
        propertyType: listing.propertyType,
        price: listing.price || undefined,
        currency: listing.currency,
        features: safeJSONParse<string[]>(listing.features, []),
        description: listing.description || undefined,
        images: safeJSONParse<string[]>(listing.images, []),
      },
      campaignType: campaignType as any,
      userProfile: {
        name: user.name || user.email,
        brokerage: user.settings.brokerage || undefined,
        area: user.settings.primaryArea || user.settings.primaryCity || "Praha",
        toneOfVoice: user.brandingProfile.toneOfVoice,
        stylePreference: user.brandingProfile.stylePreference,
        defaultCTA: user.brandingProfile.defaultCTA,
        personas: safeJSONParse<Array<{ name: string; description: string }>>(
          user.brandingProfile.personas,
          []
        ),
      },
    });

    // Create campaign in database
    const campaign = await prisma.campaign.create({
      data: {
        userId: session.user.id,
        listingId: listing.id,
        type: campaignType,
        status: "draft",
        tourContent: JSON.stringify(aiOutput.tour),
        caseStudyContent: JSON.stringify(aiOutput.caseStudy),
        expertContent: JSON.stringify(aiOutput.expert),
        generatedAt: new Date(),
      },
    });

    // Get user's social channels
    const channels = await prisma.socialChannel.findMany({
      where: {
        userId: session.user.id,
        isActive: true,
      },
    });

    // Create posts for each platform
    const postPromises = channels.map(async (channel) => {
      const platformVariant = aiOutput.platformVariants[
        channel.platform as keyof typeof aiOutput.platformVariants
      ] as any;

      if (!platformVariant) return;

      return prisma.post.create({
        data: {
          campaignId: campaign.id,
          channelId: channel.id,
          pillarType: "tour",
          content: platformVariant.caption || platformVariant.copy,
          hashtags:
            "hashtags" in platformVariant ? platformVariant.hashtags : "",
          mediaUrls: listing.images,
          status: "draft",
        },
      });
    });

    await Promise.all(postPromises.filter(Boolean));

    // Deduct credits
    const newBalance = creditBalance.credits - CAMPAIGN_GENERATION_CREDITS;
    await prisma.creditBalance.update({
      where: { userId: session.user.id },
      data: { credits: newBalance },
    });

    // Record transaction
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        amount: -CAMPAIGN_GENERATION_CREDITS,
        type: "deduction",
        reason: `Generování kampaně: ${campaignType}`,
        relatedId: campaign.id,
        relatedType: "campaign",
        balanceAfter: newBalance,
      },
    });

    return NextResponse.json({ campaign, creditsUsed: CAMPAIGN_GENERATION_CREDITS });
  } catch (error) {
    console.error("Campaign generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate campaign" },
      { status: 500 }
    );
  }
}

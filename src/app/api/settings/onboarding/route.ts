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

    // Parse personas from text to JSON
    const personasArray = data.personas
      ? data.personas
          .split(",")
          .map((p: string) => ({ name: p.trim(), description: "" }))
          .filter((p: any) => p.name)
      : [];

    // Update user settings
    await prisma.userSettings.upsert({
      where: { userId: session.user.id },
      update: {
        phoneNumber: data.phoneNumber,
        brokerage: data.brokerage,
        primaryCity: data.primaryCity,
        primaryArea: data.primaryArea,
        onboardingCompleted: true,
        onboardingStep: 5,
      },
      create: {
        userId: session.user.id,
        phoneNumber: data.phoneNumber,
        brokerage: data.brokerage,
        primaryCity: data.primaryCity,
        primaryArea: data.primaryArea,
        language: "cs",
        timezone: "Europe/Prague",
        onboardingCompleted: true,
        onboardingStep: 5,
      },
    });

    // Update branding profile
    await prisma.brandingProfile.upsert({
      where: { userId: session.user.id },
      update: {
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        toneOfVoice: data.toneOfVoice,
        stylePreference: data.stylePreference,
        defaultCTA: data.defaultCTA,
        personas: JSON.stringify(personasArray),
      },
      create: {
        userId: session.user.id,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        toneOfVoice: data.toneOfVoice,
        stylePreference: data.stylePreference,
        defaultCTA: data.defaultCTA,
        personas: JSON.stringify(personasArray),
      },
    });

    // Update user name if provided
    if (data.name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: data.name },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email a heslo jsou povinné" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Heslo musí mít alespoň 8 znaků" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Uživatel s tímto emailem již existuje" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with related data
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        settings: {
          create: {
            language: "cs",
            timezone: "Europe/Prague",
            onboardingCompleted: false,
            onboardingStep: 0,
          },
        },
        creditBalance: {
          create: {
            credits: parseInt(process.env.FREE_TIER_CREDITS || "100"),
          },
        },
        brandingProfile: {
          create: {},
        },
        subscription: {
          create: {
            plan: "free",
            status: "active",
            campaignsPerMonth: parseInt(
              process.env.FREE_TIER_CAMPAIGNS_PER_MONTH || "3"
            ),
            creditsPerMonth: parseInt(process.env.FREE_TIER_CREDITS || "100"),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
        dashboardLayout: {
          create: {
            layout: JSON.stringify([
              { id: "campaigns", x: 0, y: 0, w: 2, h: 1, visible: true },
              { id: "upcoming-posts", x: 2, y: 0, w: 2, h: 1, visible: true },
              { id: "brand-health", x: 0, y: 1, w: 2, h: 1, visible: true },
              { id: "quick-create", x: 2, y: 1, w: 2, h: 1, visible: true },
            ]),
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Create initial credit transaction
    await prisma.creditTransaction.create({
      data: {
        userId: user.id,
        amount: parseInt(process.env.FREE_TIER_CREDITS || "100"),
        type: "grant",
        reason: "Uvítací bonus",
        balanceAfter: parseInt(process.env.FREE_TIER_CREDITS || "100"),
      },
    });

    return NextResponse.json(
      {
        user,
        message: "Účet byl úspěšně vytvořen",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Došlo k chybě při vytváření účtu" },
      { status: 500 }
    );
  }
}

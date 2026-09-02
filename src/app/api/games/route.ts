import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        gameUrl: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      games,
    });
  } catch (error) {
    console.error("Get games error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred." },
      { status: 500 },
    );
  }
}

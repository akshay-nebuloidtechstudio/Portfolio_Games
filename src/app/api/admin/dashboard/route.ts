import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const [
      pendingAccessRequests,
      totalUsers,
      activeUsers,
      suspendedUsers,
      totalGames,
      publishedGames,
      draftGames,
      archivedGames,
    ] = await Promise.all([
      prisma.accessRequest.count({ where: { status: "PENDING" } }),
      prisma.user.count(),
      prisma.user.count({ where: { status: "ACTIVE" } }),
      prisma.user.count({ where: { status: "SUSPENDED" } }),
      prisma.game.count(),
      prisma.game.count({ where: { status: "PUBLISHED" } }),
      prisma.game.count({ where: { status: "DRAFT" } }),
      prisma.game.count({ where: { status: "ARCHIVED" } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        pendingAccessRequests,
        totalUsers,
        activeUsers,
        suspendedUsers,
        totalGames,
        publishedGames,
        draftGames,
        archivedGames,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { success: false, error: "Authentication required." },
        { status: 401 },
      );
    }
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json(
        { success: false, error: "Admin access required." },
        { status: 403 },
      );
    }
    console.error("Get dashboard error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!game) {
      return NextResponse.json(
        { success: false, error: "Game not found." },
        { status: 404 },
      );
    }

    if (game.status === "ARCHIVED") {
      return NextResponse.json(
        { success: false, error: "Game is already archived." },
        { status: 400 },
      );
    }

    const updated = await prisma.game.update({
      where: { id },
      data: { status: "ARCHIVED" },
      select: { id: true, status: true },
    });

    return NextResponse.json({
      success: true,
      message: "Game archived.",
      game: updated,
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
    console.error("Archive game error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

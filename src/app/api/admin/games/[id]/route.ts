import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        gameUrl: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!game) {
      return NextResponse.json(
        { success: false, error: "Game not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      game,
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
    console.error("Get game error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const game = await prisma.game.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!game) {
      return NextResponse.json(
        { success: false, error: "Game not found." },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { updateGameSchema } = await import("@/lib/validation");
    const result = updateGameSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, error: "Invalid input.", errors },
        { status: 400 },
      );
    }

    const updated = await prisma.game.update({
      where: { id },
      data: result.data,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        thumbnailUrl: true,
        gameUrl: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
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
    console.error("Update game error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

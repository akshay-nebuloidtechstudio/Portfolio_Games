import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, destroyUserSessions } from "@/lib/auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;

    if (admin.id === id) {
      return NextResponse.json(
        { success: false, error: "You cannot revoke your own account." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 },
      );
    }

    if (user.status === "REVOKED") {
      return NextResponse.json(
        { success: false, error: "User is already revoked." },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id },
      data: { status: "REVOKED" },
    });

    await destroyUserSessions(id);

    return NextResponse.json({
      success: true,
      message: "User revoked and sessions invalidated.",
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
    console.error("Revoke user error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

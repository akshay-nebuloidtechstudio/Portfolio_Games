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

    const accessRequest = await prisma.accessRequest.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!accessRequest) {
      return NextResponse.json(
        { success: false, error: "Access request not found." },
        { status: 404 },
      );
    }

    if (accessRequest.status !== "PENDING") {
      return NextResponse.json(
        { success: false, error: "Access request has already been processed." },
        { status: 400 },
      );
    }

    await prisma.accessRequest.update({
      where: { id },
      data: {
        status: "REJECTED",
        processedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Access request rejected.",
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
    console.error("Reject access request error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

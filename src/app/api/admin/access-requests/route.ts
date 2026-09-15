import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { accessRequestFilterSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const result = accessRequestFilterSchema.safeParse({
      status: searchParams.get("status") || undefined,
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid query parameters." },
        { status: 400 },
      );
    }

    const { status, page, limit } = result.data;
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      prisma.accessRequest.findMany({
        where: { status },
        select: {
          id: true,
          fullName: true,
          email: true,
          status: true,
          createdAt: true,
          processedAt: true,
          userId: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.accessRequest.count({ where: { status } }),
    ]);

    return NextResponse.json({
      success: true,
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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
    console.error("Get access requests error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requestAccessSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = requestAccessSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { fullName, email } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: true,
          message: "Access request received.",
        },
        { status: 200 },
      );
    }

    const existingPendingRequest = await prisma.accessRequest.findFirst({
      where: {
        email,
        status: "PENDING",
      },
      select: { id: true },
    });

    if (existingPendingRequest) {
      return NextResponse.json(
        {
          success: true,
          message: "Access request received.",
        },
        { status: 200 },
      );
    }

    await prisma.accessRequest.create({
      data: {
        fullName,
        email,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Access request received.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Request access error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred. Please try again." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, destroyUserSessions } from "@/lib/auth";
import { generatePassword, hashPassword } from "@/lib/credentials";
import { sendResendCredentials } from "@/lib/email";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();
    const { id } = await params;

    if (admin.id === id) {
      return NextResponse.json(
        { success: false, error: "You cannot resend credentials for your own account." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, fullName: true, email: true, username: true, role: true, status: true },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found." },
        { status: 404 },
      );
    }

    const newPassword = generatePassword();
    const newHash = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id },
      data: { passwordHash: newHash },
    });

    await destroyUserSessions(id);

    const emailResult = await sendResendCredentials({
      to: user.email,
      fullName: user.fullName,
      username: user.username,
      password: newPassword,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: `Credentials updated but email delivery failed: ${emailResult.error}. The user's password has been changed and all sessions invalidated. Consider trying again.` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "New credentials have been sent to the user's registered email.",
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
    console.error("Resend credentials error:", error);
    return NextResponse.json(
      { success: false, error: "An error occurred." },
      { status: 500 },
    );
  }
}

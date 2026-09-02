import { prisma } from "./prisma";
import {
  generateUsername,
  generatePassword,
  hashPassword,
} from "./credentials";
import { sendAccountCredentials } from "./email";

interface CreateAccountResult {
  success: boolean;
  userId?: string;
  username?: string;
  error?: string;
}

export async function createAccountFromAccessRequest(
  requestId: string,
): Promise<CreateAccountResult> {
  const accessRequest = await prisma.accessRequest.findUnique({
    where: { id: requestId },
  });

  if (!accessRequest) {
    return { success: false, error: "Access request not found" };
  }

  if (accessRequest.status !== "PENDING") {
    return {
      success: false,
      error: "Access request has already been processed",
    };
  }

  const username = await generateUsername();
  const plainPassword = generatePassword();
  const passwordHash = await hashPassword(plainPassword);

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: accessRequest.fullName,
          email: accessRequest.email.toLowerCase(),
          username,
          passwordHash,
          status: "ACTIVE",
        },
      });

      await tx.accessRequest.update({
        where: { id: requestId },
        data: {
          status: "APPROVED",
          processedAt: new Date(),
          userId: user.id,
        },
      });

      return user;
    });

    const emailResult = await sendAccountCredentials({
      to: accessRequest.email,
      fullName: accessRequest.fullName,
      username,
      password: plainPassword,
    });

    if (!emailResult.success) {
      console.error(
        "Account created but email failed to send. Username:",
        username,
      );
    }

    return {
      success: true,
      userId: result.id,
      username: result.username,
    };
  } catch (error) {
    console.error("Failed to create account:", error);
    return { success: false, error: "Failed to create account" };
  }
}

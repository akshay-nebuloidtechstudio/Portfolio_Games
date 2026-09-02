import crypto from "node:crypto";
import argon2 from "argon2";
import { prisma } from "./prisma";

const USERNAME_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const USERNAME_LENGTH = 8;
const USERNAME_PREFIX = "NG-";

const PASSWORD_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const PASSWORD_LENGTH = 16;

function secureRandom(max: number): number {
  const bytes = crypto.randomBytes(4);
  const value = bytes.readUInt32BE(0);
  return value % max;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function generateUsername(): Promise<string> {
  const chars = USERNAME_CHARS.split("");
  for (let attempt = 0; attempt < 10; attempt++) {
    let username = USERNAME_PREFIX;
    for (let i = 0; i < USERNAME_LENGTH; i++) {
      username += chars[secureRandom(chars.length)];
    }

    const existing = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!existing) {
      return username;
    }
  }

  throw new Error("Failed to generate unique username after 10 attempts");
}

export function generatePassword(): string {
  const required = [
    PASSWORD_CHARS[secureRandom(26)],
    PASSWORD_CHARS[26 + secureRandom(26)],
    PASSWORD_CHARS[52 + secureRandom(10)],
    PASSWORD_CHARS[62 + secureRandom(PASSWORD_CHARS.length - 62)],
  ];

  const remaining = Array.from({ length: PASSWORD_LENGTH - required.length }, () =>
    PASSWORD_CHARS[secureRandom(PASSWORD_CHARS.length)],
  );

  return shuffleArray([...required, ...remaining]).join("");
}

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, { type: argon2.argon2id });
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return argon2.verify(hash, password);
}

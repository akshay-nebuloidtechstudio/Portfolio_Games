import { z } from "zod";

export const requestAccessSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be 100 characters or less")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be 255 characters or less")
    .trim()
    .toLowerCase(),
});

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .trim()
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type RequestAccessInput = z.infer<typeof requestAccessSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export type RegisterInput = z.infer<
  typeof registerSchema
>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password cannot exceed 100 characters"),
});

export type LoginInput = z.infer<
  typeof loginSchema
>;
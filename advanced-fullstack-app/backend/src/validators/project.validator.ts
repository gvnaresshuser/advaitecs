import { z } from "zod";

// ---------------------------------------------------------
// Create project validation
// ---------------------------------------------------------

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters long")
    .max(150, "Project name cannot exceed 150 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),
});

// ---------------------------------------------------------
// Update project validation
// ---------------------------------------------------------

export const updateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters long")
    .max(150, "Project name cannot exceed 150 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),
});

// ---------------------------------------------------------
// Project search validation
// ---------------------------------------------------------

export const projectSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Search term is required")
    .max(100, "Search term cannot exceed 100 characters"),
});

// ---------------------------------------------------------
// Project pagination validation
// ---------------------------------------------------------

export const projectPaginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1, "Page must be at least 1")
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit cannot exceed 100")
    .default(10),
});

// ---------------------------------------------------------
// Minimum tasks validation
// ---------------------------------------------------------

export const projectMinimumTasksSchema = z.object({
  count: z.coerce
    .number()
    .int()
    .min(0, "Count cannot be negative"),
});
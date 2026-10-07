import { z } from "zod";

// ---------------------------------------------------------
// Task status
// ---------------------------------------------------------

export const taskStatusSchema = z.enum([
  "TODO",
  "IN_PROGRESS",
  "DONE",
]);

// ---------------------------------------------------------
// Task priority
// ---------------------------------------------------------

export const taskPrioritySchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
]);

// ---------------------------------------------------------
// Create task validation
// ---------------------------------------------------------

export const createTaskSchema = z.object({
  projectId: z
    .string()
    .uuid("Project ID must be a valid UUID"),

  assignedTo: z
    .string()
    .uuid("Assigned user ID must be a valid UUID")
    .optional(),

  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters long")
    .max(200, "Task title cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional(),

  status: taskStatusSchema
    .default("TODO"),

  priority: taskPrioritySchema
    .default("MEDIUM"),

  dueDate: z
    .string()
    .date("Due date must be a valid date")
    .optional(),
});

// ---------------------------------------------------------
// Update task validation
// ---------------------------------------------------------

export const updateTaskSchema = z.object({
  assignedTo: z
    .string()
    .uuid("Assigned user ID must be a valid UUID")
    .nullable()
    .optional(),

  title: z
    .string()
    .trim()
    .min(2, "Task title must be at least 2 characters long")
    .max(200, "Task title cannot exceed 200 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .nullable()
    .optional(),

  status: taskStatusSchema.optional(),

  priority: taskPrioritySchema.optional(),

  dueDate: z
    .string()
    .date("Due date must be a valid date")
    .nullable()
    .optional(),
});

// ---------------------------------------------------------
// Task filter validation
// ---------------------------------------------------------

export const taskFilterSchema = z.object({
  status: taskStatusSchema,

  priority: taskPrioritySchema,
});

// ---------------------------------------------------------
// Task search validation
// ---------------------------------------------------------

export const taskSearchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Search term is required")
    .max(100, "Search term cannot exceed 100 characters"),
});

// ---------------------------------------------------------
// Task pagination validation
// ---------------------------------------------------------

export const taskPaginationSchema = z.object({
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

export const taskMinimumTasksSchema = z.object({
  count: z.coerce
    .number()
    .int()
    .min(0, "Count cannot be negative"),
});
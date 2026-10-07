import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import { env } from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";

import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// ---------------------------------------------------------
// Global middleware
// ---------------------------------------------------------

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// ---------------------------------------------------------
// Health check
// ---------------------------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend API is running",
  });
});

// ---------------------------------------------------------
// API routes
// ---------------------------------------------------------

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

// ---------------------------------------------------------
// 404 - Route not found
// ---------------------------------------------------------

app.use(notFoundMiddleware);

// ---------------------------------------------------------
// Centralized error handler
// ---------------------------------------------------------

app.use(errorMiddleware);

export default app;
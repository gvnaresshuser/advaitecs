import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { pool } from "./db/pool.js";

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

// ==========================================
// Security Middleware
// ==========================================

app.use(helmet());

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: env.corsCredentials,
  }),
);

// ==========================================
// Body Parsers
// ==========================================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Cookie Parser
// ==========================================

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

// ==========================================
// Health Check
// ==========================================

//http://localhost:5000/api/health
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "JWT Cookies API is running",
  });
});

//http://localhost:5000/api/health/db
app.get("/api/health/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    res.status(200).json({
      success: true,
      message: "PostgreSQL connection successful",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "PostgreSQL connection failed",
    });
  }
});

export default app;
import "dotenv/config";

const PORT = Number(process.env.PORT) || 5000;

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env");
}

export const env = {
  PORT,

  DATABASE_URL,

  NODE_ENV: process.env.NODE_ENV || "development",

  FRONTEND_URL:
    process.env.FRONTEND_URL || "http://localhost:5173",

  JWT_SECRET:
    process.env.JWT_SECRET || "",

  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN || "1h",
};
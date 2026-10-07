import dotenv from "dotenv";

dotenv.config();

export const env = {
  // ==========================================
  // SERVER
  // ==========================================

  port: Number(process.env.PORT) || 5000,

  // ==========================================
  // DATABASE
  // ==========================================

  databaseUrl: process.env.DATABASE_URL || "",

  // ==========================================
  // CORS
  // ==========================================

  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",

  corsCredentials:
    process.env.CORS_CREDENTIALS === "true",

  // ==========================================
  // JWT
  // ==========================================

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET || "",

  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || "",

  jwtAccessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN || "2m",

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN || "15m",

  // ==========================================
  // AUTHENTICATION MODE
  // ==========================================

  authMode:
    process.env.AUTH_MODE || "cookie",

  // ==========================================
  // ACCESS TOKEN COOKIE
  // ==========================================

  accessCookieName:
    process.env.ACCESS_COOKIE_NAME || "accessToken",

  accessCookieHttpOnly:
    process.env.ACCESS_COOKIE_HTTP_ONLY === "true",

  accessCookieSecure:
    process.env.ACCESS_COOKIE_SECURE === "true",

  accessCookieSameSite:
    process.env.ACCESS_COOKIE_SAME_SITE || "lax",

  accessCookiePath:
    process.env.ACCESS_COOKIE_PATH || "/",

  accessCookieMaxAge:
    Number(process.env.ACCESS_COOKIE_MAX_AGE) || 120000,

  // ==========================================
  // REFRESH TOKEN COOKIE
  // ==========================================

  refreshCookieName:
    process.env.REFRESH_COOKIE_NAME || "refreshToken",

  refreshCookieHttpOnly:
    process.env.REFRESH_COOKIE_HTTP_ONLY === "true",

  refreshCookieSecure:
    process.env.REFRESH_COOKIE_SECURE === "true",

  refreshCookieSameSite:
    process.env.REFRESH_COOKIE_SAME_SITE || "lax",

  refreshCookiePath:
    process.env.REFRESH_COOKIE_PATH || "/api/auth",

  refreshCookieMaxAge:
    Number(process.env.REFRESH_COOKIE_MAX_AGE) || 900000,
};
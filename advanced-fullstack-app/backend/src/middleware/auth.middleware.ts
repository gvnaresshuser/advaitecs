import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt.js";

// ---------------------------------------------------------
// Authentication middleware
// Supports:
// 1. HTTP-only cookie
// 2. Authorization: Bearer <JWT>
// ---------------------------------------------------------

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // -------------------------------------------------------
    // 1. Try to get JWT from HTTP-only cookie
    // -------------------------------------------------------

    const cookieToken = req.cookies?.accessToken;

    // -------------------------------------------------------
    // 2. Try to get JWT from Authorization header
    // -------------------------------------------------------

    const authHeader = req.headers.authorization;

    let bearerToken: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
      bearerToken = authHeader.substring(7);
    }

    // -------------------------------------------------------
    // 3. Use cookie token first, Bearer token as fallback
    // -------------------------------------------------------

    const token = cookieToken || bearerToken;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    // -------------------------------------------------------
    // 4. Verify JWT
    // -------------------------------------------------------

    const payload = verifyToken(token);

    // -------------------------------------------------------
    // 5. Attach authenticated user to request
    // -------------------------------------------------------

    req.user = {
      id: payload.userId,
    };

    // -------------------------------------------------------
    // 6. Continue to protected route
    // -------------------------------------------------------

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};
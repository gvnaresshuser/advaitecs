import type {
  NextFunction,
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../types/auth.types.js";

import { env } from "../config/env.js";

import {
  verifyAccessToken,
} from "../utils/jwt.js";

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  // Priority 1: HTTP-only cookie
  let accessToken =
    req.cookies[env.accessCookieName];

  // Priority 2: Authorization header
  if (!accessToken) {
    const authorization =
      req.headers.authorization;

    if (
      authorization &&
      authorization.startsWith("Bearer ")
    ) {
      accessToken =
        authorization.substring(7);
    }
  }

  if (!accessToken) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  try {
    const payload = verifyAccessToken(
      accessToken,
    );

    if (payload.type !== "access") {
      res.status(401).json({
        success: false,
        message: "Invalid access token",
      });

      return;
    }

    req.user = {
      userId: payload.userId,
      email: payload.email,
      roles: payload.roles,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
};
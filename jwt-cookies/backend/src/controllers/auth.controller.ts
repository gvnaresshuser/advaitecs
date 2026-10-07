import type {
  Request,
  Response,
  NextFunction,
} from "express";

import type {
  AuthenticatedRequest,
} from "../types/auth.types.js";

import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from "../services/auth.service.js";

import {
  clearAccessTokenCookie,
  clearRefreshTokenCookie,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "../utils/cookies.js";

import { env } from "../config/env.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await loginUser(req.body);

    // Store JWTs in HTTP-only cookies.
    setAccessTokenCookie(
      res,
      result.accessToken,
    );

    setRefreshTokenCookie(
      res,
      result.refreshToken,
    );

    // Never send the JWTs in the JSON response.
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken =
      req.cookies[env.refreshCookieName];

    if (!refreshToken) {
      throw new Error(
        "Refresh token is missing",
      );
    }

    const result = await refreshSession(
      refreshToken,
    );

    setAccessTokenCookie(
      res,
      result.accessToken,
    );

    setRefreshTokenCookie(
      res,
      result.refreshToken,
    );

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const refreshToken =
      req.cookies[env.refreshCookieName];

    await logoutUser(refreshToken);

    clearAccessTokenCookie(res);
    clearRefreshTokenCookie(res);

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};
export const me = (
  req: AuthenticatedRequest,
  res: Response,
): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });

    return;
  }

  res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: {
      user: req.user,
    },
  });
};

export const adminOnly = (
  req: AuthenticatedRequest,
  res: Response,
): void => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    data: {
      user: req.user,
    },
  });
};
import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { env } from "../config/env.js";
import { authService } from "../services/auth.service.js";

// ---------------------------------------------------------
// Cookie configuration
// ---------------------------------------------------------

const authCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 1000,
};

// ---------------------------------------------------------
// Authentication controller
// ---------------------------------------------------------

export const authController = {
  // -------------------------------------------------------
  // POST /api/auth/register
  // -------------------------------------------------------

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      const user =
        await authService.registerUser(
          name,
          email,
          password,
        );

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // -------------------------------------------------------
  // POST /api/auth/login
  // -------------------------------------------------------

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        email,
        password,
      } = req.body;

      const result =
        await authService.loginUser(
          email,
          password,
        );

      // ---------------------------------------------------
      // Store JWT in HTTP-only cookie
      // ---------------------------------------------------

      res.cookie(
        "accessToken",
        result.token,
        authCookieOptions,
      );

      // ---------------------------------------------------
      // Return user + token
      //
      // The cookie is intended for browser applications.
      // The token can be used as:
      //
      // Authorization: Bearer <token>
      //
      // by Postman or other API clients.
      // ---------------------------------------------------

      res.json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          accessToken: result.token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  // -------------------------------------------------------
  // GET /api/auth/me
  // -------------------------------------------------------

  async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      const user =
        await authService.getCurrentUser(
          req.user.id,
        );

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },

  // -------------------------------------------------------
  // POST /api/auth/logout
  // -------------------------------------------------------

  async logout(
    _req: Request,
    res: Response,
  ) {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Logout successful",
    });
  },
};
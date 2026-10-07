import type {
  NextFunction,
  Response,
} from "express";

import type {
  AuthenticatedRequest,
} from "../types/auth.types.js";

export const authorize = (
  ...allowedRoles: string[]
) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const hasRequiredRole =
      req.user.roles.some((role) =>
        allowedRoles.includes(role),
      );

    if (!hasRequiredRole) {
      res.status(403).json({
        success: false,
        message: "Access forbidden",
      });

      return;
    }

    next();
  };
};
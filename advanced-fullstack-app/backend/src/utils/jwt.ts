import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

// ---------------------------------------------------------
// JWT payload
// ---------------------------------------------------------

export interface AuthTokenPayload {
  userId: string;
}

// ---------------------------------------------------------
// Generate JWT
// ---------------------------------------------------------

export const generateToken = (
  userId: string,
): string => {
  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    },
  );
};

// ---------------------------------------------------------
// Verify JWT
// ---------------------------------------------------------

export const verifyToken = (
  token: string,
): AuthTokenPayload => {
  const decoded = jwt.verify(
    token,
    env.JWT_SECRET,
  );

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid JWT payload");
  }

  return {
    userId: decoded.userId,
  };
};
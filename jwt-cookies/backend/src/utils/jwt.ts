import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";

export interface AccessTokenPayload {
  userId: number;
  email: string;
  roles: string[];
  type: "access";
}

export interface RefreshTokenPayload {
  userId: number;
  type: "refresh";
}

/**
 * Generate a short-lived access token.
 */
export const generateAccessToken = (
  payload: AccessTokenPayload,
): string => {
  const options: SignOptions = {
    expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    env.jwtAccessSecret,
    options,
  );
};

/**
 * Generate a longer-lived refresh token.
 */
export const generateRefreshToken = (
  payload: RefreshTokenPayload,
): string => {
  const options: SignOptions = {
    expiresIn: env.jwtRefreshExpiresIn as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    env.jwtRefreshSecret,
    options,
  );
};

/**
 * Verify an access token.
 */
export const verifyAccessToken = (
  token: string,
): AccessTokenPayload => {
  return jwt.verify(
    token,
    env.jwtAccessSecret,
  ) as AccessTokenPayload;
};

/**
 * Verify a refresh token.
 */
export const verifyRefreshToken = (
  token: string,
): RefreshTokenPayload => {
  return jwt.verify(
    token,
    env.jwtRefreshSecret,
  ) as RefreshTokenPayload;
};

export const getRefreshTokenExpiryDate = (): Date => {
  const expiresIn = env.jwtRefreshExpiresIn;

  const match = expiresIn.match(
    /^(\d+)(s|m|h|d)$/,
  );

  if (!match) {
    throw new Error(
      "Invalid JWT_REFRESH_EXPIRES_IN format",
    );
  }

  const value = Number(match[1]);
  const unit = match[2];

  const unitMilliseconds: Record<
    "s" | "m" | "h" | "d",
    number
  > = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const milliseconds = unitMilliseconds[
    unit as "s" | "m" | "h" | "d"
  ];

  return new Date(
    Date.now() + value * milliseconds,
  );
};
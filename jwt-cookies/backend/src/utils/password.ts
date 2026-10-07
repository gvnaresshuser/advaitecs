import bcrypt from "bcrypt";
import crypto from "node:crypto";
//secure one-way hash for the refresh token.

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password.
 */
export const hashPassword = async (
  password: string,
): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plain-text password with a bcrypt hash.
 */
export const comparePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};

export const hashRefreshToken = (
  token: string,
): string => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};
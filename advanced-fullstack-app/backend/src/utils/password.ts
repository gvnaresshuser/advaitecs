import bcrypt from "bcrypt";

// ---------------------------------------------------------
// Password configuration
// ---------------------------------------------------------

const SALT_ROUNDS = 12;

// ---------------------------------------------------------
// Hash password
// ---------------------------------------------------------

export const hashPassword = async (
  password: string,
): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// ---------------------------------------------------------
// Compare password with password hash
// ---------------------------------------------------------

export const comparePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash);
};
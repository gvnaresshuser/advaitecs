import {
  assignRoleToUser,
  createUser,
  findUserByEmail,
  findUserById,
  findUserRoles,
} from "../repositories/user.repository.js";

import {
  createRefreshToken,
  findRefreshTokenByHash,
  revokeRefreshToken,
} from "../repositories/refresh-token.repository.js";

import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpiryDate,
  verifyRefreshToken,
} from "../utils/jwt.js";

import {
  comparePassword,
  hashPassword,
  hashRefreshToken,
} from "../utils/password.js";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface SafeUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  roles: string[];
}
export interface LoginUserInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
}

export interface RefreshResult {
  accessToken: string;
  refreshToken: string;
  user: SafeUser;
}

export const registerUser = async (
  input: RegisterUserInput,
): Promise<SafeUser> => {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();

  // 1. Check whether the email already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email address is already registered");
  }

  // 2. Hash the password before storing it
  const passwordHash = await hashPassword(input.password);

  // 3. Create the user
  const user = await createUser(
    name,
    email,
    passwordHash,
  );

  // 4. Assign the default USER role
  await assignRoleToUser(user.id, "USER");

  // 5. Retrieve the user's roles
  const roles = await findUserRoles(user.id);

  // 6. Never return password_hash to the client
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.is_active,
    roles,
  };
};

export const loginUser = async (
  input: LoginUserInput,
): Promise<LoginResult> => {
  const email = input.email.trim().toLowerCase();

  // 1. Find the user
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // 2. Check whether the account is active
  if (!user.is_active) {
    throw new Error("User account is inactive");
  }

  // 3. Compare the supplied password with the bcrypt hash
  const passwordMatches = await comparePassword(
    input.password,
    user.password_hash,
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  // 4. Get the user's roles
  const roles = await findUserRoles(user.id);

  // 5. Generate access token
  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    roles,
    type: "access",
  });

  // 6. Generate refresh token
  const refreshToken = generateRefreshToken({
    userId: user.id,
    type: "refresh",
  });

  // 7. Hash refresh token before storing it
  const refreshTokenHash = hashRefreshToken(
    refreshToken,
  );

  // 8. Calculate refresh token expiry
 /*  const refreshTokenExpiresAt = new Date(
    Date.now() + 15 * 60 * 1000,
  ); */
  const refreshTokenExpiresAt =
  getRefreshTokenExpiryDate();

  // 9. Store refresh-token session
  await createRefreshToken(
    user.id,
    refreshTokenHash,
    refreshTokenExpiresAt,
  );

  // 10. Return authentication result
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      roles,
    },
  };
};

export const refreshSession = async (
  refreshToken: string,
): Promise<RefreshResult> => {
  // 1. Verify the refresh JWT
  const payload = verifyRefreshToken(refreshToken);

  // 2. Make sure this is actually a refresh token
  if (payload.type !== "refresh") {
    throw new Error("Invalid refresh token");
  }

  // 3. Hash the raw token
  const tokenHash = hashRefreshToken(refreshToken);

  // 4. Find the token in the database
  const storedToken = await findRefreshTokenByHash(
    tokenHash,
  );

  if (!storedToken) {
    throw new Error("Refresh token not found");
  }

  // 5. Check whether the token has already been revoked
  if (storedToken.revoked_at) {
    throw new Error("Refresh token has been revoked");
  }

  // 6. Check database expiry
  if (
    storedToken.expires_at.getTime() <=
    Date.now()
  ) {
    throw new Error("Refresh token has expired");
  }

  // 7. Load the user
  const user = await findUserById(
    payload.userId,
  );

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.is_active) {
    throw new Error("User account is inactive");
  }

  // 8. Load current roles
  const roles = await findUserRoles(user.id);

  // 9. Rotate the refresh token
  await revokeRefreshToken(storedToken.id);

  const newAccessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    roles,
    type: "access",
  });

  const newRefreshToken = generateRefreshToken({
    userId: user.id,
    type: "refresh",
  });

  const newRefreshTokenHash =
    hashRefreshToken(newRefreshToken);

  const newRefreshTokenExpiresAt =
    getRefreshTokenExpiryDate();

  await createRefreshToken(
    user.id,
    newRefreshTokenHash,
    newRefreshTokenExpiresAt,
  );

  // 10. Return new tokens and safe user information
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.is_active,
      roles,
    },
  };
};

export const logoutUser = async (
  refreshToken: string | undefined,
): Promise<void> => {
  if (!refreshToken) {
    return;
  }

  const tokenHash = hashRefreshToken(
    refreshToken,
  );

  const storedToken =
    await findRefreshTokenByHash(tokenHash);

  if (!storedToken) {
    return;
  }

  await revokeRefreshToken(
    storedToken.id,
  );
};
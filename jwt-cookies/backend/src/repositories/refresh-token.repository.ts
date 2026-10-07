import { pool } from "../db/pool.js";

export interface RefreshTokenRecord {
  id: number;
  user_id: number;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
  created_at: Date;
}

export const createRefreshToken = async (
  userId: number,
  tokenHash: string,
  expiresAt: Date,
): Promise<RefreshTokenRecord> => {
  const result = await pool.query<RefreshTokenRecord>(
    `
    INSERT INTO refresh_tokens_advaitecs_jwt_cookies
      (
        user_id,
        token_hash,
        expires_at
      )
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      user_id,
      token_hash,
      expires_at,
      revoked_at,
      created_at
    `,
    [
      userId,
      tokenHash,
      expiresAt,
    ],
  );

  return result.rows[0];
};

export const findRefreshTokenByHash = async (
  tokenHash: string,
): Promise<RefreshTokenRecord | null> => {
  const result = await pool.query<RefreshTokenRecord>(
    `
    SELECT
      id,
      user_id,
      token_hash,
      expires_at,
      revoked_at,
      created_at
    FROM refresh_tokens_advaitecs_jwt_cookies
    WHERE token_hash = $1
    `,
    [tokenHash],
  );

  return result.rows[0] ?? null;
};

export const revokeRefreshToken = async (
  tokenId: number,
): Promise<void> => {
  await pool.query(
    `
    UPDATE refresh_tokens_advaitecs_jwt_cookies
    SET revoked_at = CURRENT_TIMESTAMP
    WHERE id = $1
      AND revoked_at IS NULL
    `,
    [tokenId],
  );
};

export const revokeAllUserRefreshTokens = async (
  userId: number,
): Promise<void> => {
  await pool.query(
    `
    UPDATE refresh_tokens_advaitecs_jwt_cookies
    SET revoked_at = CURRENT_TIMESTAMP
    WHERE user_id = $1
      AND revoked_at IS NULL
    `,
    [userId],
  );
};
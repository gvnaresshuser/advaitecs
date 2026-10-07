import { pool } from "../db/pool.js";

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export const findUserByEmail = async (
  email: string,
): Promise<UserRecord | null> => {
  const result = await pool.query<UserRecord>(
    `
    SELECT
      id,
      name,
      email,
      password_hash,
      is_active,
      created_at,
      updated_at
    FROM users_advaitecs_jwt_cookies
    WHERE email = $1
    `,
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserById = async (
  userId: number,
): Promise<UserRecord | null> => {
  const result = await pool.query<UserRecord>(
    `
    SELECT
      id,
      name,
      email,
      password_hash,
      is_active,
      created_at,
      updated_at
    FROM users_advaitecs_jwt_cookies
    WHERE id = $1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
};

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string,
): Promise<UserRecord> => {
  const result = await pool.query<UserRecord>(
    `
    INSERT INTO users_advaitecs_jwt_cookies
      (name, email, password_hash)
    VALUES
      ($1, $2, $3)
    RETURNING
      id,
      name,
      email,
      password_hash,
      is_active,
      created_at,
      updated_at
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
};

export const assignRoleToUser = async (
  userId: number,
  roleName: string,
): Promise<void> => {
  await pool.query(
    `
    INSERT INTO user_roles_advaitecs_jwt_cookies
      (user_id, role_id)
    SELECT
      $1,
      id
    FROM roles_advaitecs_jwt_cookies
    WHERE name = $2
    ON CONFLICT (user_id, role_id) DO NOTHING
    `,
    [userId, roleName],
  );
};

export const findUserRoles = async (
  userId: number,
): Promise<string[]> => {
  const result = await pool.query<{ name: string }>(
    `
    SELECT r.name
    FROM roles_advaitecs_jwt_cookies r
    INNER JOIN user_roles_advaitecs_jwt_cookies ur
      ON ur.role_id = r.id
    WHERE ur.user_id = $1
    ORDER BY r.name
    `,
    [userId],
  );

  return result.rows.map((row) => row.name);
};
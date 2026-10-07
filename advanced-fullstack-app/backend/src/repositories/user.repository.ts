import { pool } from "../db/pool.js";

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export interface UserWithRoles {
  id: string;
  name: string;
  email: string;
  role_name: string | null;
}

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  created_at: Date;
}

export const userRepository = {
  async findAll(): Promise<UserListItem[]> {
    const result = await pool.query<UserListItem>(
      `
      SELECT
        id,
        name,
        email,
        created_at
      FROM users_adviatecs
      ORDER BY created_at DESC
      `,
    );

    return result.rows;
  },

  async findById(id: string): Promise<User | null> {
    const result = await pool.query<User>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at,
        updated_at
      FROM users_adviatecs
      WHERE id = $1
      `,
      [id],
    );

    return result.rows[0] ?? null;
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<User>(
      `
      SELECT
        id,
        name,
        email,
        password_hash,
        created_at,
        updated_at
      FROM users_adviatecs
      WHERE email = $1
      `,
      [email],
    );

    return result.rows[0] ?? null;
  },

  async createUser(
  name: string,
  email: string,
  passwordHash: string,
): Promise<User> {
  const result = await pool.query<User>(
    `
    INSERT INTO users_adviatecs (
      name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,
      email,
      password_hash,
      created_at,
      updated_at
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
},

  async findUsersWithProfiles(): Promise<UserWithProfile[]> {
    const result = await pool.query<UserWithProfile>(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        up.phone,
        up.bio,
        up.avatar_url
      FROM users_adviatecs u
      LEFT JOIN user_profiles_adviatecs up
        ON up.user_id = u.id
      ORDER BY u.name
      `,
    );

    return result.rows;
  },

  async findUsersWithRoles(): Promise<UserWithRoles[]> {
    const result = await pool.query<UserWithRoles>(
      `
      SELECT
        u.id,
        u.name,
        u.email,
        r.name AS role_name
      FROM users_adviatecs u
      LEFT JOIN user_roles_adviatecs ur
        ON ur.user_id = u.id
      LEFT JOIN roles_adviatecs r
        ON r.id = ur.role_id
      ORDER BY u.name
      `,
    );

    return result.rows;
  },

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<UserListItem[]> {
    const offset = (page - 1) * limit;

    const result = await pool.query<UserListItem>(
      `
      SELECT
        id,
        name,
        email,
        created_at
      FROM users_adviatecs
      ORDER BY created_at DESC
      LIMIT $1
      OFFSET $2
      `,
      [limit, offset],
    );

    return result.rows;
  },

  async countUsers(): Promise<number> {
    const result = await pool.query<{ count: string }>(
      `
      SELECT COUNT(*) AS count
      FROM users_adviatecs
      `,
    );

    return Number(result.rows[0].count);
  },

  async updateUser(id:string,name:string,email:string):Promise<User>{
  const result=await pool.query<User>(`
    UPDATE users_adviatecs
    SET name=$1,email=$2,updated_at=NOW()
    WHERE id=$3
    RETURNING id,name,email,password_hash,created_at,updated_at
  `,[name,email,id]);
  return result.rows[0];
},

async deleteUser(id:string):Promise<boolean>{
  const result=await pool.query(`
    DELETE FROM users_adviatecs
    WHERE id=$1
    RETURNING id
  `,[id]);
  return result.rowCount===1;
},
};
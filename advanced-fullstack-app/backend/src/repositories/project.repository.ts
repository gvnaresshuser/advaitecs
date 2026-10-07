import { pool } from "../db/pool.js";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectWithOwner {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  owner_name: string;
  owner_email: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProjectMember {
  project_id: string;
  project_name: string;
  user_id: string;
  user_name: string;
  user_email: string;
  joined_at: Date;
}

export interface ProjectSummary {
  project_id: string;
  project_name: string;
  owner_name: string;
  member_count: string;
  task_count: string;
}

export interface ProjectTaskSummary {
  project_id: string;
  project_name: string;
  task_count: string;
}

export const projectRepository = {
  // ---------------------------------------------------------
  // Create project
  // ---------------------------------------------------------

  async create(
    name: string,
    description: string | null,
    ownerId: string,
  ): Promise<Project> {
    const result = await pool.query<Project>(
      `
      INSERT INTO projects_adviatecs
        (name, description, owner_id)
      VALUES
        ($1, $2, $3)
      RETURNING
        id,
        name,
        description,
        owner_id,
        created_at,
        updated_at
      `,
      [name, description, ownerId],
    );

    return result.rows[0];
  },

  // ---------------------------------------------------------
  // Get all projects
  // ---------------------------------------------------------

async findAll(): Promise<ProjectWithOwner[]> {
  const result = await pool.query<ProjectWithOwner>(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      p.created_at,
      p.updated_at
    FROM projects_adviatecs p
    INNER JOIN users_adviatecs u
      ON u.id = p.owner_id
    ORDER BY p.created_at DESC
    `,
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Get project by ID
  // ---------------------------------------------------------

async findById(id: string): Promise<ProjectWithOwner | null> {
  const result = await pool.query<ProjectWithOwner>(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      p.created_at,
      p.updated_at
    FROM projects_adviatecs p
    INNER JOIN users_adviatecs u
      ON u.id = p.owner_id
    WHERE p.id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
},

  // ---------------------------------------------------------
  // Update project
  // Owner protection is handled using owner_id
  // ---------------------------------------------------------

  async update(
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
  ): Promise<Project | null> {
    const result = await pool.query<Project>(
      `
      UPDATE projects_adviatecs
      SET
        name = $1,
        description = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE
        id = $3
        AND owner_id = $4
      RETURNING
        id,
        name,
        description,
        owner_id,
        created_at,
        updated_at
      `,
      [name, description, id, ownerId],
    );

    return result.rows[0] ?? null;
  },

  // ---------------------------------------------------------
  // Delete project
  // Owner protection is handled using owner_id
  // ---------------------------------------------------------

  async delete(
    id: string,
    ownerId: string,
  ): Promise<Project | null> {
    const result = await pool.query<Project>(
      `
      DELETE FROM projects_adviatecs
      WHERE
        id = $1
        AND owner_id = $2
      RETURNING
        id,
        name,
        description,
        owner_id,
        created_at,
        updated_at
      `,
      [id, ownerId],
    );

    return result.rows[0] ?? null;
  },

  // ---------------------------------------------------------
  // Projects with their owners
  // INNER JOIN
  // ---------------------------------------------------------

  async findProjectsWithOwners(): Promise<ProjectWithOwner[]> {
    const result = await pool.query<ProjectWithOwner>(
      `
      SELECT
        p.id,
        p.name,
        p.description,
        u.name AS owner_name,
        u.email AS owner_email
      FROM projects_adviatecs p
      INNER JOIN users_adviatecs u
        ON u.id = p.owner_id
      ORDER BY p.name
      `,
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Project members
  // Many-to-many relationship
  // ---------------------------------------------------------

  async findMembers(projectId: string): Promise<ProjectMember[]> {
    const result = await pool.query<ProjectMember>(
      `
      SELECT
        p.id AS project_id,
        p.name AS project_name,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        pm.joined_at
      FROM project_members_adviatecs pm
      INNER JOIN projects_adviatecs p
        ON p.id = pm.project_id
      INNER JOIN users_adviatecs u
        ON u.id = pm.user_id
      WHERE p.id = $1
      ORDER BY u.name
      `,
      [projectId],
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Project summary
  // LEFT JOIN
  // COUNT
  // GROUP BY
  // ---------------------------------------------------------

  async getProjectSummary(): Promise<ProjectSummary[]> {
    const result = await pool.query<ProjectSummary>(
      `
      SELECT
        p.id AS project_id,
        p.name AS project_name,
        u.name AS owner_name,
        COUNT(DISTINCT pm.user_id) AS member_count,
        COUNT(DISTINCT t.id) AS task_count
      FROM projects_adviatecs p
      INNER JOIN users_adviatecs u
        ON u.id = p.owner_id
      LEFT JOIN project_members_adviatecs pm
        ON pm.project_id = p.id
      LEFT JOIN tasks_adviatecs t
        ON t.project_id = p.id
      GROUP BY
        p.id,
        p.name,
        u.name
      ORDER BY p.name
      `,
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Projects having more than specified number of tasks
  // GROUP BY
  // HAVING
  // COUNT
  // ---------------------------------------------------------

  async findProjectsWithMinimumTasks(
    minimumTasks: number,
  ): Promise<ProjectTaskSummary[]> {
    const result = await pool.query<ProjectTaskSummary>(
      `
      SELECT
        p.id AS project_id,
        p.name AS project_name,
        COUNT(t.id) AS task_count
      FROM projects_adviatecs p
      LEFT JOIN tasks_adviatecs t
        ON t.project_id = p.id
      GROUP BY
        p.id,
        p.name
      HAVING COUNT(t.id) >= $1
      ORDER BY task_count DESC
      `,
      [minimumTasks],
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Search projects
  // ---------------------------------------------------------

async search(searchTerm: string): Promise<ProjectWithOwner[]> {
  const result = await pool.query<ProjectWithOwner>(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      p.created_at,
      p.updated_at
    FROM projects_adviatecs p
    INNER JOIN users_adviatecs u
      ON u.id = p.owner_id
    WHERE
      p.name ILIKE $1
      OR p.description ILIKE $1
    ORDER BY p.name
    `,
    [`%${searchTerm}%`],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Paginated projects
  // ---------------------------------------------------------

 async findPaginated(
  page: number,
  limit: number,
): Promise<ProjectWithOwner[]> {
  const offset = (page - 1) * limit;

  const result = await pool.query<ProjectWithOwner>(
    `
    SELECT
      p.id,
      p.name,
      p.description,
      p.owner_id,
      u.name AS owner_name,
      u.email AS owner_email,
      p.created_at,
      p.updated_at
    FROM projects_adviatecs p
    INNER JOIN users_adviatecs u
      ON u.id = p.owner_id
    ORDER BY p.created_at DESC
    LIMIT $1
    OFFSET $2
    `,
    [limit, offset],
  );

  return result.rows;
},
  // ---------------------------------------------------------
  // Count projects
  // ---------------------------------------------------------

  async countProjects(): Promise<number> {
    const result = await pool.query<{ count: string }>(
      `
      SELECT COUNT(*) AS count
      FROM projects_adviatecs
      `,
    );

    return Number(result.rows[0].count);
  },
};
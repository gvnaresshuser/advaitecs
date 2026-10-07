import { pool } from "../db/pool.js";

export interface Task {
  id: string;
  project_id: string;
  assigned_to: string | null;
  created_by: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface TaskWithDetails {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  project_name: string;
  assigned_to: string | null;
  assigned_user_name: string | null;
  assigned_user_email: string | null;
  created_by: string | null;
  creator_name: string | null;
  creator_email: string | null;
}

export interface TaskComment {
  task_id: string;
  task_title: string;
  comment: string;
  commented_by: string;
  commented_at: Date;
}

export interface TaskStatusSummary {
  status: string;
  task_count: string;
}

export interface TaskPrioritySummary {
  priority: string;
  task_count: string;
}

export const taskRepository = {
  // ---------------------------------------------------------
  // Get all tasks
  // ---------------------------------------------------------

async findAll(): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    FROM tasks_adviatecs
    ORDER BY created_at DESC
    `,
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Get task by ID
  // ---------------------------------------------------------

  async findById(id: string): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    FROM tasks_adviatecs
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ?? null;
},

  // ---------------------------------------------------------
  // Get tasks with project and assigned user
  //
  // Demonstrates:
  // INNER JOIN
  // LEFT JOIN
  // ---------------------------------------------------------

async findTasksWithDetails(): Promise<TaskWithDetails[]> {
  const result = await pool.query<TaskWithDetails>(
    `
    SELECT
      t.id,
      t.title,
      t.description,
      t.status,
      t.priority,
      t.due_date,
      t.created_by,
      creator.name AS creator_name,
      creator.email AS creator_email,
      p.name AS project_name,
      u.id AS assigned_to,
      u.name AS assigned_user_name,
      u.email AS assigned_user_email
    FROM tasks_adviatecs t
    INNER JOIN projects_adviatecs p
      ON p.id = t.project_id
    LEFT JOIN users_adviatecs u
      ON u.id = t.assigned_to
    LEFT JOIN users_adviatecs creator
      ON creator.id = t.created_by
    ORDER BY t.created_at DESC
    `,
  );

  return result.rows;
},
  // ---------------------------------------------------------
  // Get tasks belonging to a project
  // ---------------------------------------------------------

async findByProjectId(projectId: string): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    FROM tasks_adviatecs
    WHERE project_id = $1
    ORDER BY due_date NULLS LAST
    `,
    [projectId],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Get tasks assigned to a user
  // ---------------------------------------------------------

async findByAssignedUser(userId: string): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    FROM tasks_adviatecs
    WHERE assigned_to = $1
    ORDER BY due_date NULLS LAST
    `,
    [userId],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Filter tasks
  //
  // status + priority
  // ---------------------------------------------------------

async findByStatusAndPriority(
  status: string,
  priority: string,
): Promise<Task[]> {
  const result = await pool.query<Task>(
    `
    SELECT
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date,
      created_at,
      updated_at
    FROM tasks_adviatecs
    WHERE status = $1
      AND priority = $2
    ORDER BY due_date NULLS LAST
    `,
    [status, priority],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Search tasks
  // ---------------------------------------------------------

async search(searchTerm: string): Promise<TaskWithDetails[]> {
  const result = await pool.query<TaskWithDetails>(
    `
    SELECT
      t.id,
      t.title,
      t.description,
      t.status,
      t.priority,
      t.due_date::text AS due_date,
      p.name AS project_name,
      u.id AS assigned_to,
      u.name AS assigned_user_name,
      u.email AS assigned_user_email,
      t.created_by,
      creator.name AS creator_name,
      creator.email AS creator_email
    FROM tasks_adviatecs t
    INNER JOIN projects_adviatecs p
      ON p.id = t.project_id
    LEFT JOIN users_adviatecs u
      ON u.id = t.assigned_to
    LEFT JOIN users_adviatecs creator
      ON creator.id = t.created_by
    WHERE
      t.title ILIKE $1
      OR t.description ILIKE $1
    ORDER BY t.title
    `,
    [`%${searchTerm}%`],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------

async findPaginated(
  page: number,
  limit: number,
  userId: string,
): Promise<Task[]> {
  const offset = (page - 1) * limit;

  const result = await pool.query<Task>(
    `
    SELECT
      t.id,
      t.project_id,
      t.assigned_to,
      t.created_by,
      t.title,
      t.description,
      t.status,
      t.priority,
      t.due_date::text AS due_date,
      t.created_at,
      t.updated_at,
      p.name AS project_name,
      assigned_user.name AS assigned_user_name,
      assigned_user.email AS assigned_user_email,
      creator.name AS creator_name,
      creator.email AS creator_email
    FROM tasks_adviatecs t
    INNER JOIN projects_adviatecs p
      ON p.id = t.project_id
    LEFT JOIN users_adviatecs assigned_user
      ON assigned_user.id = t.assigned_to
    LEFT JOIN users_adviatecs creator
      ON creator.id = t.created_by
    WHERE t.assigned_to = $1
       OR t.created_by = $1
    ORDER BY t.created_at DESC
    LIMIT $2
    OFFSET $3
    `,
    [userId, limit, offset],
  );

  return result.rows;
},

  // ---------------------------------------------------------
  // Count all tasks
  // ---------------------------------------------------------

async countTasks(userId: string): Promise<number> {
  const result = await pool.query<{ count: string }>(
    `
    SELECT COUNT(*) AS count
    FROM tasks_adviatecs
    WHERE assigned_to = $1
       OR created_by = $1
    `,
    [userId],
  );

  return Number(result.rows[0].count);
},

  // ---------------------------------------------------------
  // Task status summary
  //
  // Demonstrates:
  // GROUP BY
  // COUNT
  // ---------------------------------------------------------

  async getStatusSummary(): Promise<TaskStatusSummary[]> {
    const result = await pool.query<TaskStatusSummary>(
      `
      SELECT
        status,
        COUNT(*) AS task_count
      FROM tasks_adviatecs
      GROUP BY status
      ORDER BY task_count DESC
      `,
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Task priority summary
  // ---------------------------------------------------------

  async getPrioritySummary(): Promise<TaskPrioritySummary[]> {
    const result = await pool.query<TaskPrioritySummary>(
      `
      SELECT
        priority,
        COUNT(*) AS task_count
      FROM tasks_adviatecs
      GROUP BY priority
      ORDER BY task_count DESC
      `,
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Tasks with comments
  //
  // Demonstrates:
  // LEFT JOIN
  // multiple relationships
  // ---------------------------------------------------------

  async findTasksWithComments(): Promise<TaskComment[]> {
    const result = await pool.query<TaskComment>(
      `
      SELECT
        t.id AS task_id,
        t.title AS task_title,
        c.content AS comment,
        u.name AS commented_by,
        c.created_at AS commented_at

      FROM tasks_adviatecs t

      LEFT JOIN comments_adviatecs c
        ON c.task_id = t.id

      LEFT JOIN users_adviatecs u
        ON u.id = c.user_id

      ORDER BY
        t.title,
        c.created_at
      `,
    );

    return result.rows;
  },

  // ---------------------------------------------------------
  // Projects having at least N tasks
  //
  // Demonstrates:
  // GROUP BY
  // HAVING
  // COUNT
  // JOIN
  // ---------------------------------------------------------

  async findProjectsWithMinimumTasks(
    minimumTasks: number,
  ): Promise<TaskStatusSummary[]> {
    const result = await pool.query<TaskStatusSummary>(
      `
      SELECT
        p.name AS status,
        COUNT(t.id) AS task_count

      FROM projects_adviatecs p

      INNER JOIN tasks_adviatecs t
        ON t.project_id = p.id

      GROUP BY p.id, p.name

      HAVING COUNT(t.id) >= $1

      ORDER BY task_count DESC
      `,
      [minimumTasks],
    );

    return result.rows;
  },
  async create(
  projectId: string,
  assignedTo: string | null,
  createdBy: string,
  title: string,
  description: string | null,
  status: string,
  priority: string,
  dueDate: string | null,
): Promise<Task> {
  const result = await pool.query<Task>(
    `
    INSERT INTO tasks_adviatecs (
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    `,
    [
      projectId,
      assignedTo,
      createdBy,
      title,
      description,
      status,
      priority,
      dueDate,
    ],
  );

  return result.rows[0];
},

async update(
  id: string,
  createdBy: string,
  assignedTo: string | null,
  title: string,
  description: string | null,
  status: string,
  priority: string,
  dueDate: string | null,
): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
    UPDATE tasks_adviatecs
    SET
      assigned_to = $1,
      title = $2,
      description = $3,
      status = $4,
      priority = $5,
      due_date = $6,
      updated_at = NOW()
    WHERE id = $7
      AND created_by = $8
    RETURNING
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date::text AS due_date,
      created_at,
      updated_at
    `,
    [
      assignedTo,
      title,
      description,
      status,
      priority,
      dueDate,
      id,
      createdBy,
    ],
  );

  return result.rows[0] ?? null;
},

async delete(
  id: string,
  createdBy: string,
): Promise<Task | null> {
  const result = await pool.query<Task>(
    `
    DELETE FROM tasks_adviatecs
    WHERE id = $1
      AND created_by = $2
    RETURNING
      id,
      project_id,
      assigned_to,
      created_by,
      title,
      description,
      status,
      priority,
      due_date,
      created_at,
      updated_at
    `,
    [id, createdBy],
  );

  return result.rows[0] ?? null;
},
};
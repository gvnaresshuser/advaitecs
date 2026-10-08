import { pool } from "../db/pool";

export const getAllDepartments = async () => {
  const result = await pool.query(`
    SELECT
      department_id,
      department_name
    FROM departments_advaitecs_advpgsql
    ORDER BY department_id
  `);

  return result.rows;
};
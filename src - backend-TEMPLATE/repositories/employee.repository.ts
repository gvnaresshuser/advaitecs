import { pool } from "../db/pool";

// Get all employees
export const getAllEmployees = async () => {
  const result = await pool.query(`
    SELECT
      employee_id,
      employee_name,
      email,
      salary,
      department_id
    FROM employees_advaitecs_advpgsql
    ORDER BY employee_id
  `);

  return result.rows;
};

// INNER JOIN
export const getEmployeesWithDepartments = async () => {
  const result = await pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      e.email,
      e.salary,
      d.department_name
    FROM employees_advaitecs_advpgsql e
    INNER JOIN departments_advaitecs_advpgsql d
      ON e.department_id = d.department_id
    ORDER BY e.employee_id
  `);

  return result.rows;
};

// LEFT JOIN
export const getDepartmentsWithEmployees = async () => {
  const result = await pool.query(`
    SELECT
      d.department_id,
      d.department_name,
      e.employee_id,
      e.employee_name,
      e.salary
    FROM departments_advaitecs_advpgsql d
    LEFT JOIN employees_advaitecs_advpgsql e
      ON d.department_id = e.department_id
    ORDER BY d.department_id, e.employee_id
  `);

  return result.rows;
};

// Aggregate + GROUP BY
export const getDepartmentStatistics = async () => {
  const result = await pool.query(`
    SELECT
      d.department_id,
      d.department_name,
      COUNT(e.employee_id) AS employee_count,
      ROUND(AVG(e.salary), 2) AS average_salary,
      MIN(e.salary) AS minimum_salary,
      MAX(e.salary) AS maximum_salary
    FROM departments_advaitecs_advpgsql d
    LEFT JOIN employees_advaitecs_advpgsql e
      ON d.department_id = e.department_id
    GROUP BY
      d.department_id,
      d.department_name
    ORDER BY d.department_id
  `);

  return result.rows;
};

// GROUP BY + HAVING
export const getDepartmentsHavingMoreThanOneEmployee = async () => {
  const result = await pool.query(`
    SELECT
      d.department_name,
      COUNT(e.employee_id) AS employee_count
    FROM departments_advaitecs_advpgsql d
    INNER JOIN employees_advaitecs_advpgsql e
      ON d.department_id = e.department_id
    GROUP BY d.department_id, d.department_name
    HAVING COUNT(e.employee_id) > 1
    ORDER BY employee_count DESC
  `);

  return result.rows;
};

// Pagination
export const getEmployeesPaginated = async (
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;

  const dataResult = await pool.query(
    `
      SELECT
        employee_id,
        employee_name,
        email,
        salary,
        department_id
      FROM employees_advaitecs_advpgsql
      ORDER BY employee_id
      LIMIT $1
      OFFSET $2
    `,
    [limit, offset]
  );

  const countResult = await pool.query(`
    SELECT COUNT(*) AS total_records
    FROM employees_advaitecs_advpgsql
  `);

  const totalRecords = Number(
    countResult.rows[0].total_records
  );

  const totalPages = Math.ceil(
    totalRecords / limit
  );

  return {
    data: dataResult.rows,
    pagination: {
      page,
      limit,
      totalRecords,
      totalPages,
    },
  };
};

// Search employee by email
export const getEmployeeByEmail = async (
  email: string
) => {
  const result = await pool.query(
    `
      SELECT
        employee_id,
        employee_name,
        email,
        salary,
        department_id
      FROM employees_advaitecs_advpgsql
      WHERE email = $1
    `,
    [email]
  );

  return result.rows;
};

// EXPLAIN ANALYZE
export const explainEmployeeNameSearch = async (
  employeeName: string
) => {
  const result = await pool.query(
    `
      EXPLAIN ANALYZE
      SELECT
        employee_id,
        employee_name,
        email,
        salary
      FROM employees_advaitecs_advpgsql
      WHERE employee_name = $1
    `,
    [employeeName]
  );

  return result.rows;
};
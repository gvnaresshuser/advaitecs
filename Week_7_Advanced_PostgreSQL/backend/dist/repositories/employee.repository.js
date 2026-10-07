"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesPaginated = exports.getDepartmentsHavingMoreThanOneEmployee = exports.getDepartmentStatistics = exports.getDepartmentsWithEmployees = exports.getEmployeesWithDepartments = exports.getAllEmployees = void 0;
const pool_1 = require("../db/pool");
// Get all employees
const getAllEmployees = async () => {
    const result = await pool_1.pool.query(`
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
exports.getAllEmployees = getAllEmployees;
// INNER JOIN
const getEmployeesWithDepartments = async () => {
    const result = await pool_1.pool.query(`
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
exports.getEmployeesWithDepartments = getEmployeesWithDepartments;
// LEFT JOIN
const getDepartmentsWithEmployees = async () => {
    const result = await pool_1.pool.query(`
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
exports.getDepartmentsWithEmployees = getDepartmentsWithEmployees;
// Aggregate + GROUP BY
const getDepartmentStatistics = async () => {
    const result = await pool_1.pool.query(`
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
exports.getDepartmentStatistics = getDepartmentStatistics;
// GROUP BY + HAVING
const getDepartmentsHavingMoreThanOneEmployee = async () => {
    const result = await pool_1.pool.query(`
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
exports.getDepartmentsHavingMoreThanOneEmployee = getDepartmentsHavingMoreThanOneEmployee;
// Pagination
const getEmployeesPaginated = async (page, limit) => {
    const offset = (page - 1) * limit;
    const dataResult = await pool_1.pool.query(`
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
    `, [limit, offset]);
    const countResult = await pool_1.pool.query(`
    SELECT COUNT(*) AS total_records
    FROM employees_advaitecs_advpgsql
  `);
    const totalRecords = Number(countResult.rows[0].total_records);
    const totalPages = Math.ceil(totalRecords / limit);
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
exports.getEmployeesPaginated = getEmployeesPaginated;
//# sourceMappingURL=employee.repository.js.map
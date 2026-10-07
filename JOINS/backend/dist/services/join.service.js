"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeDepartmentProjects = exports.getEmployeeProjects = exports.getDepartmentsWithoutEmployees = exports.getEmployeesWithoutDepartment = exports.getSelfJoin = exports.getNaturalJoin = exports.getCrossJoin = exports.getFullOuterJoin = exports.getRightJoin = exports.getLeftJoin = exports.getInnerJoin = void 0;
const pool_js_1 = require("../db/pool.js");
// ============================================================
// INNER JOIN
// ============================================================
const getInnerJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_id,
      d.department_name
    FROM employees_advaitecs_joins e
    INNER JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    ORDER BY e.employee_id
  `);
    return result.rows;
};
exports.getInnerJoin = getInnerJoin;
// ============================================================
// LEFT JOIN
// ============================================================
const getLeftJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_id,
      d.department_name
    FROM employees_advaitecs_joins e
    LEFT JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    ORDER BY e.employee_id
  `);
    return result.rows;
};
exports.getLeftJoin = getLeftJoin;
// ============================================================
// RIGHT JOIN
// ============================================================
const getRightJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_id,
      d.department_name
    FROM employees_advaitecs_joins e
    RIGHT JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    ORDER BY d.department_id
  `);
    return result.rows;
};
exports.getRightJoin = getRightJoin;
// ============================================================
// FULL OUTER JOIN
// ============================================================
const getFullOuterJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_id,
      d.department_name
    FROM employees_advaitecs_joins e
    FULL OUTER JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    ORDER BY
      d.department_id NULLS LAST,
      e.employee_id NULLS LAST
  `);
    return result.rows;
};
exports.getFullOuterJoin = getFullOuterJoin;
// ============================================================
// CROSS JOIN
// ============================================================
const getCrossJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_name,
      d.department_name
    FROM employees_advaitecs_joins e
    CROSS JOIN departments_advaitecs_joins d
    ORDER BY
      e.employee_id,
      d.department_id
  `);
    return result.rows;
};
exports.getCrossJoin = getCrossJoin;
// ============================================================
// NATURAL JOIN
// ============================================================
const getNaturalJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      employee_name,
      project_name
    FROM employees_advaitecs_joins
    NATURAL LEFT JOIN
      employee_project_assignment_advaitecs_joins
    NATURAL LEFT JOIN
      projects_advaitecs_joins
    ORDER BY employee_id
  `);
    return result.rows;
};
exports.getNaturalJoin = getNaturalJoin;
// ============================================================
// SELF JOIN
// ============================================================
const getSelfJoin = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e1.department_id,
      e1.employee_name AS employee,
      e2.employee_name AS colleague
    FROM employees_advaitecs_joins e1
    LEFT JOIN employees_advaitecs_joins e2
      ON e1.department_id = e2.department_id
      AND e1.employee_id != e2.employee_id
    ORDER BY
      e1.department_id,
      e1.employee_id,
      e2.employee_id
  `);
    return result.rows;
};
exports.getSelfJoin = getSelfJoin;
// ============================================================
// EMPLOYEES WITHOUT DEPARTMENT
// ============================================================
const getEmployeesWithoutDepartment = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_name
    FROM employees_advaitecs_joins e
    LEFT JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    WHERE d.department_id IS NULL
    ORDER BY e.employee_id
  `);
    return result.rows;
};
exports.getEmployeesWithoutDepartment = getEmployeesWithoutDepartment;
// ============================================================
// DEPARTMENTS WITHOUT EMPLOYEES
// ============================================================
const getDepartmentsWithoutEmployees = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      d.department_id,
      d.department_name,
      e.employee_name
    FROM employees_advaitecs_joins e
    RIGHT JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    WHERE e.employee_id IS NULL
    ORDER BY d.department_id
  `);
    return result.rows;
};
exports.getDepartmentsWithoutEmployees = getDepartmentsWithoutEmployees;
// ============================================================
// EMPLOYEE + PROJECT
// ============================================================
const getEmployeeProjects = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      p.project_id,
      p.project_name,
      a.assignment_date
    FROM employees_advaitecs_joins e
    INNER JOIN employee_project_assignment_advaitecs_joins a
      ON e.employee_id = a.employee_id
    INNER JOIN projects_advaitecs_joins p
      ON a.project_id = p.project_id
    ORDER BY e.employee_id, p.project_id
  `);
    return result.rows;
};
exports.getEmployeeProjects = getEmployeeProjects;
// ============================================================
// EMPLOYEE + DEPARTMENT + PROJECT
// ============================================================
const getEmployeeDepartmentProjects = async () => {
    const result = await pool_js_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      d.department_name,
      p.project_name,
      a.assignment_date
    FROM employees_advaitecs_joins e
    LEFT JOIN departments_advaitecs_joins d
      ON e.department_id = d.department_id
    LEFT JOIN employee_project_assignment_advaitecs_joins a
      ON e.employee_id = a.employee_id
    LEFT JOIN projects_advaitecs_joins p
      ON a.project_id = p.project_id
    ORDER BY e.employee_id, p.project_id
  `);
    return result.rows;
};
exports.getEmployeeDepartmentProjects = getEmployeeDepartmentProjects;
//# sourceMappingURL=join.service.js.map
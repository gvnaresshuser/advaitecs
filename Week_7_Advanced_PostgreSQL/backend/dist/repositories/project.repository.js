"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeesWithProjects = exports.getAllProjects = void 0;
const pool_1 = require("../db/pool");
// Get all projects
const getAllProjects = async () => {
    const result = await pool_1.pool.query(`
    SELECT
      project_id,
      project_name,
      budget
    FROM projects_advaitecs_advpgsql
    ORDER BY project_id
  `);
    return result.rows;
};
exports.getAllProjects = getAllProjects;
// Many-to-many relationship
// Employees + Projects
const getEmployeesWithProjects = async () => {
    const result = await pool_1.pool.query(`
    SELECT
      e.employee_id,
      e.employee_name,
      p.project_id,
      p.project_name,
      p.budget
    FROM employee_projects_advaitecs_advpgsql ep
    INNER JOIN employees_advaitecs_advpgsql e
      ON ep.employee_id = e.employee_id
    INNER JOIN projects_advaitecs_advpgsql p
      ON ep.project_id = p.project_id
    ORDER BY e.employee_id, p.project_id
  `);
    return result.rows;
};
exports.getEmployeesWithProjects = getEmployeesWithProjects;
//# sourceMappingURL=project.repository.js.map
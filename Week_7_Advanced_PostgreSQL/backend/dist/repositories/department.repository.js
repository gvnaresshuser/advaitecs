"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDepartments = void 0;
const pool_1 = require("../db/pool");
const getAllDepartments = async () => {
    const result = await pool_1.pool.query(`
    SELECT
      department_id,
      department_name
    FROM departments_advaitecs_advpgsql
    ORDER BY department_id
  `);
    return result.rows;
};
exports.getAllDepartments = getAllDepartments;
//# sourceMappingURL=department.repository.js.map
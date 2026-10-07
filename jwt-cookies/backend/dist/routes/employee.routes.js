"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const router = (0, express_1.Router)();
router.get("/pagination", employee_controller_1.getEmployeesPaginated);
router.get("/", employee_controller_1.getEmployees);
router.get("/with-departments", employee_controller_1.getEmployeesWithDepartments);
router.get("/departments-with-employees", employee_controller_1.getDepartmentsWithEmployees);
router.get("/department-statistics", employee_controller_1.getDepartmentStatistics);
router.get("/departments-having-more-than-one", employee_controller_1.getDepartmentsHavingMoreThanOneEmployee);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map
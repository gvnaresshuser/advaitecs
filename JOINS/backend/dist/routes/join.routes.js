"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const join_controller_js_1 = require("../controllers/join.controller.js");
const router = (0, express_1.Router)();
// Basic JOIN demonstrations
router.get("/inner", join_controller_js_1.innerJoin);
router.get("/left", join_controller_js_1.leftJoin);
router.get("/right", join_controller_js_1.rightJoin);
router.get("/full", join_controller_js_1.fullOuterJoin);
router.get("/cross", join_controller_js_1.crossJoin);
router.get("/natural", join_controller_js_1.naturalJoin);
router.get("/self", join_controller_js_1.selfJoin);
// Special JOIN demonstrations
router.get("/employees-without-department", join_controller_js_1.employeesWithoutDepartment);
router.get("/departments-without-employees", join_controller_js_1.departmentsWithoutEmployees);
// Multi-table JOIN demonstrations
router.get("/employee-projects", join_controller_js_1.employeeProjects);
router.get("/employee-department-projects", join_controller_js_1.employeeDepartmentProjects);
exports.default = router;
//# sourceMappingURL=join.routes.js.map
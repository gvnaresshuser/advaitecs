"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
router.get("/", project_controller_1.getProjects);
router.get("/with-employees", project_controller_1.getEmployeesWithProjects);
exports.default = router;
//# sourceMappingURL=project.routes.js.map
import { Router } from "express";

import {
  innerJoin,
  leftJoin,
  rightJoin,
  fullOuterJoin,
  crossJoin,
  naturalJoin,
  selfJoin,
  employeesWithoutDepartment,
  departmentsWithoutEmployees,
  employeeProjects,
  employeeDepartmentProjects,
} from "../controllers/join.controller.js";

const router = Router();


// Basic JOIN demonstrations

router.get("/inner", innerJoin);

router.get("/left", leftJoin);

router.get("/right", rightJoin);

router.get("/full", fullOuterJoin);

router.get("/cross", crossJoin);

router.get("/natural", naturalJoin);

router.get("/self", selfJoin);


// Special JOIN demonstrations

router.get(
  "/employees-without-department",
  employeesWithoutDepartment
);

router.get(
  "/departments-without-employees",
  departmentsWithoutEmployees
);


// Multi-table JOIN demonstrations

router.get(
  "/employee-projects",
  employeeProjects
);

router.get(
  "/employee-department-projects",
  employeeDepartmentProjects
);


export default router;
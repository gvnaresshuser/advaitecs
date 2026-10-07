import { Router } from "express";

import {
  getEmployees,
  getEmployeesWithDepartments,
  getDepartmentsWithEmployees,
  getDepartmentStatistics,
  getDepartmentsHavingMoreThanOneEmployee,
  getEmployeesPaginated,
  getEmployeeByEmail,
  explainEmployeeNameSearch
} from "../controllers/employee.controller";

const router = Router();

router.get(
  "/explain-name",
  explainEmployeeNameSearch
);

router.get(
  "/search",
  getEmployeeByEmail
);

router.get("/pagination", getEmployeesPaginated);


router.get("/", getEmployees);

router.get(
  "/with-departments",
  getEmployeesWithDepartments
);

router.get(
  "/departments-with-employees",
  getDepartmentsWithEmployees
);

router.get(
  "/department-statistics",
  getDepartmentStatistics
);

router.get(
  "/departments-having-more-than-one",
  getDepartmentsHavingMoreThanOneEmployee
);

export default router;
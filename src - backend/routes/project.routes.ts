import { Router } from "express";

import {
  getProjects,
  getEmployeesWithProjects,
} from "../controllers/project.controller";

const router = Router();

router.get("/", getProjects);

router.get(
  "/with-employees",
  getEmployeesWithProjects
);

export default router;
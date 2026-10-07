import { Router } from "express";

import {
  getProjects,
  deleteProject,
} from "../controllers/project.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

// USER + ADMIN
router.get(
  "/",
  authenticate,
  getProjects,
);

// ADMIN only
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteProject,
);

export default router;
import { Router } from "express";

import { projectController } from "../controllers/project.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createProjectSchema,
  updateProjectSchema,
  projectSearchSchema,
  projectPaginationSchema,
  projectMinimumTasksSchema,
} from "../validators/project.validator.js";

const router = Router();

router.use(authMiddleware);

// ---------------------------------------------------------
// POST /api/projects
// ---------------------------------------------------------

router.post(
  "/",
  validate(createProjectSchema, "body"),
  projectController.createProject,
);

// ---------------------------------------------------------
// GET /api/projects
// ---------------------------------------------------------

router.get(
  "/",
  projectController.getAllProjects,
);

// ---------------------------------------------------------
// GET /api/projects/search?q=AI
// ---------------------------------------------------------

router.get(
  "/search",
  validate(projectSearchSchema, "query"),
  projectController.searchProjects,
);

// ---------------------------------------------------------
// GET /api/projects/pagination?page=1&limit=5
// ---------------------------------------------------------

router.get(
  "/pagination",
  validate(projectPaginationSchema, "query"),
  projectController.getProjectsPaginated,
);

// ---------------------------------------------------------
// GET /api/projects/owners
// ---------------------------------------------------------

router.get(
  "/owners",
  projectController.getProjectsWithOwners,
);

// ---------------------------------------------------------
// GET /api/projects/summary
// ---------------------------------------------------------

router.get(
  "/summary",
  projectController.getProjectSummary,
);

// ---------------------------------------------------------
// GET /api/projects/minimum-tasks?count=3
// ---------------------------------------------------------

router.get(
  "/minimum-tasks",
  validate(projectMinimumTasksSchema, "query"),
  projectController.getProjectsWithMinimumTasks,
);

// ---------------------------------------------------------
// GET /api/projects/:id/members
// ---------------------------------------------------------

router.get(
  "/:id/members",
  projectController.getProjectMembers,
);

// ---------------------------------------------------------
// GET /api/projects/:id
// ---------------------------------------------------------

router.get(
  "/:id",
  projectController.getProjectById,
);

// ---------------------------------------------------------
// PUT /api/projects/:id
// ---------------------------------------------------------

router.put(
  "/:id",
  validate(updateProjectSchema, "body"),
  projectController.updateProject,
);

// ---------------------------------------------------------
// DELETE /api/projects/:id
// ---------------------------------------------------------

router.delete(
  "/:id",
  projectController.deleteProject,
);

export default router;
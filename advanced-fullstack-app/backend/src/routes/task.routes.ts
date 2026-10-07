import { Router } from "express";

import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  taskFilterSchema,
  taskSearchSchema,
  taskPaginationSchema,
  taskMinimumTasksSchema,
    createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator.js";

const router = Router();

router.use(authMiddleware);

// ---------------------------------------------------------
// GET /api/tasks
// ---------------------------------------------------------

router.post(
  "/",
  validate(createTaskSchema, "body"),
  taskController.createTask,
);

router.put(
  "/:id",
  validate(updateTaskSchema, "body"),
  taskController.updateTask,
);

router.delete(
  "/:id",
  taskController.deleteTask,
);

router.get(
  "/",
  taskController.getAllTasks,
);

// ---------------------------------------------------------
// GET /api/tasks/search?q=API
// ---------------------------------------------------------

router.get(
  "/search",
  validate(taskSearchSchema, "query"),
  taskController.searchTasks,
);

// ---------------------------------------------------------
// GET /api/tasks/pagination?page=1&limit=5
// ---------------------------------------------------------

router.get(
  "/pagination",
  validate(taskPaginationSchema, "query"),
  taskController.getTasksPaginated,
);

// ---------------------------------------------------------
// GET /api/tasks/filter?status=DONE&priority=HIGH
// ---------------------------------------------------------

router.get(
  "/filter",
  validate(taskFilterSchema, "query"),
  taskController.getTasksByStatusAndPriority,
);

// ---------------------------------------------------------
// GET /api/tasks/project/:projectId
// ---------------------------------------------------------

router.get(
  "/project/:projectId",
  taskController.getTasksByProject,
);

// ---------------------------------------------------------
// GET /api/tasks/user/:userId
// ---------------------------------------------------------

router.get(
  "/user/:userId",
  taskController.getTasksByAssignedUser,
);

// ---------------------------------------------------------
// GET /api/tasks/details
// ---------------------------------------------------------

router.get(
  "/details",
  taskController.getTasksWithDetails,
);

// ---------------------------------------------------------
// GET /api/tasks/summary/status
// ---------------------------------------------------------

router.get(
  "/summary/status",
  taskController.getStatusSummary,
);

// ---------------------------------------------------------
// GET /api/tasks/summary/priority
// ---------------------------------------------------------

router.get(
  "/summary/priority",
  taskController.getPrioritySummary,
);

// ---------------------------------------------------------
// GET /api/tasks/comments
// ---------------------------------------------------------

router.get(
  "/comments",
  taskController.getTasksWithComments,
);

// ---------------------------------------------------------
// GET /api/tasks/projects/minimum?count=3
// ---------------------------------------------------------

router.get(
  "/projects/minimum",
  validate(taskMinimumTasksSchema, "query"),
  taskController.getProjectsWithMinimumTasks,
);

// ---------------------------------------------------------
// GET /api/tasks/:id
// ---------------------------------------------------------

router.get(
  "/:id",
  taskController.getTaskById,
);

export default router;
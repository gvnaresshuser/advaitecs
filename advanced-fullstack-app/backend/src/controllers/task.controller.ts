import type { Request, Response, NextFunction } from "express";

import { taskService } from "../services/task.service.js";

export const taskController = {
  // ---------------------------------------------------------
  // GET /api/tasks
  // ---------------------------------------------------------

  async getAllTasks(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const tasks = await taskService.getAllTasks();

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/:id
  // ---------------------------------------------------------

async getTaskById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/tasks/details
  // ---------------------------------------------------------

  async getTasksWithDetails(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const tasks =
        await taskService.getTasksWithDetails();

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/project/:projectId
  // ---------------------------------------------------------

  async getTasksByProject(
  req: Request<{ projectId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { projectId } = req.params;

    const tasks =
      await taskService.getTasksByProject(projectId);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/tasks/user/:userId
  // ---------------------------------------------------------

  async getTasksByAssignedUser(
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;

    const tasks =
      await taskService.getTasksByAssignedUser(userId);

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/tasks/filter?status=DONE&priority=HIGH
  // ---------------------------------------------------------

  async getTasksByStatusAndPriority(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const status = String(req.query.status ?? "");
      const priority = String(
        req.query.priority ?? "",
      );

      const tasks =
        await taskService.getTasksByStatusAndPriority(
          status,
          priority,
        );

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/search?q=API
  // ---------------------------------------------------------

  async searchTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const searchTerm = String(req.query.q ?? "");

      const tasks =
        await taskService.searchTasks(searchTerm);

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/pagination?page=1&limit=5
  // ---------------------------------------------------------

 async getTasksPaginated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const userId = req.user!.id;

    const result =
      await taskService.getTasksPaginated(
        page,
        limit,
        userId,
      );

    res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
},

  // ---------------------------------------------------------
  // GET /api/tasks/summary/status
  // ---------------------------------------------------------

  async getStatusSummary(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const summary =
        await taskService.getStatusSummary();

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/summary/priority
  // ---------------------------------------------------------

  async getPrioritySummary(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const summary =
        await taskService.getPrioritySummary();

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/comments
  // ---------------------------------------------------------

  async getTasksWithComments(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const tasks =
        await taskService.getTasksWithComments();

      res.json({
        success: true,
        data: tasks,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/tasks/projects/minimum?count=3
  // ---------------------------------------------------------

  async getProjectsWithMinimumTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const minimumTasks =
        Number(req.query.count);

      if (Number.isNaN(minimumTasks)) {
        res.status(400).json({
          success: false,
          message: "count must be a valid number",
        });
        return;
      }

      const projects =
        await taskService.getProjectsWithMinimumTasks(
          minimumTasks,
        );

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  async createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      projectId,
      assignedTo,
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const createdBy = req.user!.id;

    const task = await taskService.createTask(
      projectId,
      assignedTo ?? null,
      createdBy,
      title,
      description ?? null,
      status,
      priority,
      dueDate ?? null,
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
},

async updateTask(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    const {
      assignedTo,
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const createdBy = req.user!.id;

    const task = await taskService.updateTask(
      id,
      createdBy,
      assignedTo ?? null,
      title,
      description ?? null,
      status,
      priority,
      dueDate ?? null,
    );

    res.json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
},

async deleteTask(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const createdBy = req.user!.id;

    const task = await taskService.deleteTask(
      id,
      createdBy,
    );

    res.json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
},
};
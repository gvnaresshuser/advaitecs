import type { Request, Response, NextFunction } from "express";

import { projectService } from "../services/project.service.js";

export const projectController = {
  // ---------------------------------------------------------
  // POST /api/projects
  // ---------------------------------------------------------

  async createProject(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { name, description } = req.body;
      const ownerId = req.user!.id;

      const project =
        await projectService.createProject(
          name,
          description,
          ownerId,
        );

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects
  // ---------------------------------------------------------

  async getAllProjects(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const projects =
        await projectService.getAllProjects();

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/:id
  // ---------------------------------------------------------

  async getProjectById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const project =
        await projectService.getProjectById(id);

      res.json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // PUT /api/projects/:id
  // ---------------------------------------------------------

  async updateProject(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const ownerId = req.user!.id;

      const project =
        await projectService.updateProject(
          id,
          name,
          description,
          ownerId,
        );

      res.json({
        success: true,
        message: "Project updated successfully",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // DELETE /api/projects/:id
  // ---------------------------------------------------------

  async deleteProject(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const ownerId = req.user!.id;

      const project =
        await projectService.deleteProject(
          id,
          ownerId,
        );

      res.json({
        success: true,
        message: "Project deleted successfully",
        data: project,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/owners
  // ---------------------------------------------------------

  async getProjectsWithOwners(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const projects =
        await projectService.getProjectsWithOwners();

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/:id/members
  // ---------------------------------------------------------

  async getProjectMembers(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const members =
        await projectService.getProjectMembers(id);

      res.json({
        success: true,
        data: members,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/summary
  // ---------------------------------------------------------

  async getProjectSummary(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const summary =
        await projectService.getProjectSummary();

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/minimum-tasks?count=3
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
        await projectService.getProjectsWithMinimumTasks(
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

  // ---------------------------------------------------------
  // GET /api/projects/search?q=AI
  // ---------------------------------------------------------

  async searchProjects(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const searchTerm =
        String(req.query.q ?? "");

      const projects =
        await projectService.searchProjects(
          searchTerm,
        );

      res.json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  },

  // ---------------------------------------------------------
  // GET /api/projects/pagination?page=1&limit=5
  // ---------------------------------------------------------

  async getProjectsPaginated(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 10;

      const result =
        await projectService.getProjectsPaginated(
          page,
          limit,
        );

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },
};
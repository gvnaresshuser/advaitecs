import type { NextFunction, Request, Response } from "express";

export const getProjects = (
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(200).json({
    success: true,
    message: "Projects retrieved successfully",
    data: {
      projects: [],
    },
  });
};

export const deleteProject = (
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(200).json({
    success: true,
    message: `Project ${req.params.id} deleted successfully`,
  });
};
import { Request, Response } from "express";
import * as projectRepository from "../repositories/project.repository";

export const getProjects = async (
  _req: Request,
  res: Response
) => {
  try {
    const projects =
      await projectRepository.getAllProjects();

    res.json(projects);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch projects",
    });
  }
};

export const getEmployeesWithProjects = async (
  _req: Request,
  res: Response
) => {
  try {
    const data =
      await projectRepository.getEmployeesWithProjects();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees with projects",
    });
  }
};
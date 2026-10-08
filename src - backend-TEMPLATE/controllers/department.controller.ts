import { Request, Response } from "express";
import * as departmentRepository from "../repositories/department.repository";

export const getDepartments = async (
  _req: Request,
  res: Response
) => {
  try {
    const departments =
      await departmentRepository.getAllDepartments();

    res.json(departments);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch departments",
    });
  }
};
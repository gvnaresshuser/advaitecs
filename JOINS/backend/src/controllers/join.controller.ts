import type { Request, Response, NextFunction } from "express";

import {
  getInnerJoin,
  getLeftJoin,
  getRightJoin,
  getFullOuterJoin,
  getCrossJoin,
  getNaturalJoin,
  getSelfJoin,
  getEmployeesWithoutDepartment,
  getDepartmentsWithoutEmployees,
  getEmployeeProjects,
  getEmployeeDepartmentProjects,
} from "../services/join.service.js";


// ============================================================
// INNER JOIN
// ============================================================

export const innerJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getInnerJoin();

    res.json({
      join: "INNER JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// LEFT JOIN
// ============================================================

export const leftJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getLeftJoin();

    res.json({
      join: "LEFT JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// RIGHT JOIN
// ============================================================

export const rightJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getRightJoin();

    res.json({
      join: "RIGHT JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// FULL OUTER JOIN
// ============================================================

export const fullOuterJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getFullOuterJoin();

    res.json({
      join: "FULL OUTER JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// CROSS JOIN
// ============================================================

export const crossJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getCrossJoin();

    res.json({
      join: "CROSS JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// NATURAL JOIN
// ============================================================

export const naturalJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getNaturalJoin();

    res.json({
      join: "NATURAL JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// SELF JOIN
// ============================================================

export const selfJoin = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getSelfJoin();

    res.json({
      join: "SELF JOIN",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// EMPLOYEES WITHOUT DEPARTMENT
// ============================================================

export const employeesWithoutDepartment = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getEmployeesWithoutDepartment();

    res.json({
      join: "LEFT JOIN + IS NULL",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// DEPARTMENTS WITHOUT EMPLOYEES
// ============================================================

export const departmentsWithoutEmployees = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getDepartmentsWithoutEmployees();

    res.json({
      join: "RIGHT JOIN + IS NULL",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// EMPLOYEE PROJECTS
// ============================================================

export const employeeProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getEmployeeProjects();

    res.json({
      join: "EMPLOYEE + PROJECT",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// EMPLOYEE + DEPARTMENT + PROJECT
// ============================================================

export const employeeDepartmentProjects = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getEmployeeDepartmentProjects();

    res.json({
      join: "EMPLOYEE + DEPARTMENT + PROJECT",
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};
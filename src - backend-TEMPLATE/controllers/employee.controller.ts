import { Request, Response } from "express";
import * as employeeRepository from "../repositories/employee.repository";

export const getEmployees = async (
  _req: Request,
  res: Response
) => {
  try {
    const employees =
      await employeeRepository.getAllEmployees();

    res.json(employees);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

export const getEmployeesWithDepartments = async (
  _req: Request,
  res: Response
) => {
  try {
    const employees =
      await employeeRepository.getEmployeesWithDepartments();

    res.json(employees);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees with departments",
    });
  }
};

export const getDepartmentsWithEmployees = async (
  _req: Request,
  res: Response
) => {
  try {
    const data =
      await employeeRepository.getDepartmentsWithEmployees();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch departments with employees",
    });
  }
};

export const getDepartmentStatistics = async (
  _req: Request,
  res: Response
) => {
  try {
    const data =
      await employeeRepository.getDepartmentStatistics();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch department statistics",
    });
  }
};

export const getDepartmentsHavingMoreThanOneEmployee = async (
  _req: Request,
  res: Response
) => {
  try {
    const data =
      await employeeRepository
        .getDepartmentsHavingMoreThanOneEmployee();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch department HAVING report",
    });
  }
};

export const getEmployeesPaginated = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;

    const data =
      await employeeRepository.getEmployeesPaginated(
        page,
        limit
      );

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch paginated employees",
    });
  }
};

export const getEmployeeByEmail = async (
  req: Request,
  res: Response
) => {
  try {
    const email = String(req.query.email || "");

    if (!email) {
      res.status(400).json({
        message: "Email is required",
      });

      return;
    }

    const employee =
      await employeeRepository.getEmployeeByEmail(email);

    res.json(employee);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to search employee",
    });
  }
};
export const explainEmployeeNameSearch = async (
  req: Request,
  res: Response
) => {
  try {
    const employeeName = String(
      req.query.name || ""
    );

    if (!employeeName) {
      res.status(400).json({
        message: "Employee name is required",
      });

      return;
    }

    const result =
      await employeeRepository.explainEmployeeNameSearch(
        employeeName
      );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to execute EXPLAIN ANALYZE",
    });
  }
};
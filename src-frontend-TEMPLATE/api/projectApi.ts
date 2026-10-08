import api from "./axios";

export interface EmployeeWithProject {
  employee_id: number;
  employee_name: string;
  project_id: number;
  project_name: string;
  budget: number;
}

export const getEmployeesWithProjects =
  async (): Promise<EmployeeWithProject[]> => {
    const response = await api.get<EmployeeWithProject[]>(
      "/projects/with-employees"
    );

    return response.data;
  };
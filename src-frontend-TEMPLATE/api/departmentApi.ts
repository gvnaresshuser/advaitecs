import api from "./axios";

export interface Department {
  department_id: number;
  department_name: string;
}

export const getDepartments = async (): Promise<Department[]> => {
  const response = await api.get<Department[]>("/departments");

  return response.data;
};
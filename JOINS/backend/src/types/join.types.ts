export interface EmployeeDepartment {
  employee_id: number | null;
  employee_name: string | null;
  department_id: number | null;
  department_name: string | null;
}

export interface EmployeeProject {
  employee_id: number | null;
  employee_name: string | null;
  project_id: number | null;
  project_name: string | null;
}

export interface EmployeeColleague {
  department_id: number | null;
  employee: string | null;
  colleague: string | null;
}
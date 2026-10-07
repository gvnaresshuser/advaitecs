import api from "./axios";

export interface EmployeeWithDepartment {
  employee_id: number;
  employee_name: string;
  email: string;
  salary: number;
  department_name: string;
}

export const getEmployeesWithDepartments =
  async (): Promise<EmployeeWithDepartment[]> => {
    const response = await api.get<EmployeeWithDepartment[]>(
      "/employees/with-departments"
    );

    return response.data;
  };
  //-------------------------------------
  export interface DepartmentWithEmployee {
  department_id: number;
  department_name: string;
  employee_id: number | null;
  employee_name: string | null;
  salary: number | null;
}

export const getDepartmentsWithEmployees =
  async (): Promise<DepartmentWithEmployee[]> => {
    const response = await api.get<DepartmentWithEmployee[]>(
      "/employees/departments-with-employees"
    );

    return response.data;
  };
  //----------------------------------------------  
  export interface DepartmentStatistics {
  department_id: number;
  department_name: string;
  employee_count: number;
  average_salary: number;
  minimum_salary: number;
  maximum_salary: number;
}

export const getDepartmentStatistics =
  async (): Promise<DepartmentStatistics[]> => {
    const response = await api.get<DepartmentStatistics[]>(
      "/employees/department-statistics"
    );

    return response.data;
  };
  //-------------------------------
  export interface DepartmentHavingMoreThanOneEmployee {
  department_name: string;
  employee_count: number;
}

export const getDepartmentsHavingMoreThanOneEmployee =
  async (): Promise<DepartmentHavingMoreThanOneEmployee[]> => {
    const response =
      await api.get<DepartmentHavingMoreThanOneEmployee[]>(
        "/employees/departments-having-more-than-one"
      );

    return response.data;
  };
  //----------------------------- 
  //PAGINATION
  export interface Employee {
  employee_id: number;
  employee_name: string;
  email: string;
  salary: number;
  department_id: number;
}

export interface EmployeePaginationResponse {
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    totalRecords: number;
    totalPages: number;
  };
}

export const getEmployeesPaginated = async (
  page: number,
  limit: number
): Promise<EmployeePaginationResponse> => {
  const response = await api.get<EmployeePaginationResponse>(
    "/employees/pagination",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return response.data;
};
//---------------------------
//SEARCH BY EMAIL
export const getEmployeeByEmail = async (
  email: string
): Promise<Employee[]> => {
  const response = await api.get<Employee[]>(
    "/employees/search",
    {
      params: {
        email,
      },
    }
  );

  return response.data;
};
//--------------------------------------
//EXPLAIN ANALYZE
export interface ExplainResult {
  "QUERY PLAN": string;
}

export const explainEmployeeNameSearch = async (
  name: string
): Promise<ExplainResult[]> => {
  const response = await api.get<ExplainResult[]>(
    "/employees/explain-name",
    {
      params: {
        name,
      },
    }
  );

  return response.data;
};


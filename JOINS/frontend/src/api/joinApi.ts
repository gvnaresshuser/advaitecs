import api from "./axios";

export const getInnerJoin = async () => {
  const response = await api.get("/joins/inner");
  return response.data;
};

export const getLeftJoin = async () => {
  const response = await api.get("/joins/left");
  return response.data;
};

export const getRightJoin = async () => {
  const response = await api.get("/joins/right");
  return response.data;
};

export const getFullOuterJoin = async () => {
  const response = await api.get("/joins/full");
  return response.data;
};

export const getCrossJoin = async () => {
  const response = await api.get("/joins/cross");
  return response.data;
};

export const getNaturalJoin = async () => {
  const response = await api.get("/joins/natural");
  return response.data;
};

export const getSelfJoin = async () => {
  const response = await api.get("/joins/self");
  return response.data;
};

export const getEmployeesWithoutDepartment = async () => {
  const response = await api.get("/joins/employees-without-department");
  return response.data;
};

export const getDepartmentsWithoutEmployees = async () => {
  const response = await api.get("/joins/departments-without-employees");
  return response.data;
};

export const getEmployeeProjects = async () => {
  const response = await api.get("/joins/employee-projects");
  return response.data;
};

export const getEmployeeDepartmentProjects = async () => {
  const response = await api.get("/joins/employee-department-projects");
  return response.data;
};
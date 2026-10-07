import api from "./axios";
import type {
  Project,
  ProjectResponse,
  ProjectsResponse,
  PaginatedProjectsResponse,
} from "../types/project.types";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>("/projects");
  return response.data.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get<ProjectResponse>(`/projects/${id}`);
  return response.data.data;
};

export const searchProjects = async (query: string): Promise<Project[]> => {
  const response = await api.get<ProjectsResponse>("/projects/search", {
    params: { q: query },
  });
  return response.data.data;
};

export const getProjectsPaginated = async (
  page: number,
  limit: number,
): Promise<PaginatedProjectsResponse> => {
  const response = await api.get<PaginatedProjectsResponse>(
    "/projects/pagination",
    { params: { page, limit } },
  );
  return response.data;
};

export const createProject = async (
  name: string,
  description: string,
): Promise<Project> => {
  const response = await api.post<ProjectResponse>("/projects", {
    name,
    description,
  });
  return response.data.data;
};

export const updateProject = async (
  id: string,
  name: string,
  description: string,
): Promise<Project> => {
  const response = await api.put<ProjectResponse>(`/projects/${id}`, {
    name,
    description,
  });
  return response.data.data;
};

export const deleteProject = async (id: string): Promise<Project> => {
  const response = await api.delete<ProjectResponse>(`/projects/${id}`);
  return response.data.data;
};
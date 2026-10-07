import api from "./axios";
import type {
  Task,
  TaskResponse,
  TasksResponse,
  PaginatedTasksResponse,
} from "../types/task.types";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<TasksResponse>("/tasks");
  return response.data.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get<TaskResponse>(`/tasks/${id}`);
  return response.data.data;
};

export const searchTasks = async (query: string): Promise<Task[]> => {
  const response = await api.get<TasksResponse>("/tasks/search", {
    params: { q: query },
  });
  return response.data.data;
};

export const getTasksPaginated = async (
  page: number,
  limit: number,
): Promise<PaginatedTasksResponse> => {
  const response = await api.get<PaginatedTasksResponse>(
    "/tasks/pagination",
    { params: { page, limit } },
  );
  return response.data;
};

export const createTask = async (
  projectId: string,
  assignedTo: string | null,
  title: string,
  description: string,
  status: string,
  priority: string,
  dueDate: string | null,
): Promise<Task> => {
  const response = await api.post<TaskResponse>("/tasks", {
    projectId,
    assignedTo,
    title,
    description,
    status,
    priority,
    dueDate,
  });
  return response.data.data;
};

export const updateTask = async (
  id: string,
  assignedTo: string | null,
  title: string,
  description: string,
  status: string,
  priority: string,
  dueDate: string | null,
): Promise<Task> => {
  const response = await api.put<TaskResponse>(`/tasks/${id}`, {
    assignedTo,
    title,
    description,
    status,
    priority,
    dueDate,
  });
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<Task> => {
  const response = await api.delete<TaskResponse>(`/tasks/${id}`);
  return response.data.data;
};
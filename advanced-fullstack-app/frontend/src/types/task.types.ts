export interface Task {
  id: string;
  project_id: string;
  assigned_to: string | null;
  created_by: string | null;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  project_name?: string;
  assigned_user_name?: string | null;
  assigned_user_email?: string | null;
  creator_name?: string | null;
  creator_email?: string | null;
}

export interface TaskPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TasksResponse {
  success: boolean;
  data: Task[];
}

export interface TaskResponse {
  success: boolean;
  message?: string;
  data: Task;
}

export interface PaginatedTasksResponse {
  success: boolean;
  data: Task[];
  pagination: TaskPagination;
}
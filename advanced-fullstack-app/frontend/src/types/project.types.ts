export interface Project {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  owner_name: string;
  owner_email: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
}

export interface ProjectResponse {
  success: boolean;
  message?: string;
  data: Project;
}

export interface PaginatedProjectsResponse {
  success: boolean;
  data: Project[];
  pagination: ProjectPagination;
}
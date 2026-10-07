export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  message?: string;
}

export interface Pagination {
  page:number;
  limit:number;
  total:number;
  totalPages:number;
}

export interface PaginatedUsersResponse {
  success:boolean;
  data:User[];
  pagination:Pagination;
  message?:string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserResponse {
  success: boolean;
  message?: string;
  data: User;
}
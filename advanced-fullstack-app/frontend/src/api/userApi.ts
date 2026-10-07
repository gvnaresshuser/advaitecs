import api from "./axios";
import type {
  CreateUserData,
  CreateUserResponse,
  User,
  UsersResponse,
  PaginatedUsersResponse
} from "../types/user.types";

export const getUsers=async():Promise<UsersResponse>=>{
  const response=await api.get<UsersResponse>("/users");
  return response.data;
};

export const getUsersPaginated=async(
  page:number=1,
  limit:number=10,
):Promise<PaginatedUsersResponse>=>{
  const response=await api.get<PaginatedUsersResponse>(
    `/users/pagination?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const createUser=async(
  data:CreateUserData,
):Promise<CreateUserResponse>=>{
  const response=await api.post<CreateUserResponse>("/users",data);
  return response.data;
};

export const getUserById=async(id:string):Promise<{success:boolean;data:User}>=>{
  const response=await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser=async(
  id:string,
  data:{name:string;email:string},
):Promise<{success:boolean;message?:string;data:User}>=>{
  const response=await api.put(`/users/${id}`,data);
  return response.data;
};

export const deleteUser=async(id:string):Promise<{
  success:boolean;
  message?:string;
}>=>{
  const response=await api.delete(`/users/${id}`);
  return response.data;
};
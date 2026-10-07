import api from "./axios";
import type {
  AuthResponse,
} from "../types/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const login = async (
  data: LoginRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data,
  );

  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data,
  );

  return response.data;
};

export const refresh = async (): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/refresh",
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>(
    "/auth/me",
  );

  return response.data;
};
import api from "./axios";
import type {
  AuthResponse,
  LoginData,
  MeResponse,
  RegisterData,
} from "../types/auth.types";

export const register = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const login = async (
  data: LoginData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async (): Promise<MeResponse> => {
  const response = await api.get<MeResponse>("/auth/me");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
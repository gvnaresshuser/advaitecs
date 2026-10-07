import {
  getMe,
  login,
  logout,
  refresh,
  register,
  type LoginRequest,
  type RegisterRequest,
} from "../api/authApi";

export const loginUser = async (
  data: LoginRequest,
) => {
  return login(data);
};

export const registerUser = async (
  data: RegisterRequest,
) => {
  return register(data);
};

export const refreshSession = async () => {
  return refresh();
};

export const logoutUser = async () => {
  await logout();
};

export const getCurrentUser = async () => {
  return getMe();
};
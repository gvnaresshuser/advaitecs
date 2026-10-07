export interface User {
  id: number | string;
  name: string;
  email: string;
  mobile?: string;
  createdAt?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  mobile?: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    accessToken?: string;
  };
}

export interface MeResponse {
  success: boolean;
  data: User;
}
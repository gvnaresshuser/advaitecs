export interface AuthUser {
  userId: number;
  email: string;
  roles: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}
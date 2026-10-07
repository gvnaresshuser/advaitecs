import type { Request } from "express";

export interface AuthenticatedUser {
  userId: number;
  email: string;
  roles: string[];
}

export interface AuthenticatedRequest
  extends Request {
  user?: AuthenticatedUser;
}
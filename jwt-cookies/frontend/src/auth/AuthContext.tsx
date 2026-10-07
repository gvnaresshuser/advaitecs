import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { AuthUser } from "../types/auth";

import { getCurrentUser, loginUser, logoutUser } from "./authService";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isAuthenticated = user !== null;

  useEffect(() => {
    const loadUser = async (): Promise<void> => {
      try {
        const response = await getCurrentUser();

        setUser(response.data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const response = await loginUser({
      email,
      password,
    });

    setUser(response.data.user);
  };

  const logout = async (): Promise<void> => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

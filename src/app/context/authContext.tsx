"use client";

import { toast } from "@/components/ui/use-toast";
import { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  useAuth: () => {
    isAuthenticated: boolean;
  };
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
  useAuth: () => ({
    isAuthenticated: false,
    login: () => false,
    logout: () => {},
  }),
});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username: string, password: string): boolean => {
    if (
      username == process.env.NEXT_PUBLIC_USER_ADMIN_NAME &&
      password == process.env.NEXT_PUBLIC_USER_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      toast({
        title: "Login efetuado com sucesso!",
        description: "Agora você pode ver a página de gerenciamento.",
      });
      return true;
    }
    toast({
      title: "Incorreto!",
      description: "Nome de usuário ou senha inválidos.",
    });
    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ useAuth, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

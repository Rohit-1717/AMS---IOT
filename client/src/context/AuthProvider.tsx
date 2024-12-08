// src/context/AuthProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface AuthContextType {
  user: { email: string; role: string } | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, role: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null
  );

  const register = async (email: string, password: string, role: string) => {
    const response = await axiosInstance.post("/admin/register", {
      email,
      password,
      role,
    });
    setUser(response.data.user);
  };

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/admin/login", {
      email,
      password,
    });
    setUser(response.data.user);
  };

  const resetPassword = async (email: string, newPassword: string) => {
    await axiosInstance.patch("/admin/reset-password", { email, newPassword });
  };

  const logout = async () => {
    await axiosInstance.post("/admin/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        resetPassword,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

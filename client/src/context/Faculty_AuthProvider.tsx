// src/context/FacultyAuthProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface FacultyAuthContextType {
  faculty: { email: string; role: string } | null;
  isAuthenticated: boolean;
  register: (email: string, password: string, role: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const FacultyAuthContext = createContext<FacultyAuthContextType | undefined>(
  undefined
);

export const FacultyAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [faculty, setFaculty] = useState<{
    email: string;
    role: string;
  } | null>(null);

  const register = async (email: string, password: string, role: string) => {
    const response = await axiosInstance.post("/faculty/register", {
      email,
      password,
      role,
    });
    setFaculty(response.data.user);
  };

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/faculty/login", {
      email,
      password,
    });
    setFaculty(response.data.user);
  };

  const resetPassword = async (email: string, newPassword: string) => {
    await axiosInstance.patch("/faculty/reset-password", {
      email,
      newPassword,
    });
  };

  const logout = async () => {
    await axiosInstance.post("/faculty/logout");
    setFaculty(null);
  };

  return (
    <FacultyAuthContext.Provider
      value={{
        faculty,
        isAuthenticated: !!faculty,
        register,
        login,
        resetPassword,
        logout,
      }}
    >
      {children}
    </FacultyAuthContext.Provider>
  );
};

export const useFacultyAuth = (): FacultyAuthContextType => {
  const context = useContext(FacultyAuthContext);
  if (!context) {
    throw new Error("useFacultyAuth must be used within a FacultyAuthProvider");
  }
  return context;
};

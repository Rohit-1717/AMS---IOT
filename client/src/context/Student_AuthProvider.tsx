import React, { createContext, useState, useContext, ReactNode } from "react";
import axiosInstance from "@/utils/axiosInstance";

interface StudentAuthContextType {
  student: { email: string; role: string } | null;
  isAuthenticated: boolean;
  register: (
    fullName: string,
    enrollmentNumber: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;
  login: (enrollmentNumber: string, password: string) => Promise<void>;
  resetPassword: (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(
  undefined
);

export const StudentAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [student, setStudent] = useState<{
    email: string;
    role: string;
  } | null>(null);

  const register = async (
    fullName: string,
    enrollmentNumber: string,
    email: string,
    password: string,
    role: string
  ) => {
    const response = await axiosInstance.post("/students/register", {
      fullName,
      enrollmentNumber,
      email: email.toLowerCase(), // Store email in lowercase
      password,
      role,
    });
    setStudent(response.data.user);
  };

  const login = async (enrollmentNumber: string, password: string) => {
    const response = await axiosInstance.post("/students/login", {
      enrollmentNumber,
      password,
    });
    setStudent(response.data.user);
  };

  const resetPassword = async (
    email: string,
    oldPassword: string,
    newPassword: string
  ) => {
    await axiosInstance.patch("/students/reset-password", {
      email,
      oldPassword,
      newPassword,
    });
  };

  const logout = async () => {
    await axiosInstance.post("/students/logout");
    setStudent(null);
  };

  return (
    <StudentAuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        register,
        login,
        resetPassword,
        logout,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within a StudentAuthProvider");
  }
  return context;
};

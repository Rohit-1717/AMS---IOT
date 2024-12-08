import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Header from "@/components/Header";
import { useFacultyAuth } from "@/context/Faculty_AuthProvider";
import { useStudentAuth } from "@/context/Student_AuthProvider";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"faculty" | "student">("faculty");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const { login: facultyLogin } = useFacultyAuth();
  const { login: studentLogin } = useStudentAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { identifier, password } = formData;

    if (!identifier || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      if (role === "faculty") {
        await facultyLogin(identifier, password);
        toast.success("Faculty Login successful!");
        navigate("/faculty-dashboard");
      } else {
        await studentLogin(identifier, password);
        toast.success("Student Login successful!");
        navigate("/student-dashboard");
      }
    } catch (error: any) {
      // Enhanced error logging
      console.error("Login error:", error);

      // Checking if error response is available
      if (error.response && error.response.data) {
        // Display specific error message if provided by backend
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
      } else {
        // Fallback error message
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={role === "faculty" ? "default" : "outline"}
              onClick={() => setRole("faculty")}
              className="w-1/2"
            >
              Faculty
            </Button>
            <Button
              variant={role === "student" ? "default" : "outline"}
              onClick={() => setRole("student")}
              className="w-1/2"
            >
              Student
            </Button>
          </div>

          <CardHeader>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              {role === "faculty" ? "Faculty Login" : "Student Login"}
            </h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="identifier"
                  className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                  {role === "faculty" ? "Faculty ID" : "Enrollment Number"}
                </label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder={
                    role === "faculty"
                      ? "Enter your Faculty ID"
                      : "Enter your Enrollment Number"
                  }
                  value={formData.identifier}
                  onChange={handleChange}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              variant="link"
              className="text-sm text-gray-500 hover:underline"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;

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

const Login: React.FC = () => {
  const [role, setRole] = useState<"faculty" | "student">("faculty");

  return (
    <>
      <Header />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
          {/* Role Toggle Buttons */}
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

          {/* Login Form */}
          <CardHeader>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              {role === "faculty" ? "Faculty Login" : "Student Login"}
            </h2>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
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
                  className="dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Login;

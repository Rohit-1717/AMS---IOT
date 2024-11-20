import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useTheme } from "@/context/ThemeProvider"; // Ensure this is the correct path to your ThemeProvider
import Header from "@/components/Header";

const AdminAuth: React.FC = () => {
  const [role, setRole] = useState<"HOD" | "Director">("HOD");
  const [formType, setFormType] = useState<"login" | "register">("login");
  const { theme } = useTheme(); // Access current theme

  return (
    <>
      <Header />
      <div
        className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
          {/* Role Toggle */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-center mb-4">
              Select Role
            </h2>
            <ToggleGroup
              type="single"
              value={role}
              onValueChange={(value) => value && setRole(value)}
              className="flex space-x-2"
            >
              <ToggleGroupItem
                value="HOD"
                className={`px-4 py-2 border rounded-md ${
                  role === "HOD"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                }`}
              >
                HOD
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Director"
                className={`px-4 py-2 border rounded-md ${
                  role === "Director"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300"
                }`}
              >
                Director
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Form Header */}
          <CardHeader>
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              {formType === "login" ? `${role} Login` : `${role} Registration`}
            </h2>
          </CardHeader>

          {/* Form Fields */}
          <CardContent>
            <form className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="dark:bg-gray-800 dark:border-gray-700"
                  required
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
                  required
                />
              </div>
              {formType === "register" && (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-semibold text-gray-600 dark:text-gray-400"
                  >
                    Confirm Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="dark:bg-gray-800 dark:border-gray-700"
                    required
                  />
                </div>
              )}
            </form>
          </CardContent>

          {/* Form Footer */}
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">
              {formType === "login" ? "Login" : "Register"}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm"
              onClick={() =>
                setFormType((prev) => (prev === "login" ? "register" : "login"))
              }
            >
              {formType === "login"
                ? "Switch to Registration"
                : "Switch to Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AdminAuth;

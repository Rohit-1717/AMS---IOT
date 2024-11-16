import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "@/components/Header";

const Registration: React.FC = () => {
  const [view, setView] = useState<"faculty" | "student">("faculty");

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
          <CardHeader>
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                variant={view === "faculty" ? "default" : "outline"}
                className="w-1/2"
                onClick={() => setView("faculty")}
              >
                Faculty Registration
              </Button>
              <Button
                variant={view === "student" ? "default" : "outline"}
                className="w-1/2"
                onClick={() => setView("student")}
              >
                Student Registration
              </Button>
            </div>
            <CardTitle>
              {view === "faculty"
                ? "Faculty Registration"
                : "Student Registration"}
            </CardTitle>
            <CardDescription>
              {view === "faculty"
                ? "Create an account as a faculty member to manage attendance."
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              {view === "student" && (
                <div>
                  <label
                    htmlFor="enrollment-number"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enrollment Number
                  </label>
                  <Input
                    id="enrollment-number"
                    type="text"
                    placeholder="Enter your enrollment number"
                    required
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Register
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Registration;

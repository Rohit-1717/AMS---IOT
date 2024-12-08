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
import { useFacultyAuth } from "@/context/Faculty_AuthProvider"; // Import Faculty context
import { useStudentAuth } from "@/context/Student_AuthProvider"; // Import Student context
import { toast } from "react-hot-toast";

const Registration: React.FC = () => {
  const { register: facultyRegister } = useFacultyAuth(); // Use faculty register
  const { register: studentRegister } = useStudentAuth(); // Use student register

  const [view, setView] = useState<"faculty" | "student">("faculty");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    enrollmentNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, enrollmentNumber, password, confirmPassword } =
      formData;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      (view === "student" && !enrollmentNumber)
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading

    try {
      // Use the appropriate register function based on the selected view
      if (view === "faculty") {
        await facultyRegister(email, password, "faculty");
      } else {
        await studentRegister(
          fullName,
          enrollmentNumber, // Ensure enrollmentNumber is passed here
          email, // Ensure email is passed here
          password,
          "student"
        );
      }
      toast.success("Registration successful!");
      // Reset form after successful registration
      setFormData({
        fullName: "",
        email: "",
        enrollmentNumber: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error("Registration error:", error.message);
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

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
                : "Sign up as a student to track your attendance and progress."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Full Name
                </label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {view === "student" && (
                <div>
                  <label
                    htmlFor="enrollmentNumber"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enrollment Number
                  </label>
                  <Input
                    id="enrollmentNumber"
                    type="text"
                    placeholder="Enter your enrollment number"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Registration;

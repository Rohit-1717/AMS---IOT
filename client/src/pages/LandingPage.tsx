import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const testimonials = [
  {
    name: "Dr. John Doe",
    role: "Professor of Computer Science",
    company: "University of Tech",
    quote: "This attendance system has streamlined my class management and made attendance tracking a breeze.",
  },
  {
    name: "Prof. Sarah Williams",
    role: "Lecturer, Physics Department",
    company: "Tech University",
    quote: "The system provides real-time data and reports, helping us focus more on teaching and less on administrative tasks.",
  },
  {
    name: "Dr. Emily Stone",
    role: "Assistant Professor, Chemistry",
    company: "Science Institute",
    quote: "It's a game-changer for managing attendance in large classrooms. Highly recommend!",
  },
];

const chartData = {
  labels: ["John Doe", "Class Average"],
  datasets: [
    {
      label: "Attendance Percentage",
      data: [99.5, 85],
      backgroundColor: ["#4CAF50", "#2196F3"],
      borderColor: ["#4CAF50", "#2196F3"],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
    },
  },
};

const LandingPage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Header /> {/* Include the header at the top */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
               Attendance Management System
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8">
              A seamless way to track, monitor, and improve student attendance across all courses. Accurate, efficient, and easy to use.
            </p>
          </motion.div>
        </section>

        <section className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Highest Attendance of the Month
            </h2>
          </motion.div>
          <Card className="w-full">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Student"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">Roll No: 12345</p>
                    <p className="mt-2 text-lg text-blue-600">Attendance: 99.5%</p>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 h-64">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800 rounded-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Faculty Testimonials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Here's what our faculty members say about the attendance system
            </p>
          </motion.div>
          <div className="flex justify-center items-center">
            <Card className="w-full max-w-lg">
              <CardContent className="p-6 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonials[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

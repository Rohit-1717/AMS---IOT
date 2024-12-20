import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Header from './components/Header';
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Admin_auth from "./pages/Admin_auth";
import DirectorDashboard from "./pages/DirectorDashboard";
import HodDashboard from "./pages/HodDashboard";
import { FacultyAuthProvider } from "./context/Faculty_AuthProvider";
import { StudentAuthProvider } from "./context/Student_AuthProvider";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      <Router>
        {/* <Header /> */}
        <main>
          <FacultyAuthProvider>
            <StudentAuthProvider>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/admin-auth" element={<Admin_auth />} />
                <Route
                  path="/admin-auth/HodDashboard"
                  element={<HodDashboard />}
                />
                <Route
                  path="/admin-auth/DirectorDashboard"
                  element={<DirectorDashboard />}
                />
              </Routes>
            </StudentAuthProvider>
          </FacultyAuthProvider>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

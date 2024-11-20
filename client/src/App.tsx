import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTheme } from "./context/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Header from './components/Header';
import Footer from "./components/Footer";
import Registration from "./pages/Registration";
import Admin_auth from "./pages/Admin_auth";

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
    >
      <Router>
        {/* <Header /> */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/admin-auth" element={<Admin_auth/>} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

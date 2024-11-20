import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current path

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Attendance System
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-4">
          {/* Conditionally render links based on current path */}
          {location.pathname !== "/admin" && (
            <Link to="/admin-auth" className="hover:text-gray-200">
              Admin
            </Link>
          )}
          {location.pathname !== "/login" && (
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
          )}
          {location.pathname !== "/register" && (
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="bg-transparent text-white font-semibold px-3 py-1 rounded hover:bg-blue-700"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </nav>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-white lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ml-auto"
          aria-label="Toggle Menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              menuOpen ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation with Smooth Slide Animation */}
      <div
        className={`lg:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${
          menuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center mt-4 space-y-4 text-lg bg-blue-600 dark:bg-blue-800 text-white py-4">
          {/* Conditionally render links based on current path */}
          {location.pathname !== "/admin" && (
            <Link
              to="/admin-auth"
              className="hover:text-gray-200"
              onClick={toggleMenu}
            >
              Admin
            </Link>
          )}
          {location.pathname !== "/login" && (
            <Link
              to="/login"
              className="hover:text-gray-200"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
          {location.pathname !== "/register" && (
            <Link
              to="/register"
              className="hover:text-gray-200"
              onClick={toggleMenu}
            >
              Register
            </Link>
          )}
          <button
            onClick={() => {
              toggleTheme();
              toggleMenu();
            }}
            className="bg-transparent text-white font-semibold px-3 py-1 rounded hover:bg-blue-700"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

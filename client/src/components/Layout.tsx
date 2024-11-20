import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeProvider';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Attendance System</Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="text-white lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            aria-label="Toggle Menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link to="/admin" className="hover:text-gray-200">Admin</Link>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/register" className="hover:text-gray-200">Register</Link>
          </nav>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden lg:inline-block ml-4 bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>

        {/* Mobile Navigation with Smooth Slide Animation */}
        <div
          className={`lg:hidden overflow-hidden transition-max-height duration-500 ease-in-out ${menuOpen ? 'max-h-screen' : 'max-h-0'}`}
        >
          <nav className="flex flex-col items-center mt-4 space-y-4 text-lg bg-blue-600 dark:bg-blue-800 text-white py-4">
            <Link to="/admin-auth" className="hover:text-gray-200" onClick={toggleMenu}>Admin</Link>
            <Link to="/login" className="hover:text-gray-200" onClick={toggleMenu}>Login</Link>
            <Link to="/register" className="hover:text-gray-200" onClick={toggleMenu}>Register</Link>

            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={() => {
                toggleTheme();
                toggleMenu();
              }}
              className="mt-4 bg-white text-blue-600 font-semibold px-3 py-1 rounded hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow p-4">
        <div className="container mx-auto">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 dark:bg-blue-800 text-white text-center p-4">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Attendance Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

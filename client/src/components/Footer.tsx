import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 dark:bg-blue-800 text-white text-center p-4">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} Attendance Management System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

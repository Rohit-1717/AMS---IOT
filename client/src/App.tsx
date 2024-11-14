// src/App.tsx
import React from 'react';
import { useTheme } from './context/ThemeProvider';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="p-4">
        <button
          onClick={toggleTheme}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Hello, Vite + React + Tailwind!</h1>
        <p className="mt-4">
          This text color should change based on the theme!
        </p>
      </main>
    </div>
  );
};

export default App;

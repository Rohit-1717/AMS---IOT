// src/pages/LandingPage.tsx
import React from 'react';
import Layout from '../components/Layout';

const LandingPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Effortless Attendance Management</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          Track, manage, and improve your team's attendance with ease and accuracy.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 mb-10">Powerful features designed to save you time and effort.</p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl">Real-Time Tracking</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Track attendance in real-time and monitor productivity with ease.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl">Automated Reports</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Generate daily, weekly, and monthly reports effortlessly.</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-xl">Seamless Integration</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Integrate with popular tools to streamline your workflow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4">Start managing your team's attendance today.</p>
        <button className="mt-8 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-700">
          Sign Up Now
        </button>
      </section>
    </Layout>
  );
};

export default LandingPage;

import React from "react";

const LandingPage = () => (
  <div className="min-h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 flex flex-col">
    {/* Header */}
    <header className="py-6 flex justify-between items-center px-8 ">
      <h1 className="text-2xl font-bold text-pink-600">AchievR</h1>
      <nav>
        <a href="/login" className=" font-semibold text-red-400 mx-4 hover:text-pink-600 transition">Login</a>
        <a href="/signup" className="font-semibold text-red-400 mx-4 hover:text-pink-600 transition">Sign Up</a>
      </nav>
    </header>

    {/* Main Content */}
    <main className="flex-1 flex flex-col justify-center items-center px-4">
      {/* Hero Section */}
      <section className="text-center max-w-2xl">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Comprehensive Digital Record System
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Seamlessly manage, track, and showcase your academic and professional achievements with one secure, easy-to-use digital platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="/signup" className="bg-red-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition">
            Get Started
          </a>
          <a href="/dashboard" className="bg-white border border-red-400 text-red-400 px-6 py-3 rounded-lg font-semibold hover:bg-red-100 transition">
            View Dashboard
          </a>
        </div>
      </section>

      {/* Card Grid Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 max-w-4xl w-full">
        <div className="bg-white/75 backdrop-blur-sm shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-yellow-600 mb-2">Smart Record Management</h3>
          <p className="text-gray-700 mb-2">Organize and store achievements, certifications, and documents securely.</p>
        </div>
        <div className="bg-white/75 backdrop-blur-sm shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-pink-500 mb-2">Instant Data Access</h3>
          <p className="text-gray-700 mb-2">Access your records anytime, anywhere from any device.</p>
        </div>
        <div className="bg-white/75 backdrop-blur-sm shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold text-purple-600 mb-2">Share & Showcase</h3>
          <p className="text-gray-700 mb-2">Present your achievements to employers or institutions with ease.</p>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="py-6 text-center text-gray-400 bg-white mt-10 shadow-inner">
      &copy; 2025 AchievR. All rights reserved.
    </footer>
  </div>
);

export default LandingPage;

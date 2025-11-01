import React from 'react';

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-blue-600 to-blue-300 px-2">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-1 text-center">
          Student Activity Platform
        </h1>
        <p className="text-gray-500 mb-6 text-center text-xs sm:text-sm">
          Comprehensive Digital Record System
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-black self-start">Sign Up</h2>
        
        <form className="w-full flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Select Role</label>
            <input
              type="text"
              placeholder="Student"
              defaultValue="Student"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Roll Number</label>
            <input
              type="text"
              placeholder="Enter roll number"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm sm:text-base font-semibold text-gray-700 mb-1">Department</label>
            <input
              type="text"
              placeholder="Computer Science"
              defaultValue="Computer Science"
              className="border border-gray-300 rounded-md px-3 py-2 sm:px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-800 text-white rounded-md py-2 font-semibold text-lg mt-2 hover:bg-purple-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-xs sm:text-sm mt-6 text-center">
          Already have an account?{' '}
          <a href="#" className="text-purple-800 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

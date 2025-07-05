import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Homepage() {
  return (
    <div className="relative flex justify-center items-center w-screen h-screen bg-gray-100 text-gray-800 overflow-hidden">
      {/* Background Doodles */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute top-0 left-0 w-[50vw] h-full object-cover opacity-10"
      />
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute bottom-0 right-0 w-[50vw] h-full object-cover opacity-10"
      />

      {/* Translucent Card */}
      <div className="z-10 px-10 py-8 rounded-2xl bg-white/60 shadow-2xl border border-white/40 h-[30vh] w-[50vw]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold mb-2">Welcome</h1>
          <p className="text-base text-gray-700">Sign in to start chatting</p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-white border border-gray-300 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
          >Login</Link>

          <Link
            to="/signup"
            className="px-5 py-2 rounded-lg bg-gray-800 text-white shadow-sm hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-400 text-xs z-10">
        &copy; {new Date().getFullYear()} Chat App
      </div>
    </div>
  );
}

export default Homepage;

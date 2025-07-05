import React, { useState } from 'react';
import { userStore } from '../store/userStore';
import { NavLink } from 'react-router-dom';

function Login() {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const login = userStore((state) => state.login);
  const isLoggingIn = userStore((state) => state.isLoggingIn);

  const handleSubmit = async (e) => {
    try {
       e.preventDefault();
    login(formData);
      
    } catch (error) {
      
    }finally{
    setFormData({
    email: '',
    password: '',
    })
   
  }}

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Doodle background - top left */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute top-0 left-0 w-[50vw] h-full opacity-10 pointer-events-none"
      />

      {/* Doodle background - bottom right */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute bottom-0 right-0 w-[50vw] h-full opacity-10 pointer-events-none"
      />

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Welcome Back!</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-800 placeholder-gray-400 transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPass ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-800 placeholder-gray-400 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="text-xs text-blue-500 mt-1 hover:underline"
          >
            {showPass ? 'Hide Password' : 'Show Password'}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <div className='text-sm mt-2'>Don't have an Account? <NavLink to={"/signup"} className="text-blue-500">SignUp</NavLink></div>
      </form>
    </div>
  );
}

export default Login;

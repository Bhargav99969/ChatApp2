import React, { useState } from 'react';
import { userStore } from '../store/userStore';
import { Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const isSigning = userStore((state) => state.isSigningUp);
  const signup = userStore((state) => state.signup);

  const handleSubmit = (e) => {
    try {
        e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Passwords do not match");
      return;
    }
    signup(formData);
        
    } catch (error) {
        console.log("error in signup")
    }finally{
          setFormData({ name: "",
    email: "",
    password: "",
    confirm: "",})

    }
   
  
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Doodle Top Left */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute top-0 left-0 w-[50vw] h-full opacity-10 pointer-events-none"
      />

      {/* Doodle Bottom Right */}
      <img
        src="/2.jpg"
        alt="doodle"
        className="absolute bottom-0 right-0 w-[50vw] h-full opacity-10 pointer-events-none"
      />

      {/* Signup Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign Up</h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type={showPass ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="mb-4">
          <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            type={showPass ? 'text' : 'password'}
            id="confirm"
            value={formData.confirm}
            onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        {/* Show/Hide Password */}
        <div
          onClick={() => setShowPass(!showPass)}
          className="text-xs text-blue-500 mb-4 cursor-pointer"
        >
          {showPass ? 'Hide Password' : 'Show Password'}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
          disabled={isSigning}
        >
          {isSigning ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center mt-4">
            Already have an account?
            <Link to="/login" className='text-blue-500'>Login</Link>
          </p>
      </form>
    </div>
  );
}

export default Signup;

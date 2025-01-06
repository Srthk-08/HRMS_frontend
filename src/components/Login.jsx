import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    // Simulating login logic
    if (email === 'vyanwebs@gmail.com' && password === '1') {
      setError('');
      onLogin(); // Trigger the login function passed as a prop
      navigate('/'); // Redirect to the main dashboard after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8 bg-slate-800 border border-gray-300 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105">

        {/* Logo with animation */}
        <div className="flex justify-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
          <img src={logo} alt="Logo" className="h-20" />
        </div>

        {/* Login Form */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-white animate__animated animate__fadeIn animate__delay-1s">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

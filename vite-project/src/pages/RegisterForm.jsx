// src/pages/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      setError("User already exists! Please login or use another email.");
      return;
    }

    // Confirm password check
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Save new user (with name, email, password)
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    setSuccess("Account created successfully! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
          Register / Create Account
        </h2>

        {/* Error and Success messages */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        {/* Name input */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm Password input */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Create Account
        </button>

        {/* Navigation links */}
        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-sm mt-1 text-center">
          Or want a new one?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

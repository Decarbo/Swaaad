import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/usercomponent/AuthLayout";

export default function UserRegister() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/user/register", formData);
      navigate("/user/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "email", "password"].map((field) => (
          <div key={field}>
            <label className="block capitalize text-sm mb-1">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB900]"
            />
          </div>
        ))}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[#FFB900] text-gray-900 font-semibold py-2 rounded-lg mt-4"
        >
          {loading ? "Creating Account..." : "Register"}
        </motion.button>
      </form>
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/user/login")}
          className="text-[#FFB900] hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}

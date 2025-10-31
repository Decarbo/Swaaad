import React from "react";
import { motion } from "framer-motion";

export default function AuthLayout({ title, children }) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 p-8 rounded-3xl shadow-xl w-[90%] md:w-[400px] text-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#FFB900]">
          {title}
        </h2>
        {children}
      </div>
    </motion.div>
  );
}

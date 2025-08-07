import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="md:max-w-2xl max-w-xl">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
         Capturing Stories, Creating Impact
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We create cinematic quality ads, product shots, and brand stories that elevate your business.
        </p>
        <button className="bg-black text-white font-bold px-6 py-3 hover:bg-gray-400 hover:text-black transition-all">
          Contact
        </button>
      </div>
    </motion.section>
  );
}
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
          We turn your complex story into compelling content.
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Column Five helps brands connect through beautiful design & strategic storytelling.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">
          Let’s Work Together
        </button>
      </div>
    </motion.section>
  );
}
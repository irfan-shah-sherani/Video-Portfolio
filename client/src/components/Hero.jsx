import React from "react";
import { motion as Motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <Motion.section
      className="h-full md:py-25 py-20 flex items-center justify-center bg-white from-blue-100 to-white px-4 text-center"
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
        <NavLink to='/contact'>
          <button className="bg-black text-white font-bold px-6 py-3 hover:bg-gray-400 hover:text-black transition-all">
            Contact
          </button>
        </NavLink>
      </div>
    </Motion.section>
  );
}
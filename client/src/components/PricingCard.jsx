import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const PricingCard = ({ title, discript, price, greet }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <NavLink to="/contact"
      className={`max-w-xs bg-white p-6 border border-gray-200 shadow-lg rounded-sm space-y-4 
        transition-all duration-500 overflow-hidden 
        transform hover:scale-105 hover:shadow-2xl cursor-pointer
        ${isExpanded ? 'h-auto' : 'h-auto'}`}
    >
      <h2 className="text-xl font-bold">{title}</h2>

      <hr />

      <p className="text-gray-700 break-words">{discript}</p>

      <div>
        <p className="text-sm text-gray-800">Starting</p>
        <p className="text-3xl font-bold">`Rs{price}`</p>
        <p className="text-sm text-gray-500">per month</p>
      </div>

      <hr />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-800 font-medium">The Value to You</p>
        <button
          onClick={toggleExpand}
          className="text-gray-700 hover:text-black transition"
        >
          {isExpanded ? <FaTimes size={14} /> : <FaPlus size={14} />}
        </button>
      </div>

      {isExpanded && (
        <div className="bg-gray-100 p-3 text-gray-700 rounded text-sm">
           {greet}
        </div>
      )}

      <button className="bg-black text-white px-4 py-2 mt-2 font-semibold hover:bg-gray-800 transition">
        Book Intro Call
      </button>
    </NavLink>
  );
};

export default PricingCard;

import React from "react";

export default function CTABanner() {
  return (
    <div className="py-16 px-4 bg-blue-900 text-white text-center">
      <h3 className="text-3xl font-bold mb-4">Ready to tell your story?</h3>
      <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all">
        Start Your Project
      </button>
    </div>
  );
}
import React from "react";

export default function WhatWeDoSection() {
  return (
    <section className="bg-[#121012] text-white px-6 md:px-16 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left Side */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-300 mb-2">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-8">
            We Build Brands<br />Through Content
          </h2>
          <a
            href="#"
            className="text-red-500 font-semibold border-b border-red-500 hover:opacity-80 transition"
          >
            See Full Services
          </a>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 space-y-6 text-gray-200 text-base md:text-lg leading-relaxed">
          <p>
            We help our clients with the work beyond (and sometimes behind) the
            splashy ad campaigns and viral moments.
          </p>
          <p>
            We leverage content to help our clients consistently bring their
            unique perspective to the world, and educate, engage, and inspire
            like-minded people around it.
          </p>
          <p>
            Our clients compete on brand, and use content to get the upper hand
            to create trust and inspire belief.
          </p>
        </div>
      </div>
    </section>
  );
}

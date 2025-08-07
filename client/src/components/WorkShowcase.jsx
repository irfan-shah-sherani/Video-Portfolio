import React from "react";

export default function WorkShowcase() {
  return (
    <section className="py-20 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Some of Our Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">Case Study 1</div>
          <div className="bg-white p-4 shadow rounded-lg">Case Study 2</div>
          <div className="bg-white p-4 shadow rounded-lg">Case Study 3</div>
        </div>
      </div>
    </section>
  );
}
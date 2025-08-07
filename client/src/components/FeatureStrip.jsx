import React from "react";

export default function FeatureStrip() {
  return (
    <div className="flex flex-wrap justify-around bg-gray-50 py-6 text-center text-sm font-semibold uppercase tracking-wider">
      <p className="mx-2">Content Strategy</p>
      <p className="mx-2">Branding</p>
      <p className="mx-2">Data Visualization</p>
      <p className="mx-2">Design</p>
      <p className="mx-2">Video</p>
    </div>
  );
}
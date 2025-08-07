import React from "react";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md fixed w-full top-0 z-50">
      <div className="text-2xl font-bold">ColumnFive</div>
      <ul className="hidden md:flex space-x-6 font-medium">
        <li>Services</li>
        <li>Work</li>
        <li>About</li>
        <li>Resources</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}
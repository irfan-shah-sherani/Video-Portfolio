import React from "react";
import { Menu } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center sticky bg-white w-full px-6 py-[18px] top-0 z-10">
      <div className="text-2xl font-bold">Trimzo</div>
      <div className="md:hidden">
        <Menu/>
      </div>
      <ul className="hidden md:flex space-x-6 font-medium">
        <li className="group relative cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Services
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
        </li>

        <li className="group relative cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Work
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
        </li>

        <li className="group relative cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            plans
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
        </li>

        <li className="group relative cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            abouts
          </span>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span>
        </li>

        <li className="group relative cursor-pointer">
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Contact
          </span>
          {/* <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0"></span> */}
        </li>
      </ul>
    </nav>
  );
}

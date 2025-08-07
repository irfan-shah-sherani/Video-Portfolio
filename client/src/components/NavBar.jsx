import React from "react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center sticky w-full px-6 py-[18px] top-0 z-10 
    transition-colors duration-1200 
    ${scrolled ? "bg-black" : "bg-white"}
  `}
    >
      <div
        className={`text-2xl font-bold ${
          scrolled ? "text-white" : "text-black"
        }`}
      >
        Trimzo
      </div>
      <div className="md:hidden">
        <Menu />
      </div>
      <ul
        className={`hidden md:flex space-x-6 font-medium ${
          scrolled ? "text-white" : "text-black"
        }`}
      >
        <li className="group relative cursor-pointer">
          <NavLink
            // to="/"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold  ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "" : ""}`
            }
          >
            service
          </NavLink>
          <span
            className={`absolute left-0 -bottom-1 w-0 h-[2px]  ${
              scrolled ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0`}
          ></span>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            // to="/"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold  ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "" : ""}`
            }
          >
            Work
          </NavLink>
          <span
            className={`absolute left-0 -bottom-1 w-0 h-[2px]  ${
              scrolled ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0`}
          ></span>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            // to="/"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold  ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "" : ""}`
            }
          >
            Plans
          </NavLink>
          <span
            className={`absolute left-0 -bottom-1 w-0 h-[2px]  ${
              scrolled ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0`}
          ></span>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            // to="/"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold  ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "" : ""}`
            }
          >
            about
          </NavLink>
          <span
            className={`absolute left-0 -bottom-1 w-0 h-[2px]  ${
              scrolled ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0`}
          ></span>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold   ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "border px-2 py-1" : ""}`
            }
          >
            contact
          </NavLink>
          <span
            className={`absolute left-0 -bottom-1 w-0 h-[2px]  ${
              scrolled ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0`}
          ></span>
        </li>
      </ul>
    </nav>
  );
}

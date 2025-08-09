import React from "react";
import { Menu, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isOnBurger = location.pathname === "/burger";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center sticky w-full px-6 py-[18px] top-0 z-10 
    transition-colors duration-1500 
    ${scrolled ? "bg-black" : "bg-white"}
  `}
    >
      <NavLink
        to=""
        onClick={() => window.reload()}
        className={`text-2xl font-bold ${
          scrolled ? "text-white" : "text-black"
        }`}
      >
        Trimzo
      </NavLink>

      <NavLink
        to={isOnBurger ? "/" : "/burger"}
        className={`md:hidden ${scrolled ? "text-white" : "text-black"}`}
      >
        {isOnBurger ? <Minus /> : <Menu />}
      </NavLink>
      <ul
        className={`hidden md:flex space-x-6 font-medium ${
          scrolled ? "text-white" : "text-black"
        }`}
      >
        <li className="group relative cursor-pointer">
          <NavLink
            to="/service"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "border px-2 py-1" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                Service
                {!isActive && (
                  <span
                    className={`absolute left-0 -bottom-1 w-0 h-[2px] ${
                      scrolled ? "bg-white" : "bg-black"
                    } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 `}
                  ></span>
                )}
              </>
            )}
          </NavLink>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            to="/price"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "border px-2 py-1" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                Price
                {!isActive && (
                  <span
                    className={`absolute left-0 -bottom-1 w-0 h-[2px] ${
                      scrolled ? "bg-white" : "bg-black"
                    } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 `}
                  ></span>
                )}
              </>
            )}
          </NavLink>
        </li>
        <li className="group relative cursor-pointer">
          <NavLink
            to="/about"
            className={({isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "border px-2 py-1" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                About
                {!isActive && (
                  <span
                    className={`absolute left-0 -bottom-1 w-0 h-[2px] ${
                      scrolled ? "bg-white" : "bg-black"
                    } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 `}
                  ></span>
                )}
              </>
            )}
          </NavLink>
        </li>

        <li className="group relative cursor-pointer">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative z-10 transition-colors duration-300 font-bold ${
                scrolled ? "text-white" : "text-black"
              } ${isActive ? "border px-2 py-1" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                Contact
                {!isActive && (
                  <span
                    className={`absolute left-0 -bottom-1 w-0 h-[2px] ${
                      scrolled ? "bg-white" : "bg-black"
                    } transition-all duration-300 ease-in-out group-hover:w-full group-hover:left-0 `}
                  ></span>
                )}
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

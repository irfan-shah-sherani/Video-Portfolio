"use client";
import FistVideoA from '../assets/video/IMG_2422.mp4';
import FistVideoB from '../assets/video/IMG_2423.mp4';
import SecondVideoA from "../assets/video/IMG_2424.mp4";
import SecondVideoB from "../assets/video/IMG_2426.mp4";
import React, { useEffect, useRef, useState } from "react";

export default function StickyScrollLayout() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [isSticky, setIsSticky] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const right = rightRef.current;
      if (!right) return;

      // Get right section's distance from top of the page
      const rightBottom = right.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;

      // If bottom of right is visible in viewport -> stop sticking
      if (rightBottom <= windowHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // trigger on first load
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col  md:flex-row h-full ">
      <h2 className=" px-10 py-10 md:hidden text-3xl text-center font-bold">Work That Works</h2>
      <div  
        ref={leftRef}
        className={`w-1/3 p-4 hidden md:block transition-all duration-300 ${
          isSticky ? "sticky top-[72px] h-screen" : ""
        }`}
      >
        <h2 className=" px-10 py-4 text-6xl  font-bold">Work That Works</h2>
        <p className="text-2xl px-8 py-4">Some of our favorite work, for some of our favorite clients.</p>
      </div>

      <div ref={rightRef} className="md:w-2/3 px-4   md:space-y-10 space-y-0  flex flex-col gap-0 md:gap-5">
        {/* Simulate long content */}

        <div className="px-4 flex md:flex-row flex-col justify-around gap-4 ">
           <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white h-auto md:h-100"
                >
                  <source src={FistVideoA} type="video/mp4" />
          </video>
           <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white h-auto md:block md:h-100"
                >
                  <source src={FistVideoB} type="video/mp4" />
          </video>
        </div>
        <div className="p-4 flex md:flex-row flex-col justify-around gap-4 ">
           <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white h-auto md:h-100"
                >
                  <source src={SecondVideoA} type="video/mp4" />
          </video>
           <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white h-auto md:block md:h-100"
                >
                  <source src={SecondVideoB} type="video/mp4" />
          </video>
        </div>


        {/* <div className="h-auto p-4">
          <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white "
                >
                  <source src={SecondVideo} type="video/mp4" />
          </video>
        </div>
        <div className="h-auto  p-4">
          <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="rounded shadow-lg shadow-gray-400/50 bg-white"
                >
                  <source src={ThirdVideo} type="video/mp4" />
          </video>
        </div>      */}
      </div>
    </div>
  );
}

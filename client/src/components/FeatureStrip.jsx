import React from "react";
import Avanic from "../assets/img/avanic.png"
import Asana from "../assets/img/Asana.png"
import Microsoft from "../assets/img/microsoft.jpg"
import Github from "../assets/img/github.png"
import Netflix from "../assets/img/netflix.jpg"
import Uber from "../assets/img/uber.png"
import Udemy from "../assets/img/udemy.png"

export default function FeatureStrip() {
  return (


    <div className="w-full overflow-hidden bg-white py-4">
      <style>
        {`
          @keyframes marqueeScroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }

          .marquee {
            display: flex;
            width: fit-content;
            animation: marqueeScroll 25s linear infinite;
          }

          .marquee-wrapper:hover .marquee {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="marquee-wrapper w-full overflow-hidden">
        <div className="marquee gap-20">
          {/* One full set of logos */}
          <div className="flex gap-20 ">
            <img src={Avanic} className="h-20 relative bottom-4" />
            <img src={Asana} alt="Logo 2" className="h-12" />
            <img src={Microsoft} alt="Logo 4" className="h-20 relative bottom-4" />
            <img src={Github} alt="Logo 3" className="h-12" />
            <img src={Microsoft} alt="Logo 4" className="h-20 relative bottom-4" />
            <img src={Netflix} alt="Logo 1" className="h-15 relative bottom-1.5" />
            <img src={Uber} alt="Logo 3" className="h-12" />
            <img src={Avanic} alt="Logo 1" className="h-20 relative bottom-4" />
            <img src={Netflix} alt="Logo 1" className="h-15 relative bottom-1.5" />
            <img src={Uber} alt="Logo 3" className="h-12" />
            <img src={Asana} alt="Logo 2" className="h-12" />
            <img src={Microsoft} alt="Logo 4" className="h-20 relative bottom-4" />
            <img src={Github} alt="Logo 3" className="h-12" />
            <img src={Microsoft} alt="Logo 4" className="h-20 relative bottom-4" />
            <img src={Netflix} alt="Logo 1" className="h-15 relative bottom-1.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
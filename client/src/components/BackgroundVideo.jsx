import React, { useRef } from "react";
import { FaExpand as Fullscreen } from "react-icons/fa";
import BackVideo from "../assets/video/IMG_2389.mp4";
// import VideoPlayer from './StreamPlayer';

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    const el = videoRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  };

  return (
    <div className="px-4 md:px-8 flex flex-col justify-center">
      <section className="relative top-0 w-full h-auto object-contain md:object-cover">
        <button
          onClick={handleFullScreen}
          className="absolute bottom-4 right-4 p-3 bg-opacity-100 rounded-full hover:bg-opacity-80 transition z-9"
          aria-label="Fullscreen"
        >
          <Fullscreen className="text-white w-6 h-6" />
        </button>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="rounded shadow-lg shadow-gray-400/50 bg-white"
        >
          <source src={BackVideo} type="video/mp4" />
        </video>
        
      </section>
      <div className="w-full h-1 bg-black my-10"></div>
    </div>
  );
}

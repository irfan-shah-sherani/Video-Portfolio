import React, { useRef } from "react";
import { Fullscreen } from 'lucide-react';

import BackVideo from "../../public/BackgroundVideo.mp4";

export default function BackgroundVideo() {
  const videoRef = useRef(null);

  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={BackVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={handleFullScreen}
        className="absolute bottom-4 right-4 p-2  rounded-full hover:bg-opacity-80 transition"
        aria-label="Fullscreen"
      >
        <Fullscreen className="text-white"/>
      </button>
    </section>
  );
}

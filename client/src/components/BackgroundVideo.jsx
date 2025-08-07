import React, { useRef } from "react";
import { Fullscreen } from 'lucide-react';
import BackVideo from "../assets/BackgroundVideo.mp4";

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
    <div className="px-4 md:px-8 py-6">
  <section className="relative w-full aspect-video">
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute top-0 w-full h-full object-contain md:object-cover"
    >
      <source src={BackVideo} type="video/mp4" />
    </video>

    <button
      onClick={handleFullScreen}
      className="absolute bottom-4 right-4 p-3 bg-opacity-40 rounded-full hover:bg-opacity-80 transition"
      aria-label="Fullscreen"
    >
      <Fullscreen className="text-white w-6 h-6" />
    </button>
  </section>
</div>
  );
}

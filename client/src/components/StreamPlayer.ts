// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// export default function StreamPlayer({ src }) {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     if (!playerRef.current) {
//       playerRef.current = videojs(videoRef.current, {
//         autoplay: true,
//         controls: true,
//         responsive: true,
//         loop: true,
//         muted: true,
//         fluid: true,
//         sources: [{
//           src: src,
//           type: "application/x-mpegURL", // HLS format
//         }],
//       });
//     } else {
//       // if already initialized, just update source
//       playerRef.current.src({ src, type: "application/x-mpegURL" });
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [src]);

//   return (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-default-skin" />
//     </div>
//   );
// }

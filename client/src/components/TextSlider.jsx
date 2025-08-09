import React, { useEffect, useState } from "react";

const testimonials = [
  {
    title: "Amazing Experience",
    content: "Their service is top-notch. Really impressed!",
    author: "— Kami Shah",
  },
  {
    title: "Highly Recommend",
    content: "Professional and timely. Great communication.",
    author: "— Irfan Sherani",
  },
  {
    title: "Best Decision Ever",
    content: "They brought our brand to life. Love the results!",
    author: "— Sarah Khan",
  },
];

const TextSlider = () => {
  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { title, content, author } = testimonials[index];

  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6 transition-all duration-500 ease-in-out">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{title}</h1>
      <p className="text-amber-50 text-base md:text-lg mb-2">{content}</p>
      <p className="text-purple-700 font-semibold mt-4">{author}</p>
    </div>
  );
};

export default TextSlider;

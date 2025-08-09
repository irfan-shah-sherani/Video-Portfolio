import React, { useState } from "react";
import Formbutton from "../components/Formbutton";
import PricingCard from "../components/PricingCard";
import Uppertext from "../components/uppertext";
import { AnimatePresence, motion } from "framer-motion";
import TextSlider from "../components/Textslider";
import WebDevCard from "../components/WebDevCard"; 
import ScrollToTop from '../components/ScrollToTop'
const Pricing = () => {
  const [selected, setSelected] = useState("video editing");

  const pricingData = {
    "video editing": [
      {
        title: "Video Starter Pack",
        discript:
          "Includes 3 professionally edited videos/month with transitions, subtitles, and background music.",
        price: "5K",
        greet: " Let's bring your story to life with stunning videos!",
      },
      {
        title: "Cinematic Package",
        discript:
          "High-end cinematic production including color grading, sound design, and storytelling edits.",
        price: "10K",
        greet: " Perfect for ads, promos, and social content!",
      },
      {
        title: "Cinematic Package",
        discript:
          "High-end cinematic production including color grading, sound design, and storytelling edits.",
        price: "10K",
        greet: " Perfect for ads, promos, and social content!",
      },
    ],
    graphics: [
      {
        title: "Graphic Design Basics",
        discript:
          "Social media posts, posters, and branding content with unlimited revisions.",
        price: "3K",
        greet: " Let’s make your visuals speak louder than words!",
      },
      {
        title: "Full Brand Kit",
        discript:
          "Logo design, business cards, and a complete brand guideline.",
        price: "7K",
        greet: " A strong brand starts with stunning design!",
      },
      {
        title: "Full Brand Kit",
        discript:
          "Logo design, business cards, and a complete brand guideline.",
        price: "7K",
        greet: " A strong brand starts with stunning design!",
      },
    ],
    "web development": [
      {
        discript:
          "One-page responsive website with contact form and animations.",
        features: ["Responsive Design", "SEO Optimized", "Custom Animations"],
      },
      
    ],
  };

  return (
    <div className="bg-[#EBEBEB] h-full pt-10 w-full">
      <ScrollToTop/>
      <Uppertext />

      <div className="flex justify-center">
        <Formbutton selected={selected} setSelected={setSelected} />
      </div>

      <AnimatePresence mode="wait">
        <div
          className="mt-10 flex flex-col gap-10 items-center justify-center 
                     md:flex-row md:justify-around
                     px-4 sm:px-6 md:px-10"
        >
          {selected === "web development"
            ? pricingData["web development"].map((item, index) => (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <WebDevCard
                    companyName="AvanicSoft"
                    logoSrc="tg.png"
                  
                    description={item.discript}
                 
              
                    features={item.features}
                    collaborationNote="This website is proudly developed by AvanicSoft in collaboration with Trimzo digital."
                    contactLink="https://avanicsoft.com/contact"
                  />
                </motion.div>
              ))
            : pricingData[selected].map((item, index) => (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <PricingCard
                    title={item.title}
                    discript={item.discript}
                    price={item.price}
                    greet={item.greet}
                  />
                </motion.div>
              ))}
        </div>
      </AnimatePresence>

      <div className="w-full bg-black mt-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-8 text-gray-1400 underline flex justify-start font-serif">
          What Our Clients Say
        </h2>
        <div className="relative bottom-7">
          <TextSlider />
        </div>
      </div>
    </div>
  );
};

export default Pricing;

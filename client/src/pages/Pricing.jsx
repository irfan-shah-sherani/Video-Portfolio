import React, { useState } from "react";
import Formbutton from "../components/Formbutton";
import PricingCard from "../components/PricingCard";
import Uppertext from "../components/uppertext";
import { AnimatePresence, motion } from "framer-motion";
import TextSlider from "../components/TextSlider";
import WebDevCard from "../components/WebDevCard"; 
import ScrollToTop from '../components/ScrollToTop';

const Pricing = () => {
  const [selected, setSelected] = useState("video editing");

  const pricingData = {
    "video editing": [
      {
        title: "Video Starter Pack",
        discript:
          "Includes 5 professionally edited videos with Professional Voice Acting, Transitions, and Background music.",
        price: "Rs.50,000/-",
        greet: " Let's bring your story to life with stunning videos!",
      },
      {
        title: "Cinematic Package",
        discript:
          "Create 20 High-End cinematic Production including color grading, sound design, and storytelling edits.",
        price: "Rs.150,000/-",
        greet: " Perfect for ads, promos, and social content!",
      },
      {
        title: "Standard Package",
        discript:
          "Create 10 Professionally Shot Videos, With Proper Voice acting, Subtitles, Visuals, into/outro.",
        price: "80K",
        greet: " Perfect for ads, promos, and social content!",
      },
    ],
    "Social Media Package": [
      {
        title: "Starter Package",
        discript:
          "10 Social media posts, 5 Professionally Edited Videos, With SEO to Improve Organic Growth. Boosting Video Ads will be charged extra Rs.10,000 Excluding the Boosting Fee.",
        price: "Rs.75,000/-",
        greet: " Let’s make your visuals speak louder than words!",
      },
      {
        title: "Basic Package",
        discript:
          "20 Social media posts, 10 Professionally Edited Videos, With SEO to Improve Organic Growth. Boosting Video Ads will be charged extra Rs.10,000 Excluding the Boosting Fee.",
        price: "-Rs.130,000/-",
        greet: " A strong brand starts with stunning design!",
      },
      {
        title: "Full Brand Kit",
        discript:
          "30 Social media posts, 20 Professionally Edited Videos, With SEO to Improve Organic Growth. Boosting Video Ads will be charged extra Rs.10,000 Excluding the Boosting Fee. ",
        price: "Rs.180,000/-",
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

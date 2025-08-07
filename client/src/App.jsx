import React from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import FeatureStrip from "./components/FeatureStrip";
import AboutSection from "./components/AboutSection";
import WorkShowcase from "./components/WorkShowcase";
import BrandLogos from "./components/BrandLogos";
import CTABanner from "./components/CTABanner";
import Footer from "./components/Footer";
import BackgroundVideo from "./components/BackgroundVideo";

export default function App() {
  return (
    <div className="text-gray-800">
      <NavBar/>
      <Hero />
      <BackgroundVideo/>
      <FeatureStrip />
      <AboutSection />
      <WorkShowcase />
      {/* <BrandLogos /> */}
      <CTABanner />
      <Footer />
    </div>
  );
}
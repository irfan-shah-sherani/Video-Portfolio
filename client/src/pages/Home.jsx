import React from "react";
import Hero from "../components/Hero";
import FeatureStrip from "../components/FeatureStrip";
import AboutSection from "../components/AboutSection";
import WorkShowcase from "../components/WorkShowcase";
import BrandLogos from "../components/BrandLogos";
import CTABanner from "../components/CTABanner";
import BackgroundVideo from "../components/BackgroundVideo";

export default function App() {
  return (
    <div className="text-gray-800">
      <Hero />
      <BackgroundVideo/>
      <FeatureStrip />
      <AboutSection />
      <WorkShowcase />
      <CTABanner />
    </div>
  );
}
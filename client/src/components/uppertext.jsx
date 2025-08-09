import React from 'react'
import { motion as Motion } from "framer-motion";

const Uppertext = () => {
  return (
   <Motion.section
  className="w-full h-auto  overflow-hidden px-4 py-8"
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: -30 }}
  transition={{ duration: 0.6 }}
>
  <div className="max-w-2xl mx-auto flex flex-col justify-center items-center text-center">
    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
      How We Work
    </h1>
    <p className="text-base md:text-lg text-gray-700 mb-4">
      Ongoing partnerships work best. They give you consistent access to our full-service expertise while we focus on delivering that personal small-agency experience to you.
    </p>
    <p className="text-base md:text-lg text-gray-700">
      Each engagement scope is tailored to your needs to help you hit the ground running, build a strong foundation, and scale up as needed.
    </p>
  </div>
</Motion.section>

  )
}

export default Uppertext
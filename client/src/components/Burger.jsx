import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotFoundPage from '../pages/NotFoundPage';
import { Link } from 'react-router-dom';
import { FaTiktok,FaFacebookF,FaInstagram  } from "react-icons/fa";

const pageVariants = {
  open: { opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.5, ease: 'easeOut', staggerChildren: 0.08, delayChildren: 0.15 } },
  closed: { opacity: 1, scale: 0.98, transition: { type: 'spring', duration: 0.5, ease: 'easeOut',staggerChildren: 0.08, delayChildren: 0.15 } }
};

const itemVariants = {
    open: { 
        x: 0, 
        opacity: 1, 
        transition: { type: 'spring', stiffness: 220, damping: 22 } 
    },
    closed: { 
        x: 120, 
        opacity: 0, 
        transition: { duration: 0.12 } 
    }
  }
export default function Burger() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!isMobile) return <NotFoundPage />;

  return (
    <AnimatePresence>
      <motion.main
        variants={pageVariants}
        initial="closed"
        animate="open"
        exit="closed"
        className="h-screen w-screen bg-black fixed text-white flex flex-col justify-center items-end pr-8 md:pr-16 bottom-2"
      >
        <motion.ul className="text-4xl md:text-6xl font-sans font-bold text-right space-y-2">
          <motion.li variants={itemVariants} className=" hover:text-gray-400">
            <Link to="/service">Services</Link>
          </motion.li>
          <motion.li variants={itemVariants} className=" hover:text-gray-400">
            <Link to="/price">Pricing</Link>
          </motion.li>
          <motion.li variants={itemVariants} className=" hover:text-gray-400">
            <Link to="/about">About</Link>
          </motion.li>
        </motion.ul>

        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold font-sans mt-12 text-right">
          <Link to="/contact" className="hover:text-gray-400 transition-colors duration-300">Contact</Link>
        </motion.h2>

        <motion.div variants={itemVariants} className="mt-20 text-right">
          <p className="text-lg font-sans">Follow us on social</p>
          <div className="flex justify-end gap-4 mt-2">
            <a href="#" className="hover:text-gray-400 transition-colors duration-300">
              <FaInstagram/>
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors duration-300">
              <FaFacebookF/>
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors duration-300">
              <FaTiktok/>
              </a>
          </div>
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}

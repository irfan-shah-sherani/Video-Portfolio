import React, { useState } from 'react';
import { FaTiktok,FaFacebookF,FaInstagram  } from "react-icons/fa";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

// SVG Icon Components
const TikToke = () => (
  <FaTiktok/>
);

const InstagramIcon = () => (
    <FaInstagram />
);

const FacebookIcon = () => (
  <FaFacebookF/>
);


const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-black group-hover:translate-x-1 transition-transform">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);


export default function Footer(){
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!whatsapp) return;
    setLoading(true);
    setSent(false);
    try {
      const response = await axios.post('https://video-portfolio-backend.onrender.com/api/contact', { whatsapp });
      if (response.status === 200) {
        setSent(true);
        setWhatsapp('');
      }
    } catch (err) {
      console.error('Footer lead failed:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-50 text-black font-sans">
      <div className="container mx-auto px-6 py-10 lg:py-10">
        
        {/* Top Section: Heading and Button */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-6">
            Ready to make<br />things happen?
          </h2>
          <NavLink to="/contact">
            <button className="bg-black text-white px-8 py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors pointer">
              Let's chat!
            </button>
          </NavLink>
        </div>

        {/* Middle Section: Links and Newsletter */}
        <div className="flex flex-col md:flex-row gap-10 mb-5">

          {/* Column 2: Office and Social */}
          <div className="md:basis-3/12">
            {/* <h3 className="font-bold mb-4">Office</h3> */}
            <a href=''><p className="mb-4 text-sm cursor-pointer">+92 327 5313473</p></a>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/trimzo.co/" aria-label="TikTok"><TikToke/></a>
              <a href="https://www.instagram.com/trimzo.co/" aria-label="Instagram"><InstagramIcon /></a>
              <a href="" aria-label="Facebook"><FacebookIcon /></a>
            </div>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div className="md:basis-6/12">
            <h3 className="font-bold mb-2">Edit better. Share more.</h3>
            <p className="text-gray-600 mb-6">
             Make videos that stand out. Our all-in-one platform has everything you need to create, polish, and publish professional-quality content in minutes.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="relative group">
                <input
                  type="tel"
                  placeholder="Enter WhatsApp number*"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  className="w-full bg-gray-200 py-4 pl-4 pr-12 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button type="submit" disabled={loading} className="absolute inset-y-0 right-0 flex items-center pr-4" aria-label="Submit email">
                  <ArrowRightIcon />
                </button>
              </div>
              {sent && <p className="mt-2 text-green-600 text-sm">Submitted! We'll reach out soon.</p>}
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal Links */}
        <div className="border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p className="mb-0 md:mb-0">&copy; Trimzo 2025</p>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Use</a></li>
            <li><a href="#" className="hover:underline">Cookies Policy</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

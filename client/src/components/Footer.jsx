import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-0">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Section */}
        <div className="text-sm text-gray-300">
          © 2025 our Company. All rights reserved.
        </div>

        {/* Middle Section - Optional Links */}
        <div className="flex space-x-4 text-sm">
          <a href="#" className="hover:underline text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:underline text-gray-300">Terms</a>
          <a href="#" className="hover:underline text-gray-300">Contact</a>
        </div>

        {/* Right Section - Socials */}
        <div className="flex space-x-3">
          <a href="#" className="hover:text-blue-400">
            <Facebook size={25} />
          </a>
          <a href="#" className="hover:text-sky-400">
            <Twitter size={25} />
          </a>
          <a href="#" className="hover:text-pink-400">
            <Instagram size={25} />
          </a>
          <a href="#" className="hover:text-gray-400">
            <Github size={25} />
          </a>
        </div>
      </div>
    </footer>
  );
}

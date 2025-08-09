import React from 'react';
import { NavLink } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop'

// Main App component
export default function App() {
    return (
        <div className="bg-zinc-900 text-white min-h-screen font-sans p-8 md:p-16">
            <ScrollToTop/>
            {/* Services Section - First Layout */}
            <div className="flex flex-col md:flex-row mb-16 md:mb-32">
                {/* Left Column (Heading) */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Editing</h1>
                    <p className="text-lg text-zinc-400">
                        We specialize in video editing for brands and creative teams, transforming raw footage into engaging stories that capture attention, build brand identity, and boost engagement.
                    </p>
                </div>
                {/* Right Column (Details) */}
                <div className="w-full md:w-1/2 text-zinc-400 text-sm md:text-base leading-relaxed">
                    <p className="mb-4 leading-loose">
                        Do you have hours ofxx footage but not enough time to make it shine? We can help.

                        <br />Our work goes beyond simple cuts; we thoughtfully integrate your brand's style, sound, and message to create a seamless final product. We align with your vision and bring fresh ideas to help your content stand out. We know that creating effective video content requires a mix of technical skill and creative storytelling. If you're ready to focus on what matters and let a team of professionals handle the rest, we're here to help.        </p>
                    <NavLink to='/price'>
                        <button className="bg-white text-zinc-900 font-semibold py-2 px-4 rounded-md mt-4 hover:bg-zinc-300 transition-colors">
                            See Our Pricing Packages
                        </button>
                    </NavLink>
                    
                </div>
            </div>

            {/* Our Approach Section - Second Layout */}
            <div className="flex flex-col mb-16 md:mb-32">
                <div className="w-full md:w-1/2 mb-8 md:mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">Our Approach</h2>
                </div>

                {/* Three-column card layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Card 1 */}
                    <div className="flex-1 bg-zinc-800 p-8 rounded-lg shadow-sm hover:shadow-sm hover:shadow-blue-500">
                        <span className="text-lg font-bold text-zinc-400">Professional Videography</span>
                        <p className="mt-4 text-xl">
                            High-end cameras, drones, lighting, and experienced cinematographers.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className="flex-1 bg-zinc-800 p-8 rounded-lg  hover:shadow-sm hover:shadow-blue-500">
                        <span className="text-lg font-bold text-zinc-400">Video Editing</span>
                        <p className="mt-4 text-xl">
                            Color grading, motion graphics, and sound design by our expert team.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className="flex-1 bg-zinc-800 p-8 rounded-lg shadow-sm hover:shadow-sm hover:shadow-blue-500">
                        <span className="text-lg font-bold text-zinc-400">Brand Storytelling</span>
                        <p className="mt-4 text-xl">
                            We help you tell powerful, emotional stories that grow your brand.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

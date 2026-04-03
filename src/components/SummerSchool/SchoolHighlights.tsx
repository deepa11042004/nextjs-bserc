import React from "react";
import { Play } from "lucide-react";

const SchoolHighlights = () => {
  return (
    <section className="h-screen w-full py-12 sm:py-16 px-4 bg-black">
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
        bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 p-6 sm:p-8"
      >
        {/* Heading */}
        <h2 className="text-2xl text-center sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
          Def-Space Summer School Highlights
        </h2>

        {/* Subheading */}
        <p className="  text-sm sm:text-base font-semibold text-blue-400 mb-2 py-2">
          Dedicated modules on career prospects in Defence & Space Science,
          Computing, and Advanced Technologies, covering:
        </p>

        {/* List */}
        <ul className="text-gray-400 text-sm sm:text-base space-y-3 mb-6">
          {[
           
            "Pathways in ISRO, DRDO, HAL, private space enterprises, and Defence Public Sector Undertakings",
            "Emerging roles in Defence Technology, Space Exploration, Unmanned Aerial Vehicles (UAVs), and AI-driven systems",
            "Interactive sessions with industry experts and mentors",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Play className="text-orange-500 h-4 w-4 mt-1" fill="currentColor" />
              <span>{item}</span>
            </li>
          ))}
        </ul>


        <p className="  text-sm sm:text-base font-semibold text-blue-400 mb-2 py-2">
         Key Programme Highlights

        </p>

        <ul className="text-gray-400 text-sm sm:text-base space-y-3 mb-6">
          {[
           
            "Comprehensive curriculum tailored for Classes VI–XII learners",
            "Hands-on, project-based learning with industry-standard tools and simulations",
            "On-demand access to recorded sessions for flexible, self-paced review",
            "Emphasis on foundational skills for careers in Defence, Space, and Advanced Technology sectors",
          ].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <Play className="text-orange-500 h-4 w-4 mt-1" fill="currentColor" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SchoolHighlights;
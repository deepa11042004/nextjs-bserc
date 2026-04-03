import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge with top glow */}
        <div className="relative inline-block mb-10">
          {/* Top center glow effect */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-cyan-400/30 blur-2xl rounded-full" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-cyan-300/40 blur-xl rounded-full" />
          
          {/* Badge */}
          <span className="relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-widest text-cyan-300 border border-cyan-500/50 bg-cyan-950/20 backdrop-blur-sm">
            NATIONAL SPACE DAY
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-6 text-white">
          India's Def-Space 
          <br />
          Sector Revolution
        </h1>

        {/* Subtitle */}
        <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-6">
          Transforming India's Defence & Space Sector
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Advancing scientific innovation, Defence & Space literacy, and <br />
          research excellence for Viksit Bharat 2047
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-semibold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200">
            Explore
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Stat 1 */}
          <div className="group relative px-6 py-10 bg-gradient-to-b from-cyan-950/30 to-transparent border border-cyan-900/30 rounded-lg hover:border-cyan-700/50 transition-all duration-300">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-white mb-2">
                2047
              </h3>
              <p className="text-sm md:text-base text-cyan-400/80 font-semibold tracking-wider uppercase">
                Viksit Bharat Goal
              </p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="group relative px-6 py-10 bg-gradient-to-b from-gray-800/30 to-transparent border border-gray-700/30 rounded-lg hover:border-gray-600/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gray-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-5xl font-bold font-serif text-white mb-2">
                Chandrayaan 
              </h3>
              <h3 className="text-4xl md:text-6xl font-bold font-serif text-white mb-2">
                3
              </h3>
              <p className="text-sm md:text-base text-gray-400/80 font-semibold tracking-wider uppercase">
                Moon Success
              </p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="group relative px-6 py-10 bg-gradient-to-b from-orange-950/20 to-transparent border border-orange-900/20 rounded-lg hover:border-orange-700/30 transition-all duration-300">
            <div className="absolute inset-0 bg-orange-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 text-center">
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-white mb-2">
                23 Aug
              </h3>
              <p className="text-sm md:text-base text-orange-400/80 font-semibold tracking-wider uppercase">
                National Space Day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
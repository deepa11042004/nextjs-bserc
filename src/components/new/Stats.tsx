import React from "react";

const Stats = () => {
  return (
    <section className="w-full h-full bg-black text-white flex flex-col items-center justify-center px-6 pt-10">
      
      <div className="w-full max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Stat 1 */}
          <div className="group relative px-6 py-10 bg-gradient-to-b from-cyan-950/30 to-transparent border border-cyan-900/30 rounded-lg hover:border-cyan-700/50 transition-all duration-300">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 text-center ">
              <h3 className="text-4xl md:text-5xl font-bold font-serif text-white mb-2 ">
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

export default Stats;

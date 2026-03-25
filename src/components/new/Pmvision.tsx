import React from "react";

const PMVision: React.FC = () => {
  return (
    <section className="w-full py-20 px-6 bg-[linear-gradient(to_right,#0d1a1a,#0f1913,#15170d,#1b140a,#1d110e)] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center h-[30vh] ">
        {/* Badge */}
        <div className="inline-block mb-6">
          <span className="px-5 py-2 rounded-full text-xs font-bold tracking-wider text-yellow-100/90 border border-yellow-600/40 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 backdrop-blur-sm">
            HON'BLE PRIME MINISTER'S VISION
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold font-serif text-white mb-6 leading-tight">
          Transforming India's Space Sector
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl max-w-4xl leading-relaxed">
          Leading India's space transformation through visionary leadership and strategic initiatives for
          enhanced space education and research excellence.
        </p>
      </div>
    </section>
  );
};

export default PMVision;
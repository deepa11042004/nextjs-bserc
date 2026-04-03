import React from "react";

const ProgramOverview: React.FC = () => {
  return (
        <section className="  w-full py-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* LEFT: TEXT */}
        <div className="flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            Programme Overview
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            The {""}
            <span className="text-white font-semibold">
              Bharat Space Education Research Centre
            </span>{" "}
            is pleased to announce the{" "}
            <span className="text-orange-400 font-semibold">
              Def-Space Summer School Programme 2026
            </span>{" "}
            , a flagship 6-week intensive online initiative under the Def-Space
            Education and Innovation.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            This structured summer school delivers high-quality, hands-on
            education in Space Science, Defence Technology, and Emerging
            Technologies to school students. It cultivates innovation, technical
            proficiency, and career awareness among young learners, advancing
            India's {""}
            <span className="text-cyan-400 font-semibold">
              Viksit Bharat @2047.
            </span>{" "}
            {""}vision and the{" "}
            <span className="text-orange-400 font-semibold">
              Atmanirbhar Bharat{" "}
            </span>
            commitment to technological self-reliance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramOverview;

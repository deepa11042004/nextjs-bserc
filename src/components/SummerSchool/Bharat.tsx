import React from "react";

const Bharat: React.FC = () => {
  return (
    <section className="  w-full py-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* LEFT: TEXT */}
        <div className="flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            Bharat Def-Space Summer School 2026
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            The Government of India, under the visionary leadership of Hon'ble
            PM Shri Narendra Modi, has initiated groundbreaking reforms in the
            space sector. These initiatives are designed to enhance and promote
            defence & space education, research, and development across the
            nation.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            A key highlight is the celebration of {""}
            <span className="text-orange-400 font-semibold">
              National Space Day on August 23
            </span>
            {""} which underscores India's commitment to fostering innovation
            and scientific excellence in space exploration. In alignment with
            the{" "}
            <span className="text-cyan-400 font-semibold">
              Viksit Bharat Abhiyan@2047.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Bharat;

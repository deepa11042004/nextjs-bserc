import React from "react";
interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "1,150", label: "Merit Seats" },
  { value: "45 Days", label: "Duration" },
  { value: "Online", label: "Format" },
   
];
const Meritorious: React.FC = () => {
  return (
    <section className="  w-full py-8 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* LEFT: TEXT */}
        <div className="flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            Special Highlight for Meritorious Candidates
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            {""}
            <span className="text-orange-400 font-semibold">
              Meritorious candidates are required to pay only the examination
              fee;
            </span>
            {" "} the training cost for selected candidates will be
            {" "}
            <span className="text-cyan-400 font-semibold">
              fully borne by Bharat Space Education Research Centre
            </span>  {" "}
            under the
            {" "}
            <span className="text-cyan-400 font-semibold">
              Bharat Def-Space Innovation Corridor for Viksit Bharat Abhiyan
              @2047.
            </span>
            {""}
          </p>



           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-center hover:scale-105 transition duration-300"
            >
              <p className="text-4xl sm:text-5xl font-extrabold   font-serif  bg-gradient-to-r from-[#1E90FF] to-[#FF6B35] text-transparent bg-clip-text">
                {stat.value}
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        </div>


       
      </div>
    </section>
  );
};

export default Meritorious;

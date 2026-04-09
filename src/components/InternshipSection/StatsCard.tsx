import React from "react";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "1150+", label: "Internship seats" },
  { value: "350+", label: "Lateral entry seats" },
  { value: "20+", label: "Mentors" },
  { value: "45 Days", label: "Duration" },
];

const StatsCard: React.FC = () => {
  return (
    <section className="  w-full py-10 sm:py-16 px-4 bg-black">
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 p-6 sm:p-8"
      >
        <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center mb-10">
          Program Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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
    </section>
  );
};

export default StatsCard;
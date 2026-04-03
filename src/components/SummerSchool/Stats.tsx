import React from "react";

interface StatItem {
  value: string;
  label: string;
  tagline: string;
}

const stats: StatItem[] = [
  { value: "6", label: "Weeks Programme", tagline: "42 Days Total" },
  { value: "2", label: "Batches 2026", tagline: "May & July" },
  { value: "6", label: "Tech Domains", tagline: "All Covered" },
  { value: "VI–XII", label: "Classes Eligible", tagline: "All Boards" },
];

const Stats: React.FC = () => {
  return (
    <section className="  w-full py-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto rounded-xl border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 p-6 sm:p-8">
         

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 text-center hover:scale-105 transition duration-300"
            >
              <p className="text-4xl sm:text-5xl font-extrabold   font-serif  bg-gradient-to-r from-[#1E90FF] to-[#FF6B35] text-transparent bg-clip-text">
                {stat.value}
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-300">
                {stat.label}
              </p>
              <p className="mt-2 text-sm sm:text-base  text-orange-300">
                {stat.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

import React from "react";
import { Plane, Rocket, Shield, Cpu, Lightbulb, Layers } from "lucide-react";

type Track = {
  title: string;
  desc: string;
  days: string;
  icon: React.ReactNode;
};

const tracks = [
  {
    title: "Advanced Drone Technology (AIR Taxi)",
    desc: "Master autonomous flight systems, aerial imaging, and urban air mobility with cutting-edge drone engineering.",
    days: "Friday – Sunday (3 days)",
    icon: <Layers />,
  },
  {
    title: "Defence Drone Technology",
    desc: "Explore military-grade drone systems, surveillance technology, and advanced tactical applications.",
    days: "Friday – Sunday (3 days)",
    icon: <Shield />,
  },
  {
    title: "Aircraft Design Technology",
    desc: "Learn aerodynamic principles, aircraft design optimization, and modern aviation engineering practices.",
    days: "Friday – Sunday (3 days)",
    icon: <Plane />,
  },
  {
    title: "Rocketry",
    desc: "Explore rocket propulsion, aerodynamics, and launch systems. Build and test your own rockets.",
    days: "Friday – Sunday (3 days)",
    icon: <Rocket />,
  },
  {
    title: "Robotics & Artificial Intelligence",
    desc: "Build intelligent robotic systems and develop AI algorithms for autonomous applications and problem-solving.",
    days: "Friday – Sunday (3 days)",
    icon: <Cpu />,
  },
  {
    title: "Project & Innovation for Viksit Bharat@2047",
    desc: "Work on innovative projects aligned with India's development goals and future technology initiatives.",
    days: "Monday – Thursday (4 days)",
    icon: <Lightbulb />,
  },
];

export const Services: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto rounded-xl border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 p-6 sm:p-8">
        <div className="flex justify-center text-center items-center gap-2 py-3">
          {/* Vertical line accent */}
          <div className="w-1 h-3 bg-orange-400"></div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400 ">
            Technical Tracks
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center  ">
          6 Intensive Learning Paths
        </h2>

        <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto py-4 leading-relaxed">
          Choose your specialty and master cutting-edge technologies in
          aerospace and defence.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-8">
          {tracks.map((track) => (
            <div
              key={track.title}
              className="group rounded-2xl border border-white/10 bg-[#161616] p-6 flex flex-col gap-4 transition-all duration-300 hover:border-blue-400 "
            >
              {/* Icon */}
              <div
                aria-hidden="true"
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30"
              >
                {track.icon}
              </div>

              {/* Title */}
              <h3 className="text-[15px] font-semibold text-white leading-snug">
                {track.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] text-white/60 leading-relaxed flex-1">
                {track.desc}
              </p>

              {/* Days */}
              <p className="text-[12px] font-medium text-sky-400 mt-auto">
                {track.days}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

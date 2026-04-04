"use client";

import React from "react";
import { Target, Eye, Award, LucideIcon } from "lucide-react";

type EventItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
};

type ReasonItem = {
  icon: string;
  title: string;
  desc: string;
  color: string;
};

type LearnItem = {
  icon: string;
  title: string;
  desc: string;
  color: string;
};

const events: EventItem[] = [
  {
    icon: Target,
    title: "OUR MISSION",
    desc: "To democratize access to high-quality defence and space education for school students across India, fostering innovation and technological self-reliance.",
    color: "text-blue-400",
  },
  {
    icon: Eye,
    title: "OUR VISION",
    desc: "Aligned with Viksit Bharat @2047 — creating a generation of technologically empowered youth who contribute to India's space and defence sector.",
    color: "text-orange-400",
  },
  {
    icon: Award,
    title: "RECOGNITION",
    desc: "BSERC certificates are recognised as marks of excellence, paving pathways to careers in ISRO, DRDO, HAL and leading private space enterprises.",
    color: "text-blue-400",
  },
];

const reasons: ReasonItem[] = [
  {
    icon: "⚡",
    title: "Cutting-edge Curriculum",
    desc: "Industry-aligned syllabus covering the latest in defence and space",
    color: "text-blue-400",
  },
  {
    icon: "🌐",
    title: "Fully Online",
    desc: "Access from anywhere in India or abroad — no travel required.",
    color: "text-orange-400",
  },
  {
    icon: "🏅",
    title: "Merit Scholarships",
    desc: "Performance-based scholarships for deserving students",
    color: "text-blue-400",
  },
  {
    icon: "👨‍🏫",
    title: "Expert Mentors",
    desc: "Learn from scientists, engineers, and defence professionals",
    color: "text-orange-400",
  },
];

const learn: LearnItem[] = [
  {
    icon: "🚀",
    title: "Advanced Rocketry",
    desc: "Design launch systems, understand propulsion engineering, and develop satellite payloads",
    color: "text-blue-400",
  },
  {
    icon: "🛡️",
    title: "Defence Drone Technology",
    desc: "Master tactical UAV applications, surveillance systems, and autonomous flight control",
    color: "text-orange-400",
  },
  {
    icon: "🚁",
    title: "Air Taxi & Next-Gen UAVs",
    desc: "Explore urban air mobility, fleet management, and future of aerial transportation",
    color: "text-blue-400",
  },
  {
    icon: "✈️",
    title: "Aircraft Design & Simulation",
    desc: "Learn aerodynamics, CFD modelling, and structural analysis",
    color: "text-orange-400",
  },
  {
    icon: "🤖",
    title: "Robotics & Automation",
    desc: "Build autonomous systems, sensor integration, and industrial applications",
    color: "text-blue-400",
  },
  {
    icon: "🧠",
    title: "Artificial Intelligence",
    desc: "Master ML fundamentals, neural networks, and real-world defence/space applications",
    color: "text-orange-400",
  },
];

const Page: React.FC = () => {
  return (
    <section className="w-full min-h-screen bg-black py-12 px-4 flex justify-center">
      {/* ✅ FIXED missing div */}
      <div className="w-full max-w-6xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
            About the Programme
          </h2>

          <p className="text-gray-300 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            The{" "}
            <span className="text-[#FF6B35] font-medium">
              Bharat Space Education Research Centre (BSERC)
            </span>{" "}
            is a premier institution dedicated to advancing space science and
            defence technology education across India.
          </p>
        </div>

        {/* Events */}
        <div className="bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => {
              const Icon = event.icon;
              return (
                <div
                  key={i}
                  className="bg-[#1E293B] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#FF6B35]/50 transition"
                >
                  <div className="w-14 h-14 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Icon className={`w-7 h-7 ${event.color}`} />
                  </div>

                  <h4 className="text-white font-semibold text-lg mb-2">
                    {event.title}
                  </h4>

                  <p className="text-gray-400 text-sm">{event.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Why Def-Space Summer School?
          </h2>
        </div>

        <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#1E90FF]/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((item, i) => (
              <div
                key={i}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#1E90FF]/50 transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learn */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            What You'll Learn
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Master industry-relevant skills across six specialized domains
          </p>
        </div>

        {/* ✅ FIX: better grid for 6 items */}
        <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#1E90FF]/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {learn.map((item, i) => (
              <div
                key={i}
                className="bg-[#1E293B] border border-white/10 rounded-xl p-6 flex flex-col items-center text-center hover:border-[#1E90FF]/50 transition"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h4 className="text-white font-semibold text-lg mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Career Card */}
        <div className="rounded-xl border border-cyan-500/40 p-6 bg-blue-900/10 backdrop-blur-sm text-center max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">👨‍🏫</span>
            <h3 className="text-white font-semibold text-lg">
              Career Guidance Sessions
            </h3>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed text-left">
            Each module includes career guidance sessions with
            <span className="text-blue-500 font-bold"> ISRO, DRDO, and HAL professionals</span>, connecting
            classroom learning to real career opportunities in India's defence
            and space sectors.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;

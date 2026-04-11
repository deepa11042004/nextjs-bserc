"use client";
import React from "react";
import {
  Network,
  Briefcase,
  TrendingUp,
  Award,
  Cpu,
  BookOpen,
  Users,
  Zap,
  Globe,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
};

const features: Feature[] = [
  {
    title: "Networking Platform",
    description:
      "Connect with innovators, entrepreneurs, investors, and industry leaders in the defence and space sectors on a unified digital platform.",
    icon: Network,
    accent: "blue",
  },
  {
    title: "Pitch & Showcase",
    description:
      "Present your innovations, startups, and ideas to investors, partners, and industry experts through structured pitch sessions.",
    icon: Briefcase,
    accent: "orange",
  },
  {
    title: "Funding Access",
    description:
      "Connect with venture capital funds, angel investors, and government grants. Access iDEX funding (₹1.5-25 Crore) for defence innovations.",
    icon: TrendingUp,
    accent: "blue",
  },
  {
    title: "Mentorship & Advisory",
    description:
      "Get guidance from industry experts, former government officials, and experienced advisors in defence and space technologies.",
    icon: Award,
    accent: "orange",
  },
  {
    title: "Technology Transfer",
    description:
      "Access cutting-edge defence and space technologies, research resources, and ISRO collaborations for your innovations.",
    icon: Cpu,
    accent: "blue",
  },
  {
    title: "Skill Development",
    description:
      "Participate in workshops, training programs, and certification courses on AI, quantum computing, drone technology, and more.",
    icon: BookOpen,
    accent: "orange",
  },
  {
    title: "Community Building",
    description:
      "Join a thriving community of innovators, researchers, and entrepreneurs driving India's defence and space revolution.",
    icon: Users,
    accent: "blue",
  },
  {
    title: "Market Access",
    description:
      "Connect with government procurement agencies, defence PSUs, and international buyers for your products and services.",
    icon: Zap,
    accent: "orange",
  },
  {
    title: "Global Partnerships",
    description:
      "Access international collaboration opportunities, export markets, and partnerships with global space and defence organizations.",
    icon: Globe,
    accent: "blue",
  },
];

const page: React.FC = () => {
 const cardStyles =
  "rounded-xl mb-6 p-4 sm:p-6 md:p-8 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]";

  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-4xl text-center font-bold font-serif text-white mb-6 leading-tightlg:text-4xl ">
          Our Vision
        </h1>

       <div className={cardStyles}>
    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed break-words">
      To advance education and research in space and defence technologies,
      computing, and innovation to accelerate national development through
      cutting-edge research and technological excellence.
    </p>
  </div>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isBlue = feature.accent === "blue";

            return (
              <div
                key={i}
                className={`relative rounded-xl p-6 border-l-4 transition-all duration-300 hover:scale-[1.02]
                ${
                  isBlue
                    ? "border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-400/30"
                    : "border-orange-500 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-400/30"
                }`}
              >
                {/* Icon */}
                <div
                  className={`mb-4 ${
                    isBlue ? "text-blue-400" : "text-orange-400"
                  }`}
                >
                  <Icon className="w-10 h-10" />
                </div>

                {/* Title */}
                <h4 className="text-white font-semibold text-lg mb-2">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default page;

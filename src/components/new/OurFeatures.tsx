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
    title: "Interactive Exhibits",
    description:
      "Step into our immersive exhibits and journey through the solar system, explore distant galaxies, and uncover the secrets of black holes. Our interactive displays will transport you to worlds beyond your imagination.",
    icon: Network,
    accent: "blue",
  },
  {
    title: "Hands-on Experiments",
    description:
      "From building model rockets to simulating lunar landings, our hands-on experiments allow students to experience the thrill of scientific discovery firsthand. Get ready to launch into the cosmos and uncover the principles that govern our universe",
    icon: Briefcase,
    accent: "orange",
  },
  {
    title: "Educational Programs",
    description:
      "Join us for workshops, lectures, and special events led by leading experts in the field of space science. Whether you're interested in astronomy, astrophysics, or space exploration, our educational programs offer something for everyone.",
    icon: TrendingUp,
    accent: "blue",
  },
  {
    title: "Virtual Tours",
    description:
      "Explore the wonders of space from the comfort of your own home with our virtual tours and online resources. Join us as we journey to distant planets, observe celestial phenomena, and unravel the mysteries of the cosmos.",
    icon: Award,
    accent: "orange",
  },
  {
    title: "STEAM Workshops",
    description:
      "Engage in hands-on STEAM workshops. From rocketry workshops to coding challenges, our STEAM programs empower students to explore their interests in science, technology, engineering, arts, and mathematics in a supportive and collaborative environment.",
    icon: Cpu,
    accent: "blue",
  },
  {
    title: "Student Projects",
    description:
      "Showcase your creativity and ingenuity by participating in our student project competitions. Whether you're building a rover prototype or conducting a research project on exoplanets, we provide a platform for students to apply their knowledge and skills to real-world challenges.",
    icon: BookOpen,
    accent: "orange",
  },
   
];

const OurFeatures: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-4xl md:text-4xl text-center font-bold font-serif text-white mb-6 leading-tightlg:text-4xl pb-10">
          Our Features
        </h2>

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

export default OurFeatures;
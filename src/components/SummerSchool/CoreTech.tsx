"use client";
import React from "react";
import {
  
  
  
  Rocket,
  Shield,
  Bot ,
  Plane,
 Send,
 Brain,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
};

const features: Feature[] = [
  {
    title: "Advanced Rocketry",
    description:
      "Design & Launch Systems, Propulsion Engineering, Payload Development",
    icon: Rocket,
    accent: "blue",
  },
  {
    title: "Defence Drone Tech",
    description: "Tactical Applications, Surveillance Systems, Flight Control",
    icon: Shield,
    accent: "orange",
  },
  {
    title: "Air Taxi & UAVs",
    description: "Next-Gen Drones, Urban Air Mobility, Fleet Management",
    icon: Send ,
    accent: "blue",
  },
  {
    title: "Aircraft Design",
    description: "Aerodynamics, CFD Simulation, Structural Analysis",
    icon: Plane,
    accent: "orange",
  },
  {
    title: "Robotics",
    description: "Automation, Autonomous Systems, Sensor Integration",
    icon: Bot ,
    accent: "blue",
  },
  {
    title: "Artificial Intelligence",
    description: "ML Fundamentals, Neural Networks, Real-world Applications",
    icon: Brain,
    accent: "orange",
  },
];

export const CoreTech: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        <div className="flex flex-col gap-3 justify-center items-center">
          <h3 className="text-4xl md:text-4xl text-center font-bold font-serif text-white  leading-tightlg:text-4xl ">
            Core Technology Domains
          </h3>

          <p className="text-center pb-5 text-gray-400  text-sm sm:text-base max-w-2xl mx-auto">
            Master cutting-edge technologies across six specialized tracks
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

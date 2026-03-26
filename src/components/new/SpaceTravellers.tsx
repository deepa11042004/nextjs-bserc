"use client";

import React from "react";
import { Rocket, Star, Globe, Plane, Satellite, Zap } from "lucide-react";

type Traveller = {
  name: string;
  role: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
  details: { label: string; value: string }[];
  description: string;
};

const travellers: Traveller[] = [
  {
    name: "Rakesh Sharma",
    role: "🚀 First Indian in Space",
    icon: Rocket,
    accent: "blue",
    details: [
      { label: "Historic Achievement", value: "First Indian citizen to enter space aboard Soyuz T-11" },
      { label: "Date", value: "April 3, 1984" },
      { label: "Duration", value: "7 days, 21 hours, 40 minutes" },
    ],
    description:
      "Launched from Baikonur Cosmodrome, Sharma docked with Salyut 7 Orbital Station, conducting groundbreaking scientific and technical studies that paved the way for India's space program.",
  },
  {
    name: "Kalpana Chawla",
    role: "👩‍🚀 First Woman of Indian Origin in Space",
    icon: Star,
    accent: "orange",
    details: [
      { label: "Mission", value: "STS-87 Mission (1997)" },
      { label: "Distance", value: "10.4 million miles traveled" },
      { label: "Education", value: " PhD in Aerospace Engineering" },
    ],
    description:
      "Born in Karnal, Punjab, Chawla's pioneering spirit inspired generations. Though her STS-107 mission ended tragically, she received the Congressional Space Medal of Honour posthumously, cementing her legacy as a trailblazer.",
  },
  {
    name: "Sunita Williams",
    role: "🌍 NASA Astronaut & Spacewalk Pioneer",
    icon: Globe,
    accent: "blue",
    details: [
      { label: "Missions", value: "Expeditions 14/15 & 32/33" },
      { label: "Spacewalks", value: "4 spacewalks, 29 hours 17 minutes" },
      { label: "Selection", value: "NASA Astronaut Group, 1998" },
    ],
    description:
      "Selected as a NASA astronaut in 1998, Williams holds the record for most spacewalks by a female astronaut. Her contributions to the International Space Station have been instrumental in advancing human space exploration.",
  },
  {
    name: "Raja Jon Vurputoor Chari",
    role: "✈️ Indian-American Test Pilot & Astronaut",
    icon: Plane,
    accent: "orange",
    details: [
      { label: "Born", value: "June 24, 1977" },
      { label: "Experience", value: "2,000+ flying hours" },
      { label: "Position", value: "Colonel, US Air Force" },
    ],
    description:
      "Graduate of MIT, USAF Academy, and Naval Test Pilot School, Chari was selected to NASA Astronaut Group 22 in June 2017. His expertise in test piloting and engineering continues to advance human spaceflight missions.",
  },
  {
    name: "Subhash Chandra",
    role: "📡 ISRO Scientist",
    icon: Satellite,
    accent: "blue",
    details: [
      { label: "Contribution", value: "Led India's space program development" },
      { label: "Field", value: "Space Science & Technology" },
      { label: "Organization", value: "Indian Space Research Organisation (ISRO)" },
    ],
    description:
      "A visionary in the field of space science, Chandra has been instrumental in establishing India's presence in the global space community. His leadership and innovations have shaped crucial space missions and research initiatives.",
  },
  {
    name: "Nambi Narayanan",
    role: "🔧 Propulsion Expert",
    icon: Zap,
    accent: "orange",
    details: [
      { label: "Expertise", value: "Rocket Propulsion Technology" },
      { label: "Award", value: "Padma Shri Recipient (2019)" },
      { label: "Contribution", value: "Liquid Rocket Engine Development" },
    ],
    description:
      "A legendary ISRO scientist, Narayanan's pioneering work on India's Vikas Engine has been critical to the success of numerous space missions. His resilience and dedication exemplify the spirit of innovation in space exploration.",
  },
];

const SpaceTravellers: React.FC = () => {
  return (
    <section className="w-full px-4 py-16 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif text-center ">
          Space Travellers - Pride of India
        </h2>

        <p className="text-center text-gray-400 mb-12 text-sm sm:text-base max-w-2xl mx-auto">
          Meet the pioneering Indian astronauts and space explorers who have
          inspired millions.
        </p>

        {/* Grid */}
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {travellers.map((t, i) => {
            const Icon = t.icon;
            const isBlue = t.accent === "blue";

            return (
              <div
                key={i}
                className="relative rounded-2xl p-6 sm:p-8 border border-white/10 
                bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 
                overflow-hidden transition hover:scale-[1.02] hover:shadow-xl"
              >
                {/* Glow Circle */}
                <div
                  className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl
                  ${isBlue ? "bg-blue-500/20" : "bg-orange-500/20"}`}
                />

                {/* Content */}

                <div className="relative z-10">
                  {/* ICON + NAME */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`p-2 rounded-lg
                    ${isBlue ? "bg-blue-500/20" : "bg-orange-500/20"}`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isBlue ? "text-blue-400" : "text-orange-400"
                        }`}
                      />
                    </div>

                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                  </div>
                  {/* Role */}
                  <p className="text-sm font-semibold text-orange-400 mb-4">
                    {t.role}
                  </p>

                  {/* Details Box */}
                  <div
                    className={`mb-4 p-4 rounded-lg border-l-4
                    ${
                      isBlue
                        ? "bg-blue-500/10 border-blue-400"
                        : "bg-orange-500/10 border-orange-400"
                    }`}
                  >
                    {t.details.map((d, idx) => (
                      <p key={idx} className="text-gray-400 text-sm mb-1 leading-relaxed">
                        <span className="text-white font-medium">
                          {d.label}:
                        </span>{" "}
                        {d.value}
                      </p>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SpaceTravellers;

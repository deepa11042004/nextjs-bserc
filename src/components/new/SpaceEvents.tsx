"use client";

import React from "react";
import { Calendar } from "lucide-react";
 

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
    name: "Republic Day",
    role: "📅 January 26",
    icon: Calendar,
    accent: "blue",
    details: [
      { label: "Origin", value: "Adopted 1950 upon Constitution enforcement" },
      { label: "Significance", value: "Celebrates India's democratic constitution and sovereignty" },
       
    ],
    description:
      "Marks the adoption of the Indian Constitution. Features grand parades showcasing India's military strength, technological prowess, and cultural heritage.",
  },
  {
    name: "National Science Day",
    role: "📅 February 28",
    icon: Calendar,
    accent: "orange",
    details: [
      { label: "Origin", value: "Declared 1986-1987 for C.V. Raman's Nobel discovery" },
      { label: "Focus", value: "Promotes scientific awareness and research excellence" },
       
    ],
    description:
      "Celebrates the Raman Effect discovery. Features science exhibitions, seminars, and workshops across institutions to inspire scientific curiosity among youth.",
  },
  {
    name: "National Defence Day",
    role: "📅 March 3",
    icon: Calendar,
    accent: "blue",
    details: [
      { label: "Origin", value: "Observed since ~ 1938" },
      { label: "Purpose", value: "Honors armed forces contributions and sacrifice" },
    ],
    description:
      "Pays tribute to brave soldiers and defence personnel. Celebrates India's military strength, technological advancement, and strategic capabilities in defence sectors.",
  },
  {
    name: "National Technology Day",
    role: "📅 May 11",
    icon: Calendar,
    accent: "orange",
    details: [
      { label: "Origin", value: "Declared 1999 by PM Vajpayee for Pokhran-II tests" },
      { label: "Focus", value: "Celebrates technological self-reliance and innovation" },
    ],
    description:
      "Marks India's successful nuclear tests. Highlights national achievements in science, technology, and strategic defence capabilities.",
  },
  {
    name: "Independence Day",
    role: "📅 August 15",
    icon: Calendar,
    accent: "blue",
    details: [
      { label: "Origin", value: "Since 1947 under PM Jawaharlal Nehru" },
      { label: "Significance", value: "Celebrates freedom and national sovereignty" },
    ],
    description:
      "Celebrates India's independence from British rule. Showcases national progress, military might, and technological achievements including space and defence sectors.",
  },
  {
    name: "National Space Day",
    role: "📅 August 23",
    icon: Calendar,
    accent: "orange",
    details: [
      { label: "Origin", value: "Declared 2023 by PM Modi for Chandrayaan-3 success" },
      { label: "Focus", value: "Promotes space education and scientific awareness" },
      
    ],
    description:
      "Celebrates India's historic Chandrayaan-3 moon landing. Features workshops, seminars, and special events organized by BSERC to inspire youth in space science and technology.",
  },
   {
    name: "World Space Week",
    role: "📅 October 4-10",
    icon: Calendar,
    accent: "blue",
    details: [
      { label: "Origin", value: "UN-designated since 1999" },
      { label: "Scope", value: "International celebration of space science" },
    ],
    description:
      "A global celebration of space exploration achievements. India actively participates through ISRO and educational institutions, showcasing contributions to international space community.",
  },
    {
    name: "Bharat Def-Space Innovation Week",
    role: "📅 Varies (e.g., May)",
    icon: Calendar,
    accent: "orange",
    details: [
      { label: "Origin", value: "Emerging government-led initiative" },
      { label: "Focus", value: "Promotes defence & space innovation ecosystem" },
      
    ],
    description:
      "A cutting-edge platform showcasing innovation in defence and space technologies. Brings together startups, researchers, and industry leaders to drive technological advancement and entrepreneurship in India's defence-space sector.",
  },
];

const SpaceEvents: React.FC = () => {
  return (
    <section className="w-full px-4 py-16 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif text-center ">
         India's Defence & Space Events
        </h2>

        <p className="text-center text-gray-400 mb-12 text-sm sm:text-base max-w-2xl mx-auto">
          Important national observances celebrating India's space and defence achievements
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

export default SpaceEvents;

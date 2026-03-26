import { Rocket, Satellite, Star } from "lucide-react";

type Figure = {
  name: string;
  role: string;
  details: {
    label: string;
    value: string;
  }[];
  achievementsTitle: string;
  achievements: string[];
  description: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
};

const figures: Figure[] = [
  {
    name: "Dr. APJ Abdul Kalam",
    role: "🚀 Missile Man of India",
    details: [
      {
        label: "Timeline",
        value: "ISRO (1969-1982) | DRDO Project Director",
      },
      {
        label: "Presidency",
        value: "11th President of India (2002-2007)",
      },
    ],
    achievementsTitle: "Key Contributions",
    achievements: [
      "SLV-3 & PSLV Project: Evolved Indian launch vehicle technology",
      "IGMDP Missiles: Led development of Agni & Prithvi missiles at DRDO",
      "Youth Inspiration: Authored 'Wings of Fire' and inspired generations",
      "Scientific Excellence: Linked to National Science Day & space research",
    ],
    description:
      "His visionary leadership transformed India into a space-faring and missile-capable nation, making him one of the most respected scientists globally.",
    icon: Rocket,
    accent: "blue",
  },
  {
    name: "Dr. A.S. Kiran Kumar",
    role: "🛰️ ISRO Chairman (2015-2018)",
    details: [
      {
        label: "Position",
        value: "ISRO Chairman & Vikram Sarabhai Professor",
      },
      {
        label: "Current Role",
        value: "Space Commission Member",
      },
    ],
    achievementsTitle: "Notable Achievements",
    achievements: [
      "Mars Orbiter Mission (Mangalyaan): Successful interplanetary mission",
      "World Record: Launched 104 satellites in single mission",
      "Earth Observation: Advanced remote sensing capabilities",
      "International Collaboration: Enhanced ISRO's global partnerships",
    ],
    description:
      "Under his leadership, ISRO achieved unprecedented feats in satellite launches and maintained its position as a leading space agency globally.",
    icon: Satellite,
    accent: "orange",
  },
  {
    name: "S. Somanath",
    role: "🌙 ISRO Chairman (2022-2025)",
    details: [
      {
        label: "Tenure",
        value: "January 2022 - January 2025",
      },
      {
        label: "Expertise",
        value: "Launch vehicle systems & spacecraft design",
      },
    ],
    achievementsTitle: "Stellar Accomplishments",
    achievements: [
      "Chandrayaan-3 Success: Historic lunar south pole landing (2023)",
      "Aditya-L1 Mission: Solar observation breakthrough",
      "Gaganyaan Programme: Advanced human spaceflight preparations",
      "Multiple Missions: Sustained ISRO's mission success rate",
    ],
    description:
      "His transformational leadership during critical missions positioned India as a premier space power and inspired National Space Day on August 23, 2023.",
    icon: Star,
    accent: "blue",
  },
];
const KeyFigures = () => {
  return (
    <section className="w-full px-4 py-16 bg-black">

      <div className="bg-gradient-to-br from-[#1E90FF]/5 to-[#FF6B35]/5">
            
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
          Key Defence & Space Figures
        </h2>
        <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          Visionary leaders who shaped India's space and defence sectors
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {figures.map((fig, i) => {
          const Icon = fig.icon;
          const isBlue = fig.accent === "blue";

          return (
            <div
              key={i}
              className="relative rounded-2xl p-6 sm:p-8 border border-white/10 
              bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 
              overflow-hidden hover:scale-[1.02] transition"
            >
              {/* Glow */}
              <div
                className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl
                ${isBlue ? "bg-blue-500/20" : "bg-orange-500/20"}`}
              />

              <div className="space-y-4">
  {/* ICON + NAME */}
  <div className="flex items-center gap-3">
    <div
      className={`p-2 rounded-lg ${
        isBlue ? "bg-blue-500/20" : "bg-orange-500/20"
      }`}
    >
      <Icon
        className={`w-6 h-6 ${
          isBlue ? "text-blue-400" : "text-orange-400"
        }`}
      />
    </div>

    <h3 className="text-lg font-bold text-white">{fig.name}</h3>
  </div>

  {/* Role */}
  <p className="text-sm text-orange-400 font-medium">{fig.role}</p>

  {/* Dynamic Details (Timeline, Presidency, etc.) */}
  <div
    className={`p-3 rounded-lg border-l-4 ${
      isBlue
        ? "bg-blue-500/10 border-blue-400"
        : "bg-orange-500/10 border-orange-400"
    }`}
  >
    {fig.details.map((item, idx) => (
      <p key={idx} className="text-sm text-gray-300">
        <strong>{item.label}:</strong> {item.value}
      </p>
    ))}
  </div>

  {/* Achievements */}
  <div className="bg-white/5 rounded-lg p-4">
    <p className="text-sm font-semibold text-white mb-2">
      {fig.achievementsTitle}:
    </p>
    <ul className="text-sm text-gray-400 space-y-1">
      {fig.achievements.map((a, idx) => (
        <li key={idx}>✓ {a}</li>
      ))}
    </ul>
  </div>

  {/* Description */}
  <p className="text-sm text-gray-400 leading-relaxed">
    {fig.description}
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

export default KeyFigures;
import { Key, Lightbulb, Map, Shield } from "lucide-react";

type ProgramType = {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
  sectionTitle: string;
  points: string[];
  footer: string;
};

const programs: ProgramType[] = [
  {
    title: "iDEX Programme",
    subtitle: "Innovations for Defence Excellence",
    icon: Lightbulb,
    accent: "blue",
    sectionTitle: "Focus Areas",
    points: [
      "AI & Machine Learning applications",
      "Advanced drone technologies",
      "Quantum computing systems",
      "Cybersecurity solutions",
    ],
    footer:
      "Startups receive ₹1.5–25 Crore grants through ADITI scheme for innovation development.",
  },
  {
    title: "Defence Corridors",
    subtitle: "Manufacturing & Technology Hubs",
    icon: Map,
    accent: "orange",
    sectionTitle: "Locations",
    points: [
      "Uttar Pradesh: AMCA engine manufacturing",
      "Tamil Nadu: Aerospace tech hub",
    ],
    footer:
      "Promote indigenous defence manufacturing and next-generation technology development for Atmanirbhar Bharat.",
  },
  {
    title: "Armed Forces Legacy",
    subtitle: "Historic Operations & Security",
    icon: Shield,
    accent: "blue",
    sectionTitle: "Key Operations",
    points: [
      "1971 War & Bangladesh Liberation",
      "Kargil 1999 Victory",
      "Operation Vijay & border operations",
    ],
    footer:
      "Focus on advanced border security, counter-terrorism, and maritime defence initiatives.",
  },
];

const KeyDefence = () => {
  return (
    <section className="w-full px-4 py-16 bg-black">
      {/* Container */}
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/10 
      bg-gradient-to-br from-[#1E90FF]/5 to-[#FF6B35]/5 p-6 sm:p-10">

        {/* Heading */}
        <h3 className="text-4xl md:text-4xl text-center font-bold font-serif text-white mb-8">
          Key Defence Programs & Initiatives
        </h3>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = program.icon;
            const isBlue = program.accent === "blue";

            return (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 
                space-y-4 transition hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Icon */}
                <div
                  className={`w-fit p-3 rounded-lg ${
                    isBlue ? "bg-blue-500/20" : "bg-orange-500/20"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isBlue ? "text-blue-400" : "text-orange-400"
                    }`}
                  />
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {program.title}
                  </h4>
                  <p className="text-sm text-orange-400 font-medium">
                    {program.subtitle}
                  </p>
                </div>

                {/* Section */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white">
                    {program.sectionTitle}:
                  </p>

                  <ul className="space-y-1 text-sm text-gray-400">
                    {program.points.map((point, idx) => (
                      <li key={idx}>✓ {point}</li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-white">
                    {program.title === "iDEX Programme"
                      ? "Funding"
                      : program.title === "Defence Corridors"
                      ? "Goals"
                      : "Current Focus"}
                    :
                  </span>{" "}
                  {program.footer}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyDefence;
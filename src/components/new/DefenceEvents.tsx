import { Shield, Cpu, Plane, Flag, Anchor, Zap, Briefcase } from "lucide-react";

type EventType = {
  title: string;
  date: string;
  infoLabel: string; // 👈 Significance / Theme / Focus
  info: string; // 👈 actual text
  points: string[];
  icon: React.ElementType;
  accent: "blue" | "orange";
};

const events: EventType[] = [
  {
    title: "Army Day",
    date: "January 15",
    infoLabel: "Significance",
    info: "Honors Field Marshal K.M. Cariappa, first Indian Army Chief",
    points: [
      "Grand military parades across India",
      "Tributes to armed forces personnel",
      "Defence recruitment drives",
      "Strategic capability demonstrations",
    ],
    icon: Shield,
    accent: "blue",
  },
  {
    title: "National Defence Day",
    date: "March 3",
    infoLabel: "Focus",
    info: "Tributes to armed forces and national security awareness",
    points: [
      "National security seminars",
      "Defence policy discussions",
      "Honors for defence personnel",
      "Youth engagement programs",
    ],
    icon: Shield,
    accent: "orange",
  },
  {
    title: "National Defence Industries Conclave",
    date: "March 19, 2026",
    infoLabel: "Theme",
    info: "iDEX, Defence Development Projects, Self-Reliance",
    points: [
      "Thematic sessions on defence tech",
      "Policymakers & industry leaders",
      "Startup engagement for innovation",
      "Atmanirbhar Bharat initiatives",
    ],
    icon: Cpu,
    accent: "blue",
  },
  {
    title: "Air Force Day",
    date: "October 8",
    infoLabel: "Showcase",
    info: "Aerial displays and fighter jet demonstrations",
    points: [
      "Fighter jet formations & maneuvers",
      "Aeronautical technology display",
      "Public awareness on air defence",
      "Recruitment & career opportunities",
    ],
    icon: Plane,
    accent: "orange",
  },
  {
    title: "Kargil Vijay Diwas",
    date: "July 26",
    infoLabel: "Commemoration",
    info: "1999 Kargil War victory & Operation Vijay",
    points: [
      "War memorials & tributes",
      "Honors for fallen soldiers",
      "Military operations review",
      "National pride & unity",
    ],
    icon: Flag,
    accent: "blue",
  },
  {
    title: "Navy Day",
    date: "December 4",
    infoLabel: "Showcase",
    info: "Naval parades and submarine demonstrations",
    points: [
      "Naval fleet demonstrations",
      "Submarine technology display",
      "Maritime security awareness",
      "Recruitment drives",
    ],
    icon: Anchor,
    accent: "orange",
  },
  {
    title: "DEF-TECH Bharat Bengaluru",
    date: "May 20-22, 2026",
    infoLabel: "Focus",
    info: "Aerospace & Defence Tech Expo with iDEX grants up to ₹25 Crore",
    points: [
      "AI & quantum technology showcase",
      "Drone technology innovations",
      "Aerospace sector demonstration",
      "iDEX startup funding opportunities",
    ],
    icon: Zap,
    accent: "blue",
  },
  {
    title: "Bharat Defence Tech Show (BDTS)",
    date: "2026 (Date TBD)",
    infoLabel: "Platform",
    info: "Defence exports and OEM collaborations",
    points: [
      "Defence manufacturing showcase",
      "International collaborations",
      "Export opportunities",
      "Industry partnerships",
    ],
    icon: Briefcase,
    accent: "orange",
  },
];
const DefenceEvents = () => {
  return (
    <section className="w-full px-4 py-16 bg-black">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-4xl text-center font-bold font-serif text-white mb-6">
          Major Defence Events (2026)
        </h2>
        <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
          India's strategic defence initiatives and technological showcases
          driving self-reliance and innovation
        </p>
      </div>

      {/* Grid */}
      <div className="grid   max-w-6xl mx-auto gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, i) => {
          const Icon = event.icon;

          const isBlue = event.accent === "blue";

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

                  <h3 className="text-lg font-bold text-white">
                    {event.title}
                  </h3>
                </div>

                {/* Date */}
                <p className="text-sm text-orange-400 font-medium mb-3">
                  📅 {event.date}
                </p>

                {/* Description */}
                <div
                  className={`p-3 rounded-lg mb-3 border-l-4 ${
                    isBlue
                      ? "bg-blue-500/10 border-blue-400"
                      : "bg-orange-500/10 border-orange-400"
                  }`}
                >
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">
                      {event.infoLabel}:
                    </span>{" "}
                    {event.info}
                  </p>
                </div>

                {/* Points */}
                <ul className="space-y-1 text-sm text-gray-400">
                  {event.points.map((point, idx) => (
                    <li key={idx}>✓ {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DefenceEvents;

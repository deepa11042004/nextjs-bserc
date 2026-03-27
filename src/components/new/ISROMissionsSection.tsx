import {
  CheckCircle,
  Globe,
  Radio,
  MapPin,
  Microscope,
  Rocket,
  Users,
  Briefcase,
  BookOpen,
} from "lucide-react";

type Stat = {
  value: string;
  label: string;
  sub: string;
  accent: "blue" | "orange";
};

type Category = {
  title: string;
  description: string;
  highlight?: string;
  points: string[];
  icon: any;
  accent: "blue" | "orange";
};

type Minisection = {
  title: string;
  description: string;
  listTitle: string;
  points: string[];
  accent: "blue" | "orange";
};

const stats: Stat[] = [
  {
    value: "70+",
    label: "Successful Launches",
    sub: "PSLV & GSLV missions",
    accent: "blue",
  },
  {
    value: "400+",
    label: "Satellites Deployed",
    sub: "Global & Indian satellites",
    accent: "orange",
  },
  {
    value: "15+",
    label: "Interplanetary Missions",
    sub: "Mars, Moon & Sun",
    accent: "blue",
  },
  {
    value: "50+",
    label: "Research Institutions",
    sub: "Collaborating centers",
    accent: "orange",
  },
];

const categories: Category[] = [
  {
    title: "Earth Observation",
    highlight: "IRS Series & RESOURCESAT :",
    description:
      "provide critical data for agriculture, disaster management, and environmental monitoring across India.",
    points: [
      "Agricultural productivity assessment",
      "Disaster management support",
      "Climate & weather monitoring",
      "Urban planning & resource management",
    ],
    icon: Globe,
    accent: "blue",
  },
  {
    title: "Communication Satellites",
    highlight: "INSAT & GSAT Series :",
    description:
      "enable nationwide telecommunications, broadcasting, and internet connectivity.",
    points: [
      " Nationwide telecommunications",
      "Television broadcasting",
      "Internet & broadband services",
      "Emergency communication systems",
    ],
    icon: Radio,
    accent: "orange",
  },
  {
    title: "Navigation Systems",
    highlight: "NavIC / IRNSS :",
    description: "provides real-time positioning and navigation services.",
    points: [
      "Real-time positioning services",
      "Transportation tracking",
      "Disaster rescue operations",
      "Fleet management systems",
    ],
    icon: MapPin,
    accent: "blue",
  },
  {
    title: "Scientific Missions",
    highlight: "Chandrayaan, Mangalyaan, Aditya-L1 :",
    description: "explore the Moon, Mars, and Sun for groundbreaking discoveries.",
    points: [
      "Lunar exploration & water mapping",
      "Interplanetary observations",
      "Solar physics research",
      "Astrobiology studies",
    ],
    icon: Microscope,
    accent: "orange",
  },
  {
    title: "Launch Vehicles",
    highlight: "PSLV & GSLV : ",
    description: "are India's reliable workhorses for satellite launches with high success rates.",
    points: [
      "PSLV: Proven workhorse (60+ launches)",
      "GSLV: Heavy-lift capability",
      "Domestic & international missions",
      "Commercial launch services",
    ],
    icon: Rocket,
    accent: "blue",
  },
  {
    title: "Human Spaceflight",
    highlight: "Gaganyaan Programme : ",
    description: " aims to send Indian astronauts to Low Earth Orbit.",
    points: [
      "Indian astronaut training",
      "Crew capsule development",
      "Life support systems",
      "Bharat Antariksh Statio",
    ],
    icon: Users,
    accent: "orange",
  },
];

const sections: Minisection[] = [
  {
    title: "ISRO's Vision",
    description:
      "To harness space technology for national development while pursuing space science research and planetary exploration.",
    listTitle: "Key Focus Areas",
    points: [
      "Technological self-reliance",
      "Societal applications",
      "Scientific discovery",
      "Space exploration",
    ],
    accent: "blue",
  },
  {
    title: "ISRO's Mission",
    description:
      "To develop and deliver space-based services and conduct space research to support India's socio-economic development and scientific advancement.",
    listTitle: "Strategic Objectives",
    points: [
      "Satellite operations",
      "Research promotion",
      "Technology transfer",
      "Human resource development",
    ],
    accent: "orange",
  },
];
export default function ISROMissionsSection() {
  return (
    <section className=" w-full py-12  px-4  bg-black  ">
      <div className="max-w-7xl mx-auto rounded-2xl px-6 py-16 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10
           bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 mb-4">
            <CheckCircle className="w-5 h-5 text-orange-400 " />
            <span className="text-sm font-bold text-orange-600 uppercase tracking-wide  ">
              Mission Accomplished
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl text-center font-bold font-serif text-white pt-5 mb-6 leading-tightlg:text-4xl  ">
            ISRO's Space Missions & Achievements
          </h2>

          <p className="text-gray-400 max-w-4xl mx-auto leading-relaxed">
            The Department of Space, through its premier agency ISRO (Indian
            Space Research Organisation), accomplishes transformative space
            missions to fulfill its vision of advancing scientific knowledge,
            fostering technological innovation, and contributing to India's
            sustainable development.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mb-12 max-w-6xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-[#242424] border border-white/10 rounded-xl px-6 py-10 text-center shadow-sm"
            >
              <div
                className={`text-3xl font-bold mb-1 ${
                  s.accent === "blue" ? "text-blue-600" : "text-orange-500"
                }`}
              >
                {s.value}
              </div>
              <p className="font-semibold text-white">{s.label}</p>
              <p className="text-sm text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12 max-w-6xl mx-auto">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            const isBlue = cat.accent === "blue";

            return (
              <div
                key={i}
                className={`relative rounded-xl p-8 overflow-hidden border transition hover:scale-[1.02] hover:shadow-xl
        
        ${
          isBlue
            ? "bg-gradient-to-br from-[#1E90FF]/10 to-[#1E90FF]/5 border-[#1E90FF]/30"
            : "bg-gradient-to-br from-[#FF6B35]/10 to-[#FF6B35]/5 border-[#FF6B35]/30"
        }`}
              >
                {/* Radial Glow */}
                <div
                  className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl ${
                    isBlue ? "bg-[#1E90FF]/20" : "bg-[#FF6B35]/20"
                  }`}
                />

                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <Icon
                    className={`w-10 h-10 ${
                      isBlue ? "text-blue-400" : "text-orange-400"
                    }`}
                  />

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>

                  {/* Highlighted Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {cat.highlight && (
                      <span
                        className={`font-semibold ${
                          isBlue ? "text-blue-400" : "text-orange-400"
                        }`}
                      >
                        {cat.highlight}{" "}
                      </span>
                    )}
                    {cat.description}
                  </p>

                  {/* Points */}
                  <ul className="text-sm text-gray-400 space-y-2">
                    {cat.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span
                          className={`mt-[2px] ${
                            isBlue ? "text-blue-400" : "text-orange-400"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Vision + Mission */}
        <div className="grid md:grid-cols-2 gap-10 p-8 md:p-10 border border-white/10 max-w-6xl mx-auto rounded-2xl bg-gradient-to-br from-[#1E90FF]/5 to-[#FF6B35]/5 mb-10">
          {sections.map((sec, i) => {
            const isBlue = sec.accent === "blue";

            return (
              <div key={i} className="relative">
                {/* Glow (matches your cards) */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl ${
                    isBlue ? "bg-blue-500/10" : "bg-orange-500/10"
                  }`}
                />

                {/* Content */}
                <div className="relative">
                  {/* Title */}
                  <h3
                    className={`font-bold text-lg mb-3 ${
                      isBlue ? "text-blue-400" : "text-orange-400"
                    }`}
                  >
                    {sec.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-5">
                    {sec.description}
                  </p>

                  {/* Divider Section */}
                  <div className="pt-5 border-t border-white/10">
                    <p className="text-sm font-semibold text-white mb-3">
                      {sec.listTitle}:
                    </p>

                    <ul className="text-sm text-gray-400 space-y-2">
                      {sec.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span
                            className={`mt-[2px] ${
                              isBlue ? "text-blue-400" : "text-orange-400"
                            }`}
                          >
                            ✓
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center space-y-5 p-8 border border-white/10 rounded-xl bg-gradient-to-br from-[#1E90FF]/5 to-[#FF6B35]/5 max-w-6xl mx-auto">
          <h3 className="text-xl text-center font-bold font-serif text-white mb-2 ">
            Join India's Space Revolution
          </h3>
          <p className="text-gray-400 mb-4 max-w-3xl mx-auto">
            Be part of ISRO's mission to advance space science and technology.
            Explore career opportunities, internships, and educational programs
            in India's thriving space sector.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              className="flex items-center gap-2 px-5 py-2   text-white rounded-lg 
            bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] hover:shadow-[0_0_22px_rgba(59,130,246,1)] hover:bg-blue-600"
            >
              <Briefcase className="w-4 h-4" />
              Explore Internships
            </button>

            <button className="flex text-white items-center gap-2 px-5 py-2 border border-white/10 rounded-lg bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] hover:shadow-[0_0_22px_rgba(249,115,22,1)] hover:bg-orange-600">
              <BookOpen className="w-4 h-4" />
              Join Workshops
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Satellite, Rocket, Star } from "lucide-react";
import ProgrammeBenefits from "./ProgrammeBenefits";

type NewsItem = {
  title: string;
  subtitle: string;
  icon: any;
  tag: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  footer: string;
  accent: "blue" | "orange" | "mix";
};

const newsData: NewsItem[] = [
  {
    title: "Bharatiya Antariksh Station",
    subtitle: "First Module Launch: 2028",
    icon: Satellite,
    tag: "🚀 Cabinet Approved Initiative",
    description:
      "India's own space station for scientific research will be established with the launch of its first module in 2028. The Cabinet, chaired by PM Shri Narendra Modi, approved the building of the first unit of Bharatiya Antariksh Station (BAS-1).",
    highlightsTitle: "Key Highlights",
    highlights: [
      "First module deployment by December 2028",
      "Extended Gaganyaan Programme scope",
      "8 missions planned for technology demonstration",
      "₹11,170 Crore net additional funding",
      "Operational station by 2035",
    ],
    footer:
      "This strategic initiative will boost microgravity-based scientific research, generate employment in high-tech sectors, and establish India as a leading space-faring nation.",
    accent: "blue",
  },
  {
    title: "Gaganyaan Programme",
    subtitle: "Human Spaceflight Programme",
    icon: Rocket,
    tag: "👨‍🚀 Indian Human Spaceflight",
    description:
      "The Gaganyaan Programme approved in December 2018 aims to demonstrate India's human spaceflight capabilities to Low Earth Orbit (LEO) and lay the foundation for long-term space exploration.",
    highlightsTitle: "Programme Timeline",
    highlights: [
      "4 missions by 2026 (ongoing programme)",
      "4 BAS validation missions by 2028",
      "Crewed lunar mission by 2040",
      " Total funding: ₹20,193 Crore Led by ISRO with industry collaboration",
      
    ],
    footer:
      "This programme represents a national effort involving ISRO, industry, academia, and other agencies to develop critical technologies for sustainable human space missions.",
    accent: "orange",
  },
  {
    title: "Vision for Amrit Kaal",
    subtitle: "India's Long-term Space Goals",
    icon: Star,
    tag: "🌟 Viksit Bharat 2047",
    description:
      "India's vision for space exploration during the Amrit Kaal envisages developing comprehensive capabilities for long-duration human space missions and Moon exploration.",
    highlightsTitle: "Strategic Milestones",
    highlights: [
      "Operational Bharatiya Antariksh Station by 2035",
      "Indian Crewed Lunar Mission by 2040 Advanced microgravity research capabilities",
      "Technological spin-offs for society High-tech employment generation",
       
    ],
    footer:
      "These ambitious goals position India among leading space-faring nations and create opportunities for youth in science, technology, and space exploration careers.",
    accent: "mix",
  },
];

export default function LatestNews() {
  return (
    <section className="w-full   bg-black px-4 py-16">
      <div className=" max-w-7xl mx-auto py-16 bg-gradient-to-br from-[#1E90FF]/5 to-[#FF6B35]/5 rounded-2xl ">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
            Latest News & Updates
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
            Stay updated with the latest developments in India's space program
            and groundbreaking initiatives
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-10 max-w-6xl mx-auto md:grid-cols-2 xl:grid-cols-3">
          {newsData.map((item, i) => {
            const Icon = item.icon;

            const headerGradient =
              item.accent === "blue"
                ? "from-blue-500 to-blue-400"
                : item.accent === "orange"
                  ? "from-orange-500 to-orange-400"
                  : "from-blue-500 to-orange-500";

            const borderAccent =
              item.accent === "blue"
                ? "border-blue-500 bg-[#232F3A]"
                : item.accent === "orange"
                  ? "border-orange-500 bg-[#3A2B25]"
                  : "border-blue-500 bg-[#232F3A]";

            const tagColor =
              item.accent === "blue" ? "text-blue-600" : "text-orange-600";

            return (
              <div
                key={i}
                className="border border-white/20  rounded-2xl overflow-hidden flex flex-col transition hover:shadow-lg"
              >
                {/* Header */}
                <div
                  className={`p-6 flex items-center gap-4 text-white bg-gradient-to-br ${headerGradient}`}
                >
                  <Icon className="w-10 h-10" />
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.subtitle}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1 bg-[#242424]">
                  {/* Tag */}
                  <p className={`text-sm font-semibold mb-4 ${tagColor}`}>
                    {item.tag}
                  </p>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div
                    className={`p-4 rounded-lg border-l-4 mb-6 ${borderAccent}`}
                  >
                    <p className="text-sm font-semibold mb-2 text-white">
                      {item.highlightsTitle}:
                    </p>
                    <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                      {item.highlights.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <p className="text-sm text-gray-400 mt-auto leading-relaxed">
                    {item.footer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>


        <ProgrammeBenefits/>
      </div>
    </section>
  );
}

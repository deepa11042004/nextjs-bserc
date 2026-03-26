import React from "react";

// --- Types ---
interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description?: string;
  accent: "blue" | "orange";
  footer?: {
    title?: string;
    content: React.ReactNode;
  };
}

// --- Data (Content from Prompt 1) ---
const timelineData: TimelineItem[] = [
  {
    id: "1",
    date: "June 2020",
    title: "PM Modi Announces Space Sector Reforms",
    description:
      "Announces historic reforms; private sector entry into all space activities (launchers, satellites, applications).",
    accent: "blue",
  },
  {
    id: "2",
    date: "June 2020",
    title: "IN-SPACe Established",
    description:
      "Single-window nodal agency under Department of Space to promote, authorize, and regulate NGPEs (non-government private entities).",
    accent: "blue",
  },
  {
    id: "3",
    date: "2021-2022",
    title: "NSIL Commercialization & FDI Reforms",
    description:
      "NewSpace India Ltd. commercializes ISRO tech; first private licenses issued.",
    accent: "orange",
    footer: {
      title: "FDI Reforms:",
      content: "100% in satellites, 74% in manufacturing",
    },
  },
  {
    id: "4",
    date: "2023",
    title: "Indian Space Policy 2023",
    description: "Released with focus on startups (Skyroot, Agnikul).",
    accent: "blue",
    footer: {
      title: "Milestone:",
      content: "First satellite broadband license to Eutelsat OneWeb",
    },
  },
  {
    id: "5",
    date: "July 2023",
    title: "Chandrayaan-3 Success",
    description:
      "Historic lunar south pole landing spurs National Space Day declaration.",
    accent: "orange",
    footer: {
      title: "Impact:",
      content: "Private firms contribute to PSLV-C58",
    },
  },
  {
    id: "6",
    date: "2024",
    title: "SpaDeX & 100% FDI",
    accent: "blue",
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4">
          <li>SpaDeX docking experiment success</li>
          <li>100% FDI in launch vehicles approved</li>
          <li>NSIL-SpaceX GSAT-N2 collaboration</li>
        </ul>
      ),
    },
  },
  {
    id: "7",
    date: "2025",
    title: "NEP 2020 & Gaganyaan",
    accent: "orange",
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4">
          <li>NEP implementation (5+3+3+4 structure)</li>
          <li>Space tech/AI in curriculum</li>
          <li>Gaganyaan mission preparation</li>
          <li>NISAR with NASA</li>
        </ul>
      ),
    },
  },
  {
    id: "8",
    date: "2026+",
    title: "In Lineup (Future)",
    accent: "blue", // Treating gradient as blue for border consistency
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4 ">
          <li>Gaganyaan uncrewed/crew tests</li>
          <li>BAS modules (2028 launch, 2035 ops)</li>
          <li>iDEX def-space grants (₹1.5-25 Cr)</li>
          <li>Private Vikram-1 launches</li>
        </ul>
      ),
    },
  },
];

// --- Component ---
export default function SpaceTimelineDark() {
  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-center text-white mb-2  ">
          Space Sector Reforms Timeline
        </h2>
        <p className="text-center   text-gray-400 text-base md:text-xl mb-10">
          India&apos;s journey towards private sector participation and
          self-reliance
        </p>

        {/* Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {timelineData.map((item) => {
            const isBlue = item.accent === "blue";

            return (
              <div
                key={item.id}
                className={`relative rounded-xl p-6 border-l-4 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl
                ${
                  isBlue
                    ? "border-blue-500 bg-gradient-to-br from-[#1E90FF]/10 to-[#0a1016]/80"
                    : "border-orange-500 bg-gradient-to-br from-[#22140e]/10 to-[#1d100d]/80"
                }`}
              >
                {/* Glow Effect */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5  rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isBlue ? "bg-blue-400" : "bg-[#FF6B35]"
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${
                        isBlue ? "text-blue-400" : "text-[#FF6B35]"
                      }`}
                    >
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {item.description}
                    </p>
                  )}

                 
                  {/* Footer / Highlight Box */}
                  {item.footer && (
                    <div
                      className={`mt-4 ${
                        isBlue
                          ? "bg-gradient-to-br from-[#1E90FF]/10 to-[#1E90FF]/5 border-[#1E90FF]"
                          : "bg-gradient-to-br from-[#FF6B35]/10 to-[#FF6B35]/5 border-[#FF6B35]"
                      } border-l-2 p-3 rounded-md text-sm text-gray-300`}
                    >
                      {item.footer.title && (
                        <p className="font-semibold text-white mb-1">
                          {item.footer.title}
                        </p>
                      )}
                      {item.footer.content}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Calendar, Monitor, Icon } from "lucide-react";

interface TimelineItem {
  label: string;
  value: string;
  labelColor?: string;
}

interface CardData {
  icon: React.ReactNode;
  title: string;
  items: TimelineItem[];
}

interface ProgrammeTimelineProps {
  className?: string;
  title?: string;
  titleColor?: string;
  cards?: [CardData, CardData];
  accentColor?: string;
}

const ProgrammeTimeline: React.FC<ProgrammeTimelineProps> = ({
  className = "",
  title = "Programme Timeline and Format",
  accentColor = "#f59e0b",
  cards,
}) => {
  const defaultCards: [CardData, CardData] = [
    {
      icon: <Calendar className="w-6 h-6" style={{ color: accentColor }} />,
      title: "Schedule",
      items: [
        { label: "Duration", value: "6 weeks (42 days)" },
        { label: "Batch I", value: "15 May – 30 June 2026" },
        { label: "Batch II", value: "19th June – 30th July 2026" },
      ],
    },
    {
      icon: <Monitor className="w-6 h-6" style={{ color: "#22d3ee" }} />,
      title: "Format",
      items: [
        {
          label: "Mode",
          value:
            "Fully virtual — live interactive sessions + recorded lectures",
          labelColor: "#22d3ee",
        },
        {
          label: "Schedule",
          value: "Fridays to Sundays, 2–3 hours per day",
          labelColor: "#22d3ee",
        },
        {
          label: "Projects",
          value: "Monday to Thursday — dedicated project activities",
          labelColor: "#22d3ee",
        },
      ],
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <section className={`w-full py-10   bg-black ${className}`}>
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8"
      >
        <h2 className="text-2xl text-white sm:text-3xl lg:text-4xl font-bold font-serif text-center mb-8 sm:mb-10">
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {displayCards.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className="flex-1 rounded-xl border border-slate-700/50 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-sm min-w-0"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-slate-800/80 mb-5">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">
                {card.title}
              </h3>

              <div className="space-y-5">
                {card.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-4">
                    <div className="relative flex flex-col items-center">
                      <div
                        className="w-2.5 h-2.5 rounded-full z-10 bg-purple-500"
                        
                      />
                      {itemIndex !== card.items.length - 1 && (
                        <div
                          className="w-[1px] h-full absolute top-4 bg-slate-100"
                           
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-5">
                      <p
                        className="text-sm font-semibold mb-1 uppercase tracking-wide"
                        style={{ color: item.labelColor || accentColor }}
                      >
                        {item.label}
                      </p>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeTimeline;

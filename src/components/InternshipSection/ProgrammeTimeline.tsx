import React from "react";

interface TimelineCardProps {
  title: string;
  description: string;
  highlight: string;
  highlightColor: string;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  description,
  highlight,
  highlightColor,
}) => {
  const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400",
    amber: "text-amber-400",
    purple: "text-orange-400",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 sm:p-8 hover:border-white/20 transition duration-300">
      <h3 className="text-xl font-bold text-gray-100 font-serif mb-3">
        {title}
      </h3>
      <p className="text-gray-300 text-sm sm:text-base mb-2">{description}</p>
      <p
        className={`text-sm sm:text-base font-semibold ${colorClasses[highlightColor]}`}
      >
        {highlight}
      </p>
    </div>
  );
};

const ProgrammeTimeline: React.FC = () => {
  return (
    <section className="w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-serif text-center mb-10">
          Programme Timeline & Format
        </h2>

        {/* Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TimelineCard
            title="Duration"
            description="6 weeks (42 days)"
            highlight="19 June - 30 July 2026"
            highlightColor="cyan"
          />
          <TimelineCard
            title="Format"
            description="live training & recorded sessions"
            highlight="Fridays-Sundays, 2-3 hrs/day"
            highlightColor="amber"
          />
          <TimelineCard
            title="Project Work"
            description="Dedicated techonology"
            highlight="Monday-Thursday"
            highlightColor="purple"
          />
        </div>
      </div>
    </section>
  );
};

export default ProgrammeTimeline;

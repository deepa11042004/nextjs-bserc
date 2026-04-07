import React from "react";

interface HighlightCardProps {
  title: string;
  description: string;
  isFullWidth?: boolean;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  title,
  description,
  isFullWidth = false,
}) => (
  <div
    className={`rounded-xl border border-white/10 bg-gray-900/50 p-5 sm:p-6 hover:border-purple-400/30 hover:bg-gray-900/70 transition-all duration-300 ${
      isFullWidth ? "col-span-1 sm:col-span-2" : ""
    }`}
  >
    <h3 className="text-lg font-bold text-white font-serif mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const ProgrammeHighlights: React.FC = () => {
  const highlights = [
    {
      title: "Comprehensive Curriculum",
      description:
        "Age-appropriate, progressive instruction tailored for learners",
    },
    {
      title: "Project-Based Learning",
      description:
        "Industry-standard tools and simulations with hands-on experience",
    },
    {
      title: "On-Demand Access",
      description: "Recorded sessions for flexible, self-paced review",
    },
    {
      title: "Career Exploration",
      description:
        "Pathways in ISRO, DRDO, HAL, and emerging Defence & Space sectors",
    },
    {
      title: "Expert Mentorship",
      description:
        "Interactive sessions with industry experts and experienced mentors from ISRO, DRDO, HAL, and private space enterprises",
      isFullWidth: true,
    },
  ];

  return (
    <section className="w-full py-10  px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-white font-serif text-center mb-10">
          Programme Highlights
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {highlights.map((highlight) => (
            <HighlightCard
              key={highlight.title}
              title={highlight.title}
              description={highlight.description}
              isFullWidth={highlight.isFullWidth}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeHighlights;
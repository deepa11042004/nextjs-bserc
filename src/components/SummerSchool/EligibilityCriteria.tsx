import React from "react";

interface Board {
  name: string;
  featured?: boolean;
}

interface EligibilityCriteriaProps {
  title?: string;
  gradeRange?: string;
  boards?: Board[];
  description?: string;
  accentColor?: string;
  className?: string;
}

const EligibilityCriteria: React.FC<EligibilityCriteriaProps> = ({
  title = "Eligibility Criteria",
  gradeRange = "Classes VI to XII",
  boards = [
    { name: "CBSE" },
    { name: "ICSE" },
    { name: "State Boards" },
    { name: "International Curricula" },
  ],
  description = "Designed for young learners with a passion for Science, Technology, Engineering, and Mathematics (STEM), focusing on Defence & Space, Computing, and Frontier Technologies.",
  accentColor = "#ff6b35",
  className = "",
}) => {
  return (
    <section
      className={`w-full  py-10 px-4 bg-black ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <div
          className="flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]"
          style={{ borderLeftColor: accentColor }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
            {title}
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
            Admissions open to students in{" "}
            <span className="font-semibold" style={{ color: accentColor }}>
              {gradeRange}
            </span>{" "}
            across all recognized boards:
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            {boards.map((board, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-200 ${
                  board.featured
                    ? "bg-white/10 text-white border-white/30"
                    : "hover:bg-white/5"
                }`}
                style={{
                  borderColor: board.featured ? "white" : `${accentColor}80`,
                  color: board.featured ? "white" : accentColor,
                  backgroundColor: board.featured
                    ? undefined
                    : `${accentColor}1A`,
                }}
              >
                {board.name}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;

import React from "react";
import { Trophy } from "lucide-react";

interface MeritScholarshipsProps {
  title?: string;
  examinationName?: string;
  batchDates?: string;
  description?: string;
  className?: string;
  titleColor?: string;
  highlightColor?: string;
}

const MeritScholarships: React.FC<MeritScholarshipsProps> = ({
  title = "Merit Scholarships",
  examinationName = "Bharat Def-Space Summer Internship Examination 2026",
  batchDates = "19th June – 30th July 2026",
  description = "Deserving candidates may avail merit-based scholarships through the {examination}, securing admission to Batch II ({dates}). Scholarship awardees shall remit only the prescribed examination fee.",
  titleColor = "#22d3ee",
  highlightColor = "#f59e0b",
}) => {
  // Replace placeholders in description
  const formattedDescription = description
    .replace("{examination}", examinationName)
    .replace("{dates}", batchDates);

  return (
    <section className={`w-full pb-12  bg-black`}>
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8"
      >
        <h2 className="text-2xl text-center font-bold font-serif sm:text-3xl text-white mb-4">
          {title}
        </h2>

        <div className="rounded-xl border border-cyan-900/30 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Trophy className="w-6 h-6" style={{ color: highlightColor }} />
            </div>

            <div className="flex-1">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Deserving candidates may avail merit-based scholarships through
                the{" "}
                <span
                  className="font-semibold"
                  style={{ color: highlightColor }}
                >
                  {examinationName}
                </span>
                , securing admission to Batch II ({batchDates}). Scholarship
                awardees shall remit only the prescribed examination fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeritScholarships;

import React from "react";

interface InfoBoxProps {
  title: string;
  content: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, content }) => (
  <div className="rounded-lg bg-black/40 p-4 sm:p-5 border border-white/5 hover:border-cyan-500/30 transition duration-300">
    <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">
      {title}
    </h4>
    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
      {content}
    </p>
  </div>
);

const AboutProgramme: React.FC = () => {
  return (
    <section className="w-full py-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}

        <h2 className="text-center  text-3xl md:text-5xl font-bold text-white pb-8 leading-tight font-serif">
          About the Programme
        </h2>

        {/* Main Container */}
        <div className="rounded-xl  shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)] p-6 sm:p-8 lg:p-10">
          {/* Description Text */}
          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              The{" "}
              <span className="text-white font-semibold">
                Defence Space Summer Internship Programme
              </span>{" "}
              is a flagship initiative designed to bridge the gap between
              academic research and India's defence & space technology
              ecosystem.
            </p>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Selected interns will work on live projects across domains
              including aerospace engineering, cybersecurity, artificial
              intelligence, satellite systems, and advanced materials research
              under the guidance of senior defence scientists.{" "}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <InfoBox title="Duration" content="6 weeks (42 days)" />
            <InfoBox title="Dates" content="19 June - 30 July 2026" />
            <InfoBox
              title="Format"
              content="Fully virtual with live sessions"
            />
            <InfoBox
              title="Eligibility"
              content="Class VI-XII, B.Tech, M.Tech, PhD & Professionals"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProgramme;

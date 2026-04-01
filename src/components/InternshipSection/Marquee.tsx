import React from "react";

const marqueeItems: string[] = [
  "Space Technology",
  "Defence Systems",
  "Innovation",
  "BSERC Initiative",
  "Def-Space Summer 2026",
  "Build the Future",
];

export const Marquee: React.FC = () => {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
          (item, index) => (
            <div key={index} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

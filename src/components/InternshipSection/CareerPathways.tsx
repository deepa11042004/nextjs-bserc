import React from "react";

interface ListCardProps {
  title: string;
  items: string[];
}

const ListCard: React.FC<ListCardProps> = ({ title, items }) => (
  <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 sm:p-8 flex flex-col h-full">
    <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-4 font-serif">
      {title}
    </h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start text-gray-300 text-sm sm:text-base">
          <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CareerPathways: React.FC = () => {
  return (
    <section className="w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Section Title */}
         

        <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif text-center mb-10">
          Career Pathways
        </h2>

        {/* Top Grid: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ListCard
            title="Government Sector"
            items={[
              "ISRO (Indian Space Research Organisation)",
              "DRDO (Defence Research & Development)",
              "HAL (Hindustan Aeronautics)"
            ]}
          />
          <ListCard
            title="Emerging Opportunities"
            items={[
              "Private Space Enterprises",
              "Defence Public Sector Units",
              "UAV & AI-driven Systems"
            ]}
          />
        </div>

        {/* Bottom Card: Certification (Full Width) */}
        <div className="rounded-xl border border-white/10 bg-gradient-to-r from-[#0f2b2f]/40 to-gray-900/50 p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-cyan-400 font-serif mb-6">
            Certification
          </h3>

          
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold mb-2 text-lg">
                Certificate of Participation
              </h4>
              <p className="text-gray-400 text-sm sm:text-base">
                BSERC issued upon successful completion
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2 text-lg">
                Merit Certificate
              </h4>
              <p className="text-gray-400 text-sm sm:text-base">
                Awarded based on performance & project outcomes
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CareerPathways;
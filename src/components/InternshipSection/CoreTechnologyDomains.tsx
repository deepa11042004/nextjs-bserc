import React from "react";

interface DomainCardProps {
  title: string;
  subtitle: string;
}

const DomainCard: React.FC<DomainCardProps> = ({ title, subtitle }) => (
  <div className="group rounded-xl border border-cyan-500/20 bg-gray-900/50 p-5 sm:p-6 hover:border-cyan-400/50 hover:bg-gray-900/70 transition-all duration-300 cursor-default">
    <h3 className="text-lg sm:text-xl font-bold text-white font-serif mb-1 group-hover:text-cyan-200 transition-colors">
      {title}
    </h3>
    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
      {subtitle}
    </p>
  </div>
);

const CoreTechnologyDomains: React.FC = () => {
  const domains = [
    { title: "Advanced Rocketry", subtitle: "Design & Launch Systems" },
    { title: "Defence Drone Tech", subtitle: "Tactical Applications" },
    { title: "Air Taxi Systems", subtitle: "Next-Generation Drones" },
    { title: "Aircraft Design", subtitle: "Principles & Simulation" },
    { title: "Robotics Engineering", subtitle: "Automation & Control" },
    { title: "Artificial Intelligence", subtitle: "Fundamentals & Applications" },
  ];

  return (
    <section className="w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-400 font-serif text-center mb-10">
          Core Technology Domains
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {domains.map((domain) => (
            <DomainCard key={domain.title} title={domain.title} subtitle={domain.subtitle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreTechnologyDomains;
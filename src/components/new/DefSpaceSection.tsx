"use client";
import React from "react";
import {
  Rocket,
  Calendar,
  Star,
  Moon,
  UserCheck,
  User,
  Link,
  Users,
  Award,
  Building2,
  Store,
  TrendingUp,
  Building,
} from "lucide-react";

const events = [
  {
    icon: Calendar,
    title: "National Technology Day",
    date: "May 11, 2026",
    desc: "Celebrating India's technological self-reliance and innovation excellence.",
    color: "text-blue-400",
  },
  {
    icon: Star,
    title: "Bharat Def-Space Innovation Week",
    date: "August 18-22, 2026",
    desc: "5-day mega event featuring pitch sessions, exhibitions, and workshops.",
    color: "text-orange-400",
  },
  {
    icon: Moon,
    title: "National Space Day",
    date: "August 23, 2026",
    desc: "Commemorating Chandrayaan-3's success and promoting space science.",
    color: "text-blue-400",
  },
];

const buttons = [
  { label: "Advisor", icon: UserCheck },
  { label: "Startup", icon: Rocket },
  { label: "Individual", icon: User },
  { label: "Partnership", icon: Link },
  { label: "Delegate", icon: Users },
  { label: "Membership", icon: Award },
  { label: "IEDC", icon: Building2 },
  { label: "Exhibitor", icon: Store },
  { label: "Investor", icon: TrendingUp },
  { label: "Organization", icon: Building },
];

// Reusable Button Component to reduce code duplication
const ActionButton = ({ 
  btn, 
  i, 
  isBottom 
}: { 
  btn: typeof buttons[0]; 
  i: number; 
  isBottom: boolean 
}) => {
  const Icon = btn.icon;
  // Determine color scheme based on index and section
  const isEven = i % 2 === 0;
  const baseColor = isEven ? "blue" : "orange";
  
  // Swap colors for bottom section to create visual variety
  const finalColor = isBottom ? (isEven ? "orange" : "blue") : baseColor;

  const bgClass = finalColor === "blue" 
    ? "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] hover:shadow-[0_0_22px_rgba(59,130,246,1)] hover:bg-blue-600"
    : "bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] hover:shadow-[0_0_22px_rgba(249,115,22,1)] hover:bg-orange-600";

  return (
    <button
      className={`relative overflow-hidden flex items-center justify-center gap-2 
      w-full px-4 py-3 rounded-lg text-sm font-medium 
      transition-all duration-300 group ${bgClass}
      hover:scale-[1.02] hover:brightness-110 active:scale-95`}
    >
      {/* Glow Layer */}
      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition bg-[radial-gradient(circle,rgba(255,255,255,0.25)_0%,transparent_70%)] z-0"></span>
      
      {/* Content */}
      <Icon className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
      <span className="relative z-10 truncate">{btn.label}</span>
    </button>
  );
};

const DefSpaceSection: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 bg-black min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        {/* Main Card */}
        <div className="rounded-2xl border-2 border-[#FF6B35] p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 relative overflow-hidden shadow-2xl shadow-[#FF6B35]/10">
          
          {/* Decorative Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 sm:w-48 sm:h-48 bg-[#1E90FF]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 sm:w-48 sm:h-48 bg-[#FF6B35]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-[#FF6B35]/50 bg-[#FF6B35]/10 backdrop-blur-sm">
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B35]" />
              <span className="text-[#FF6B35] text-xs sm:text-sm font-bold uppercase tracking-wider">
                Bharat Def-Space 2026
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Bharat Def-Space <br className="hidden sm:block" />              
                Innovation Corridor
               
            </h2>

            {/* Subtitle */}
            <p className="text-[#FF6B35] font-semibold text-base sm:text-lg mb-6">
              An Online Technical Pool for Defence & Space Innovators
            </p>

            {/* Description */}
            <p className="text-gray-300 text-base md:text-xl   mb-10 leading-relaxed">
              A transformative initiative to unite innovators, entrepreneurs, investors, advisors, and institutions in India's thriving defence and space sector. Connect with industry leaders and showcase your innovations.
            </p>

            {/* Events Section */}
            <div className="w-full max-w-5xl mx-auto bg-[#142533]/80 border border-white/10 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-sm">
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-8 font-serif flex items-center justify-center gap-2">
                <span className="text-[#FF6B35]">🎯</span> Major Events 2026
              </h3>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <div
                      key={i}
                      className="bg-[#1E293B] border border-white/5 rounded-xl p-6 text-center 
                      hover:border-[#FF6B35]/50 hover:bg-[#1E293B]/80 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${event.color}`} />
                      </div>
                      <h4 className="text-white font-semibold text-base sm:text-lg mb-2 line-clamp-2">
                        {event.title}
                      </h4>
                      <p className="text-[#FF6B35] text-xs sm:text-sm font-bold mb-3 uppercase tracking-wide">
                        {event.date}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="space-y-6 ">
              {/* Top Grid (8 buttons) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {buttons.slice(0, 8).map((btn, i) => (
                  <ActionButton key={i} btn={btn} i={i} isBottom={false} />
                ))}
              </div>

              {/* Bottom Grid (2 buttons) - Centered on mobile, full width on desktop */}
              
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
  {buttons.slice(8).map((btn, i) => (
    <ActionButton key={i} btn={btn} i={i} isBottom={true} />
  ))}
</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DefSpaceSection;
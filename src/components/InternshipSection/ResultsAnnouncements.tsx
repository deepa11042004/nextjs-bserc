import React from 'react';

const ResultsAnnouncements: React.FC = () => {
  const points = [
    {
      title: "Selected Candidates Announced",
      desc: "Official list of candidates who have qualified for the internship program",
    },
    {
      title: "Email Notifications",
      desc: "Selected candidates will receive acceptance emails with onboarding details",
    },
    {
      title: "Track Assignment",
      desc: "Assigned technical tracks based on preferences and merit",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-6 flex flex-col items-center text-center">
      {/* Header Section */}
      <div className="max-w-3xl mb-12 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-3 bg-orange-400"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400">
            PROGRAM UPDATES
          </p>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
          Results & <br className="md:hidden" /> Announcements
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          Stay updated with important results and program announcements.
        </p>
      </div>

      {/* Main Announcement Card */}
      <div className="w-full max-w-2xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        {/* Soon Badge */}
        <div className="flex flex-col items-center gap-3 ">
          <div className=" text-white text-7xl font-black px-2 py-0.5 rounded flex items-center gap-1 mb-4">
            🔜
          </div>
          <h3 className="text-3xl font-serif font-bold mb-4">Coming Soon</h3>
          
          {/* Date Badge */}
          <div className="bg-orange-500 border border-[#3f5125] rounded-full px-5 py-2 flex items-center gap-2 text-black text-sm font-semibold">
            📅 June 14, 2026
          </div>
          <p className="text-zinc-500 text-base mb-4">Result Declaration</p>
        </div>

        {/* Inner Info Box */}
        <div className="bg-[#161616] rounded-2xl p-6 text-left border border-[#232b15] mb-8">
          <p className="text-base text-center font-bold text-orange-500 tracking-widest mb-6 flex justify-center items-center gap-2">
            📋 WHAT TO EXPECT
          </p>
          
          <div className="space-y-6">
            {points.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-400 flex items-center justify-center text-black text-[10px] font-bold mt-1">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <p className="text-orange-400 text-sm font-bold tracking-widest uppercase cursor-default hover:brightness-125 transition-all">
          Check your email on June 14, 2026 for results
        </p>
      </div>
    </section>
  );
};

export default ResultsAnnouncements;
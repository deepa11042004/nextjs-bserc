import React from "react";
import { Goal,LockOpen } from 'lucide-react';
const timelineItems = [
  {
    month: "April",
    day: "1",
    year: "2026",
    badge: "Opening",
    title: "Registration Starts",
    desc: "Applications open for all students interested in joining the Def-Space Summer Internship program.",
    icon:"🔓",
  },
  {
    month: "April",
    day: "27",
    year: "2026",
    badge: "Deadline",
    title: "Registration Ends",
    desc: "Last day to submit your application. Make sure all documents and requirements are completed.",
    icon: "📋",
  },
  {
    month: "June",
    day: "7",
    year: "2026",
    badge: "Exam",
    title: "Entrance Examination",
    desc: "Written examination from 2:00 PM to 3:30 PM. Qualifying exam for shortlisting candidates.",
    icon: "📝",
  },
  {
    month: "June",
    day: "14",
    year: "2026",
    badge: "Results",
    title: "Result Declaration",
    desc: "Selected candidates will be announced. Check your email for acceptance notifications.",
    icon:  "🎯",
  },
  {
    month: "June",
    day: "18",
    year: "2026",
    badge: "Attendance",
    title: "Start Attendance",
    desc: "Begin marking your daily attendance from June 18th through July 30th. Regular attendance is mandatory for internship completion.",
    icon:  "📍",
  },
  {
    month: "June",
    day: "19",
    year: "2026",
    badge: "Begin",
    title: "Training Begins",
    desc: "6 weeks of intensive training starts (19 June – 30 July 2026). Prepare for hands-on learning across all technical tracks.",
    icon:  "🚀",
  },
  {
    month: "July",
    day: "31",
    year: "2026",
    badge: "Complete",
    title: "Certification",
    desc: "Completion certificates awarded. Your achievement recognised with official BSERC certification.",
    icon:  "🏆",
  },
];

export const TimelineSection: React.FC = () => {
  return (
    <section className="w-full   bg-black px-4  pt-5">
      <div className=" max-w-6xl mx-auto text-white flex flex-col justify-center items-center  relative overflow-hidden">
         

         <div className="flex justify-center text-center items-center text-center gap-2 py-3">
          {/* Vertical line accent */}
          <div className="w-1 h-3 bg-orange-400"></div>
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400 ">
           Program Timeline
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center  ">
          Key Dates for Summer 2026
        </h2>

        <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto py-2 mb-4 leading-relaxed">
          Mark your calendars for important deadlines and program dates.
        </p>
        <div className="flex flex-col gap-5  ">
          {timelineItems.map((item, i) => (
            <div key={i} className="flex items-center gap-5  ">
              {/* date box */}
              <div className="shrink-0 w-[88px] h-[88px] rounded-xl border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 flex flex-col items-center justify-center gap-1 group-hover:border-[#a3e635]">
                <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-200">
                  {item.month}
                </span>
                <span className="text-[28px] font-bold text-orange-400 leading-none">
                  {item.day}
                </span>
                <span className="text-[10px] text-gray-200">{item.year}</span>
              </div>

              {/* connector */}
              <div className="shrink-0 flex items-center gap-1">
                <div className="w-6 h-px bg-orange-400" />
                <div className="w-1 h-1 rounded-full bg-orange-400" />
              </div>

              {/* content card */}
              <div className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.07] rounded-xl px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/[0.05] hover:border-white/10 transition-colors duration-200">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-orange-400 border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 rounded-full px-2.5 py-0.5">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-bold font-serif text-white mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* icon box */}
                <div className="shrink-0 w-10 h-10 rounded-lg border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 flex items-center justify-center text-orange-400 ">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

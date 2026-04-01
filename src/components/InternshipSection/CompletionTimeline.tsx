import React from "react";

const timelineItems = [
  {
    month: "June",
    day: "18",
    year: "2026",
    badge: "Start",
    title: "Begin Attendance Tracking",
    desc: "Start marking your daily attendance. Regular participation is mandatory for internship completion and certification eligibility.",
    icon: "✍️",
  },
  {
    month: "July",
    day: "15",
    year: "2026",
    badge: "Deadline",
    title: "Submit Your Assignments",
    desc: "Complete all coursework assignments for your chosen technical track. Submit all assignments before the deadline for evaluation.",
    icon: "📝",
  },
  {
    month: "July",
    day: "30",
    year: "2026",
    badge: "Final Day",
    title: "Complete Training Program",
    desc: "Last day of the internship. Ensure all attendance records are complete and all assignments are submitted for final evaluation.",
    icon: "🚀",
  },
  {
    month: "Aug",
    day: "23",
    year: "2026",
    badge: "Submission",
    title: "Submit Project Report",
    desc: "Document and submit your final internship project including objectives, methodology, technical specifications, implementation, and outcomes.",
    icon: "💡",
  },
  {
    month: "Aug",
    day: "30",
    year: "2026",
    badge: "Award",
    title: "Receive Your Certificate",
    desc: "Receive your official project completion certificate and internship recognition. Digital certificate will be sent to your registered email with your achievements.",
    icon: "🎖️",
  },
   
];

export const CompleteTimeline: React.FC = () => {
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

        <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center mb-9">
          Completion Timeline
        </h2>

        <div className="flex flex-col gap-5 ">
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

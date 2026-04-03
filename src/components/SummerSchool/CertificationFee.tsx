import React from "react";
import { IndianRupee, Globe } from "lucide-react";

const CertificationFee: React.FC = () => {
  return (
    <section className="w-full pb-12  bg-black">
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Certification Card */}
          <div>
            <h2 className="text-2xl font-bold font-serif sm:text-3xl text-white mb-4">
              Certification
            </h2>
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm">
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-amber-500 text-sm mt-1">▶</span>
                  <span className="text-sm sm:text-base">
                    BSERC issued Certificate of Participation
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-300">
                  <span className="text-amber-500 text-sm mt-1">▶</span>
                  <span className="text-sm sm:text-base">
                    Merit Certificate awarded based on performance and project
                    outcomes
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Fee Card */}
          <div>
            <h2 className="text-2xl font-bold font-serif sm:text-3xl text-white mb-4">
              Programme Fee
            </h2>
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6 backdrop-blur-sm">
              {/* Header */}
              <div className="flex justify-between items-center px-3 py-2 mb-2 rounded bg-slate-800/80 border-b border-slate-700">
                <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase">
                  Category
                </span>
                <span className="text-amber-400 font-semibold text-xs sm:text-sm uppercase">
                  Fee
                </span>
              </div>

              {/* Rows */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-3 py-3 border-b border-slate-700/30">
                  <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <IndianRupee className="w-4 h-4 text-amber-500" />
                    <span>Indian Students (6th–12th)</span>
                  </div>
                  <span className="font-semibold text-amber-400 text-sm sm:text-base">
                    ₹ 1,750
                  </span>
                </div>

                <div className="flex justify-between items-center px-3 py-3">
                  <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>International Students</span>
                  </div>
                  <span className="font-semibold text-cyan-400 text-sm sm:text-base">
                    USD 15
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationFee;

"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
interface ListItemProps {
  term: string;
  description: string;
}

const LateralListItem: React.FC<ListItemProps> = ({ term, description }) => (
  <div className="flex items-start mb-3 last:mb-0">
    <span className="text-cyan-400 mr-2 mt-1.5 text-xs font-bold">•</span>
    <p className="text-gray-300 text-sm leading-relaxed">
      <span className="text-white font-semibold">{term}</span> {description}
    </p>
  </div>
);

interface StatCardProps {
  value: string;
  label: string;
}

const LateralStatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className="rounded-lg border border-white/10 bg-gray-900/50 p-5 text-center flex flex-col justify-center h-full">
    <p className="text-3xl sm:text-4xl font-extrabold text-amber-400 mb-1">
      {value}
    </p>
    <p className="text-gray-400 text-sm tracking-wide">{label}</p>
  </div>
);

const Page: React.FC = () => {
  return (
    <section className="w-full py-10 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-amber-400 font-serif mb-8">
          Lateral Entry Opportunity
        </h2>

        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 sm:p-8 mb-6">
          <h3 className="text-xl font-bold text-amber-200 mb-3 font-serif">
            About Lateral Entry
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Bharat Space Education Research Centre is pleased to announce an
            opportunity for Officials, Faculty, Research Scholars, and Students
            to engage in lateral entry into their preferred technology areas.
            This initiative does not involve an examination process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 sm:p-8 h-full">
            <h3 className="text-lg font-bold text-amber-400 mb-5 font-serif">
              Who Can Apply
            </h3>
            <LateralListItem
              term="Government Officials"
              description="- Working in Defence & Space sectors"
            />
            <LateralListItem
              term="Faculty Members"
              description="- From educational institutions"
            />
            <LateralListItem
              term="Research Scholars"
              description="- Pursuing advanced studies"
            />
            <LateralListItem
              term="Working Professionals"
              description="- With relevant experience"
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-gray-900/50 p-6 sm:p-8 h-full">
            <h3 className="text-lg font-bold text-orange-400 mb-5 font-serif">
              Key Benefits
            </h3>
            <LateralListItem
              term="No Examination"
              description="- Direct registration process"
            />
            <LateralListItem
              term="Choose Your Domain"
              description="- Select preferred technology areas"
            />
            <LateralListItem
              term="Expert Mentorship"
              description="- Guidance from industry leaders"
            />
            <LateralListItem
              term="Certificate & Recognition"
              description="- Official credentials"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <LateralStatCard value="350" label="Total Seats Available" />
          <LateralStatCard value="6 Technologies" label="Direct Registration" />
          <LateralStatCard value="45 Days" label="Programme Duration" />
        </div>

        <div className=" pt-8 flex justify-center">
          <Link
            href="/bsercinternship/summer-internship?source=lateral"
            className="text-black font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4ff33]/10 bg-orange-500 hover:bg-orange-600"
          >
            Lateral Entry Registration 
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page;

"use client";

import React, { useEffect, useState } from "react";
import { getInternshipFeeSettings } from "@/services/internshipRegistration";

const DEFAULT_LATERAL_EWS_FEE_RUPEES = 1350;

function formatFeeValueRupees(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return String(DEFAULT_LATERAL_EWS_FEE_RUPEES);
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

interface PricingRowProps {
  component: string;
  indianFee: string;
  nonIndianFee: string;
  isIndianHighlight?: boolean;
  isNonIndianHighlight?: boolean;
}

const PricingRow: React.FC<PricingRowProps> = ({
  component,
  indianFee,
  nonIndianFee,
  isIndianHighlight = false,
  isNonIndianHighlight = false,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-b border-white/10 hover:bg-white/5 transition duration-300 px-4 sm:px-6">
      <div className="text-gray-300 text-sm sm:text-base col-span-1">
        {component}
      </div>
      <div
        className={`text-sm sm:text-base font-semibold text-center col-span-1 ${
          isIndianHighlight ? "text-amber-400" : "text-gray-200"
        }`}
      >
        {indianFee}
      </div>
      <div
        className={`text-sm sm:text-base font-semibold text-center col-span-1 ${
          isNonIndianHighlight ? "text-cyan-400" : "text-gray-200"
        }`}
      >
        {nonIndianFee}
      </div>
    </div>
  );
};

const PricingFees: React.FC = () => {
  const [ewsLateralFeeRupees, setEwsLateralFeeRupees] = useState<number>(
    DEFAULT_LATERAL_EWS_FEE_RUPEES,
  );

  useEffect(() => {
    let isMounted = true;

    const loadFeeSettings = async () => {
      try {
        const settings = await getInternshipFeeSettings();
        const nextEwsFee = Number(settings.ews_lateral_fee_rupees);

        if (isMounted && Number.isFinite(nextEwsFee) && nextEwsFee >= 0) {
          setEwsLateralFeeRupees(nextEwsFee);
        }
      } catch {
        // Keep fallback value when fee settings are unavailable.
      }
    };

    void loadFeeSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full py-10 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className=" text-3xl md:text-5xl font-bold text-white font-serif text-center mb-10">
          Registration Fees
        </h2>

        {/* Pricing Table */}
        <div className="rounded-xl border border-white/10 bg-gray-900/50 overflow-hidden ">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 bg-blue-900/30 py-4 px-4 sm:px-6 border-b border-white/10  ">
            <div className="text-cyan-400 font-semibold text-sm sm:text-base col-span-1">
              Component
            </div>
            <div className="text-amber-400 font-semibold text-sm sm:text-base text-center col-span-1">
              Indian Participants
            </div>
            <div className="text-cyan-400 font-semibold text-sm sm:text-base text-center col-span-1">
              Non-Indian Participants
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/10">
            <PricingRow
              component="Def-Space Summer Internship Examination Fee"
              indianFee="₹500"
              nonIndianFee="Not applicable*"
              isIndianHighlight={true}
              isNonIndianHighlight={true}
            />
            <PricingRow
              component="Lateral Entry Fee"
              indianFee="₹1,750"
              nonIndianFee="US$150"
              isIndianHighlight={true}
              isNonIndianHighlight={true}
            />
            <PricingRow
              component="Def-Space Mentorship Registration Fee"
              indianFee="₹1,000"
              nonIndianFee="US$150"
              isIndianHighlight={true}
              isNonIndianHighlight={true}
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6">
          <h3 className="text-amber-400 font-semibold text-base sm:text-lg mb-2">
            Economically Weaker Section
          </h3>
          <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
            Economically Weaker Section candidates (whose family annual income
            is less than ₹7 lakh) can apply under the Weaker Section. The
            lateral registration fee for this category is ₹
            {formatFeeValueRupees(ewsLateralFeeRupees)}.
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-gray-400 text-xs sm:text-sm text-center mt-6 italic">
          * Non-Indian participants are exempted from the examination fee
        </p>
      </div>
    </section>
  );
};

export default PricingFees;
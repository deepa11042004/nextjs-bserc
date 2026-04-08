"use client";

import { ArrowRight, Star } from "lucide-react";

import UnifiedMentorListing from "@/components/mentors/UnifiedMentorListing";

export default function OurMentors() {
  return (
    <section className="bg-[#0d0d0d] text-zinc-300 py-16 px-4 selection:bg-orange-500 selection:text-black">
      <div className="mx-auto w-full max-w-7xl">
        <UnifiedMentorListing
          badgeLabel="Mentors"
          title="Our Mentors"
          description="Learn from India's leading scientists, engineers, and defence professionals."
          emptyMessage="No active mentors are published yet. Please check back soon."
        />

        {/* Footer Note */}
        <div className="mt-12 bg-[#111111] border border-[#262626] rounded-xl p-5">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-zinc-400 text-sm">
              More mentor profiles will be announced as the programme date
              approaches. Interested in becoming a mentor?{" "}
              <a
                href="/mentor-registration"
                className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium transition-colors"
              >
                Apply here
                <ArrowRight className="w-4 h-4" />
              </a>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

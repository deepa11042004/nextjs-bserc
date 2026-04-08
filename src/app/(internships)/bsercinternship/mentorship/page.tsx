"use client";

import UnifiedMentorListing from "@/components/mentors/UnifiedMentorListing";

export default function MentorshipPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-zinc-100 px-4 py-12 sm:px-6">
      <div className="mx-auto w-full max-w-7xl">
        <UnifiedMentorListing badgeLabel="Mentorship" />
      </div>
    </main>
  );
}

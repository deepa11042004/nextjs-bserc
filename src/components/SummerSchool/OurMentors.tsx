// File: components/sections/OurMentors.tsx
"use client";

import { ArrowRight, Star } from "lucide-react";

interface Mentor {
  id: string;
  initials: string;
  name: string;
  role: string;
  expertise: string;
  bio: string;
  avatarColor: string;
}

const mentors: Mentor[] = [
  {
    id: "1",
    initials: "RS",
    name: "Dr. Rajesh Sharma",
    role: "Space Systems Engineer",
    expertise: "Space Systems",
    bio: "Former ISRO Scientist · 20+ years experience in satellite design",
    avatarColor: "from-cyan-400 to-blue-600",
  },
  {
    id: "2",
    initials: "PK",
    name: "Dr. Priya Krishnan",
    role: "AI & Robotics Expert",
    expertise: "AI & Robotics",
    bio: "IIT Graduate · Specialist in autonomous defence systems",
    avatarColor: "from-orange-400 to-amber-600",
  },
  {
    id: "3",
    initials: "AV",
    name: "Wing Cdr. Arun Varma",
    role: "Defence Aviation Expert",
    expertise: "Defence Aviation",
    bio: "Retd. IAF Wing Commander · Aircraft design and simulation",
    avatarColor: "from-emerald-400 to-teal-600",
  },
  {
    id: "4",
    initials: "SM",
    name: "Dr. Sunita Menon",
    role: "Rocketry Specialist",
    expertise: "Rocketry",
    bio: "DRDO Alumnus · Expert in propulsion and launch systems",
    avatarColor: "from-violet-400 to-purple-600",
  },
];

export default function OurMentors() {
  return (
    <section className="min-h-screen bg-[#0d0d0d] text-zinc-300 py-16 px-4 selection:bg-orange-500 selection:text-black">
  
         

        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
              Mentors
            </span>
            <div className="h-px w-16 bg-orange-500/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            Our Mentors
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Learn from India's leading scientists, engineers, and defence
            professionals.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#111111] border border-[#262626] rounded-2xl p-6 hover:border-orange-500/40 transition-all group"
            >
              {/* Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border-2 border-[#2a2a2a] group-hover:border-orange-500/50 transition-colors">
                <span className="text-2xl font-bold text-white">
                  {mentor.initials}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-white font-semibold text-center text-lg mb-1">
                {mentor.name}
              </h3>

              {/* Role */}
              <p className="text-orange-500 text-sm font-medium text-center mb-3">
                {mentor.role}
              </p>

              {/* Bio */}
              <p className="text-zinc-500 text-sm  text-center mb-6 leading-relaxed">
                {mentor.bio}
              </p>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all active:scale-95 text-sm">
                Request Mentorship
              </button>
            </div>
          ))}
        </div>

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
      
    </section>
  );
}

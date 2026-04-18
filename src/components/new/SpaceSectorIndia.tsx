"use client";
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SpaceSectorIndia: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* LEFT: TEXT */}
          <div className="flex flex-col justify-center rounded-xl p-5 sm:p-7 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight font-serif">
              Space Sector in India
            </h2>

            <div className="text-[#ff6b35]  text-sm sm:text-base lg:text-lg font-semibold mb-4">
              Hon'ble Prime Minister Shri Narendra Modi:
            </div>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              The Government of India, under the visionary leadership of
              Honorable PM Shri Narendra Modi, has initiated groundbreaking
              reforms in the space sector.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              These initiatives are designed to enhance and promote space
              education, research, and development across the nation. A key
              highlight of these efforts is the celebration of{" "}
              <span className="text-cyan-400 font-semibold">
                National Space Day on August 23
              </span>{" "}
              to commemorate the successful landing of{" "}
              <span className="text-cyan-400 font-semibold">
                Chandrayaan-3 on the moon in 2023
              </span>
              . This event promotes skills for{" "}
              <span className="text-[#ff6b35] font-semibold">
                Viksit Bharat 2047
              </span>
              .
            </p>

            <div className="rounded-lg border border-cyan-500/40 p-4 sm:p-5 mt-auto bg-blue-900/10 backdrop-blur-sm">
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                <span className="mr-2 text-[#ff6b35]">★</span>
                <span className="font-semibold text-white">
                  Our Mission:
                </span>{" "}
                BSERC is committed to fostering a strong Defence and Space
                education ecosystem.
              </p>
            </div>
          </div>

          {/* RIGHT: VIDEO */}
          <div className="relative flex flex-col justify-center items-center rounded-xl overflow-hidden  ">
            

            
            <div className="w-full aspect-video relative">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src="/video/pm.mp4" type="video/mp4" />
              </video>

              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                className="absolute left-4 top-4 z-20 inline-flex items-center justify-center rounded-full border border-white/20 bg-black/70 p-2 text-white shadow-lg transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceSectorIndia;

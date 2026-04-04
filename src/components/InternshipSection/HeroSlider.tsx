"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  badge: string;
  title: string;
  desc: string;
  cta: string;
  accentColor?: "cyan" | "violet" | "emerald" | "orange";
}

const slides: SlideData[] = [
  {
    id: 1,
    badge: "🚀 Programme 2026",
    title: "Def-Space Summer  Internship 2026",
    desc: "A flagship 6-week intensive online initiative under Def-Space Education & Innovation — shaping India's future in Space, Defence, and Technology.",
    cta: "Register Now",
    accentColor: "cyan",
  },
  {
    id: 2,
    badge: "🛡️ Classes VI–XII",
    title: "Innovation in Defence & Space Technology",
    desc: "Explore Rocketry, Drones, AI, Robotics, and Aircraft Design. Aligned with Viksit Bharat @2047 and Atmanirbhar Bharat vision.",
    cta: "Learn More",
    accentColor: "emerald",
  },
  {
    id: 3,
    badge: "🎓 Merit Scholarships",
    title: "Career Pathways in - ISRO - DRDO - HAL",
    desc: "Earn BSERC-issued certificates, explore career routes in India's top defence & space organisations, and unlock merit scholarship opportunities.",
    cta: "Apply for Scholarship",
    accentColor: "violet",
  },
];

const AUTOPLAY_DELAY = 6000;

const accentStyles: Record<
  NonNullable<SlideData["accentColor"]>,
  {
    gradient: string;
    glow: string;
    border: string;
    text: string;
    bg: string;
    hoverBg: string;
    glowColor: string;
  }
> = {
  cyan: {
    gradient: "from-cyan-500/20 via-cyan-400/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)]",
    border: "border-cyan-400/30",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    hoverBg: "hover:bg-cyan-500/20",
    glowColor: "bg-cyan-500",
  },
  violet: {
    gradient: "from-violet-500/20 via-violet-400/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(167,139,250,0.3)]",
    border: "border-violet-400/30",
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    hoverBg: "hover:bg-violet-500/20",
    glowColor: "bg-violet-500",
  },
  emerald: {
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(52,211,153,0.3)]",
    border: "border-emerald-400/30",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    hoverBg: "hover:bg-emerald-500/20",
    glowColor: "bg-emerald-500",
  },
  orange: {
    gradient: "from-orange-500/20 via-orange-400/10 to-transparent",
    glow: "shadow-[0_0_40px_-10px_rgba(251,146,60,0.3)]",
    border: "border-orange-400/30",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    hoverBg: "hover:bg-orange-500/20",
    glowColor: "bg-orange-500",
  },
};

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);


  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  // Progress bar animation
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    
    const startTime = Date.now();
    
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      
      
      if (newProgress >= 100 && progressRef.current) {
        clearInterval(progressRef.current);
      }
    }, 50);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentSlide, isPaused, prefersReducedMotion]);

  // Autoplay
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, prefersReducedMotion]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide((currentSlide + 1) % slides.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
 
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      goToSlide((currentSlide + 1) % slides.length);
    } else if (isRightSwipe) {
      goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentSlideData = slides[currentSlide];
  const currentAccent = accentStyles[currentSlideData.accentColor || "cyan"];

  return (
    <section
      className="relative w-full h-[70vh] sm:h-[80vh] bg-black overflow-hidden"
      role="region"
      aria-label="Featured programmes carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(30, 30, 40, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 30, 40, 0.8) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${currentAccent.gradient} transition-all duration-1000`}
        />
      </div>

      {/* Dynamic Glow Orb - Only on desktop for performance */}
      {!prefersReducedMotion && (
        <div
          className={`absolute -top-1/3 -right-1/4 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full blur-[100px] sm:blur-[120px] opacity-15 sm:opacity-20 animate-pulse hidden sm:block ${currentAccent.glowColor}`}
          aria-hidden="true"
        />
      )}

      {/* Slides Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const accent = accentStyles[slide.accentColor || "cyan"];

          return (
            <article
              key={slide.id}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              {/* Dark Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/90 sm:via-black/80 to-black/50"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-20 text-center w-full px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto">
                {/* Badge */}
                <span
                  className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-medium border rounded-full backdrop-blur-md ${accent.border} ${accent.text} ${accent.bg} ${
                    prefersReducedMotion
                      ? ""
                      : `transition-all duration-700 ease-out delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
                  }`}
                >
                  <span
                    className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current animate-pulse"
                    aria-hidden="true"
                  />
                  <span className="truncate max-w-[260px] sm:max-w-none">
                    {slide.badge.trim()}
                  </span>
                </span>

                {/* Title */}
                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-4 sm:mb-6 text-white leading-tight tracking-tight px-2 ${
                    prefersReducedMotion
                      ? ""
                      : `transition-all duration-700 ease-out delay-200 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
                  }`}
                >
                  {slide.title}
                </h1>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base text-gray-300 sm:text-gray-400 mb-6 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2 ${
                    prefersReducedMotion
                      ? ""
                      : `transition-all duration-700 ease-out delay-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
                  }`}
                >
                  {slide.desc}
                </p>

                {/* CTA Button */}
                <a
                  href="#register"
                  className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-white backdrop-blur-md border ${accent.border} ${accent.bg} ${accent.hoverBg} ${accent.glow} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${accent.text.replace("text", "focus:ring")} min-h-[48px] sm:min-h-[52px] ${
                    prefersReducedMotion
                      ? ""
                      : `delay-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`
                  }`}
                >
                  <span className="truncate">{slide.cta}</span>
                  <ChevronRight className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

       

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-3 sm:px-6 z-30 pointer-events-none">
        <button
          onClick={() => goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
          className="pointer-events-auto group p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="pointer-events-auto group p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Indicators - Moved outside slide loop */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 z-30"
        role="tablist"
      >
        {slides.map((slide, i) => {
          const accent = accentStyles[slide.accentColor || "cyan"];
          const isActive = i === currentSlide;
          
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(i)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}: ${slide.title}`}
              className={`relative rounded-full transition-all duration-300 focus:outline-none bg-white/20 focus:ring-2 focus:ring-white/20 ${
                isActive
                  ? `w-8 sm:w-10 h-1.5 sm:h-2 ${accent.text.replace("text", "bg")}`
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          );
        })}
      </div>

      {/* Slide Counter - Mobile only */}
      <div className="absolute top-3 right-3 z-30 text-xs text-white/60 sm:hidden bg-black/30 px-2 py-1 rounded">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
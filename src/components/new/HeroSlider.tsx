"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Circle, Play, Pause } from "lucide-react";

// ──────────────────────────────────────────────────────────────
// 1. TYPES & CONFIGURATION
// ──────────────────────────────────────────────────────────────
type SlideType = "video" | "hero-content";

interface SlideConfig {
  id: number;
  type: SlideType;
  videoUrl?: string;
}

const SLIDES_CONFIG: SlideConfig[] = [
  {
    id: 1,
    type: "hero-content",
  },
  {
    id: 2,
    type: "video",
    videoUrl: "/video/space-video.mp4",
  },
];

// ──────────────────────────────────────────────────────────────
// 2. PAGE COMPONENTS
// ──────────────────────────────────────────────────────────────

/** Page 1: Fullscreen Background Video */
const VideoSlide: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayback = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      <button
        onClick={togglePlayback}
        className="absolute top-20 right-4 md:top-6 md:right-6 p-2.5 md:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all z-20"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
};

/** Page 2: Hero Content */
const HeroContentSlide: React.FC = () => {
  return (
    <section className="w-full h-screen bg-black text-white flex flex-col items-center justify-center px-6  pb-10 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center pb-10">
        {/* Badge with top glow */}
        <div className="relative inline-block mb-10">
          {/* Top center glow effect */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-cyan-400/30 blur-2xl rounded-full" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1/2 h-8 bg-cyan-300/40 blur-xl rounded-full" />
          
          {/* Badge */}
          <span className="relative px-6 py-2.5 rounded-full text-sm font-semibold tracking-widest text-cyan-300 border border-cyan-500/50 bg-cyan-950/20 backdrop-blur-sm">
            NATIONAL SPACE DAY
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif leading-tight mb-6 text-white">
          India's Def-Space 
          <br />
          Sector Revolution
        </h1>

        {/* Subtitle */}
        <p className="text-yellow-400 text-lg md:text-xl font-semibold mb-6">
          Transforming India's Defence & Space Sector
        </p>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Advancing scientific innovation, Defence & Space literacy, and <br />
          research excellence for Viksit Bharat 2047
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-semibold rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-200">
            Explore
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 border border-gray-600 text-white font-semibold rounded-lg hover:bg-gray-800 hover:border-gray-500 transition-all duration-200">
            Learn More
          </button>
        </div>
      </div>

       
    </section>
  );
};

// ──────────────────────────────────────────────────────────────
// 3. MAIN SLIDER COMPONENT
// ──────────────────────────────────────────────────────────────
const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const totalSlides = SLIDES_CONFIG.length;

  const changeSlide = useCallback(
    (direction: "next" | "prev") => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentSlide((prev) =>
        direction === "next"
          ? (prev + 1) % totalSlides
          : (prev - 1 + totalSlides) % totalSlides
      );
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning, totalSlides]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") changeSlide("next");
      if (e.key === "ArrowLeft") changeSlide("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeSlide]);

  const renderSlideContent = (slide: SlideConfig) => {
    switch (slide.type) {
      case "video":
        return <VideoSlide videoUrl={slide.videoUrl || ""} />;
      case "hero-content":
        return <HeroContentSlide />;
      default:
        return (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            Unknown Slide Type
          </div>
        );
    }
  };

  return (
    <div
      className="relative w-full h-screen md:h-[90vh] bg-black overflow-hidden group"
      onMouseEnter={() => setIsHoveringNav(true)}
      onMouseLeave={() => setIsHoveringNav(false)}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {SLIDES_CONFIG.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {renderSlideContent(slide)}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-4 inset-y-auto bottom-4   md:inset-y-0 md:left-0 md:right-0 flex items-center justify-between px-2 sm:px-4 md:px-8 z-30 pointer-events-none">
        {/* Previous Button */}
        <button
          onClick={() => changeSlide("prev")}
          disabled={isTransitioning}
          className={` 
            pointer-events-auto
            p-2 sm:p-3 md:p-4 rounded-full
            bg-black/30 backdrop-blur-md
            border border-white/20
            text-white
            hover:bg-black/50 hover:border-cyan-400/50 hover:scale-110
            transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
            ${isHoveringNav ? "opacity-100 translate-x-0" : "opacity-70 -translate-x-2"}
          `}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => changeSlide("next")}
          disabled={isTransitioning}
          className={`
            pointer-events-auto
            p-2 sm:p-3 md:p-4 rounded-full
            bg-black/30 backdrop-blur-md
            border border-white/20
            text-white
            hover:bg-black/50 hover:border-cyan-400/50 hover:scale-110
            transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
            ${isHoveringNav ? "opacity-100 translate-x-0" : "opacity-70 translate-x-2"}
          `}
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {SLIDES_CONFIG.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentSlide) {
                setIsTransitioning(true);
                setCurrentSlide(index);
                setTimeout(() => setIsTransitioning(false), 700);
              }
            }}
            className="group/dot transition-all p-1"
            aria-label={`Go to slide ${index + 1}`}
          >
            <Circle
              size={index === currentSlide ? 10 : 7}
              className={`
                transition-all duration-300
                ${
                  index === currentSlide
                    ? "text-cyan-400 fill-cyan-400 scale-110"
                    : "text-gray-500 group-hover/dot:text-gray-300"
                }
              `}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
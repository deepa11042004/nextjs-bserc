"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  title?: string;
  description?: string;
  buttonText?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  showContent?: boolean;
}



const slides: SlideData[] = [
  {
    id: 1,
    backgroundVideo: "/video/space-video.mp4",
    showContent: false,
  },
  {
    id: 2,
    title: "Innovating Future",
    description: "Explore the next generation of scientists and engineers.",
    buttonText: "Our Programs",
    backgroundImage: "/img/banner_rocket.jpg",
    showContent: true,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="relative h-[69vh] w-full overflow-hidden text-white">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* VIDEO */}
            {slide.backgroundVideo && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={slide.backgroundVideo} type="video/mp4" />
              </video>
            )}

            {/* IMAGE */}
            {slide.backgroundImage && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              />
            )}

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/60" />

            {/* CONTENT */}
            {slide.showContent && (
              <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-6">
                  <h1
                    className={`text-3xl md:text-5xl lg:text-6xl font-bold transition ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={`text-gray-300 text-base md:text-xl transition ${
                      index === currentSlide
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {slide.description}
                  </p>

                  <button className="bg-[#38bdf8] hover:bg-[#0ea5e9] transition px-8 py-3 rounded-full font-semibold shadow-lg text-black ">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 p-3 rounded-full hover:bg-white/20"
      >
        <ChevronRight size={40} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 px-4 py-2 rounded-full backdrop-blur">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-2  rounded-full transition-all ${
              index === currentSlide
                ? "w-2 bg-white"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

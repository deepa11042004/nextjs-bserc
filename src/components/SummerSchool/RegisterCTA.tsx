import React from "react";
import { ArrowRight } from "lucide-react";

interface RegisterCTAProps {
  className?: string;
  title?: string;
  buttonText?: string;
  buttonLink?: string;
}

const RegisterCTA: React.FC<RegisterCTAProps> = ({
  title = "Register for Def-Space Summer School 2026 via the official BSERC portal",
  buttonText = "REGISTER NOW",
  buttonLink = "#register",
}) => {
  return (
    <section className={`w-full py-12 sm:py-16 px-4 bg-black  `}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Description Text */}
        <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
          {title}
        </p>

        {/* CTA Button with Glow Effect */}
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 blur-xl opacity-40 rounded-full animate-pulse" />

          {/* Button */}
          <a
            href={buttonLink}
            className="relative inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 rounded-xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 shadow-lg hover:shadow-amber-500/25"
          >
            <span className="text-sm sm:text-base uppercase tracking-wide">
              {buttonText}
            </span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RegisterCTA;

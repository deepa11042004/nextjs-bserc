import React from 'react';

// Define the type for our bullet points
type ProgramFeature = {
  id: number;
  text: string;
};

const ProgramOverview: React.FC = () => {
  // Data for the bullet points, extracted from image_2.png
  const programFeatures: ProgramFeature[] = [
    { id: 1, text: "Hands-on learning with industry experts" },
    { id: 2, text: "Real-world projects and innovation" },
    { id: 3, text: "Certification and career advancement" },
  ];

  return (
    <section id="about" className="bg-black text-white py-20 px-6 md:px-12 font-sans ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Column: Placeholder for Rocket/Video Frame */}
        {/* Relative container to anchor the absolute-positioned badge */}
        <div className="relative w-full flex-1 aspect-[16/10] bg-[#121212] rounded-2xl border border-zinc-800 flex items-center justify-center p-8 group">
          
          {/* Central Rocket Emoji (Scale it up for effect) */}
          <div className="text-8xl transform group-hover:scale-110 transition-transform duration-300">
            🚀
          </div>

          {/* Absolute-Positioned Badge */}
          {/* Anchored at bottom-right, offset, uses custom lime green */}
          <div className="absolute bottom-[-2.5rem] right-[5%] flex flex-col items-center justify-center px-6 py-4 rounded-xl bg-orange-500 text-black shadow-lg">
            <span className="text-5xl font-extrabold font-serif leading-none">6</span>
            <span className="text-sm font-semibold whitespace-nowrap tracking-tight">
              weeks intensive
            </span>
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="flex-1 flex flex-col gap-6 md:pl-8">
          
          {/* Label Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {/* Vertical line accent */}
              <div className="w-1 h-3 bg-orange-400"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
                ABOUT INTERNSHIP
              </p>
            </div>
            
            {/* Main Title - Serif Font */}
            <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
              Program Overview
            </h2>
          </div>
          
          {/* Main Description */}
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
            Undergraduate and postgraduate students and research scholars in recognised universities across India and abroad are welcome to apply. This intensive program combines technical expertise, hands-on experience, and mentorship from industry leaders in space technology and defence systems.
          </p>

          {/* Bulleted Check List */}
          <ul className="flex flex-col gap-4 mb-3">
            {programFeatures.map((feature) => (
              <li key={feature.id} className="flex items-center gap-3">
                {/* Custom Checkmark (Could also use an SVG) */}
                <span className="text-xl text-[#CBF63D]">✓</span>
                <span className="text-lg text-zinc-300">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* "Learn More" Button */}
          <div className="flex justify-start">
            <a
              href="#"
              className="px-8 py-3.5 rounded-full bg-orange-500 text-black font-semibold text-base flex items-center gap-2 hover:brightness-110 transition-all shadow-md group"
            >
              <span>Learn More</span>
              {/* Arrow transition on hover */}
              <span className="text-lg group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default ProgramOverview;
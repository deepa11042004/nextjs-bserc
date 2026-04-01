import React from "react";

// Data structure for the testimonial cards
type BenefitItem = {
  id: number;
  rating: number; // e.g., 5 for five stars
  quote: string;
  initials: string;
  initialsBgColor: string; // The class name for the background, e.g., 'bg-lime-400'
  authorName: string;
  authorSubtitle: string;
};

const ProgramBenefits: React.FC = () => {
  // Data for the cards, extracted directly from image_1.png
  const benefitsData: BenefitItem[] = [
    {
      id: 1,
      rating: 5,
      quote:
        "An incredible opportunity to work on cutting-edge space and defence technologies alongside industry mentors and brilliant peers from across India.",
      initials: "AP",
      initialsBgColor: "bg-[#CBF63D]", // Custom Lime Green
      authorName: "Career Growth",
      authorSubtitle: "Advance your skills",
    },
    {
      id: 2,
      rating: 5,
      quote:
        "Gain hands-on experience with real-world projects in aerospace, drone technology, rocketry, and AI. Build a portfolio that stands out to top employers.",
      initials: "EX",
      initialsBgColor: "bg-[#7988FE]", // Custom Light Blue
      authorName: "Real Experience",
      authorSubtitle: "Practical projects",
    },
    {
      id: 3,
      rating: 5,
      quote:
        "Network with fellow innovators, industry leaders, and researchers. Build connections that will shape your future career in space technology and defence.",
      initials: "NW",
      initialsBgColor: "bg-[#FEA362]", // Custom Orange/Peach
      authorName: "Networking",
      authorSubtitle: "Build connections",
    },
  ];

  // Helper to render star rating
  const StarRating = ({ count }: { count: number }) => {
    return (
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-xl ${index < count ? "text-[#FACC15]" : "text-zinc-600"}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-12 items-center ">
          

          <div className="flex items-center gap-2">
              {/* Vertical line accent */}
              <div className="w-1 h-3 bg-orange-400"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
                WHY PARTICIPATE
              </p>
            </div>

           

          {/* Main Title - Uses a custom or default Serif font */}

          <h2 className="text-3xl sm:text-4xl font-bold font-serif  text-white text-center  ">
            Program Benefits
          </h2>

          <p className="text-gray-400 text-sm md:text-lg max-w-3xl mx-auto   leading-relaxed">
            What you'll gain from the Def-Space Summer Internship 2026.
          </p>
        </div>

        {/* Benefits Grid (3-column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-[#121212] border border-zinc-800 p-8 rounded-xl flex flex-col justify-between"
            >
              {/* Top part: Stars and Quote */}
              <div>
                <StarRating count={benefit.rating} />

                <p className="text-zinc-300 text-[1.05rem] leading-relaxed mb-10 italic">
                  "{benefit.quote}"
                </p>
              </div>

              {/* Bottom part: Author Profile */}
              <div className="flex items-center gap-4 mt-auto">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-lg ${benefit.initialsBgColor}`}
                >
                  {benefit.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {benefit.authorName}
                  </h4>
                  <p className="text-sm text-zinc-500">
                    {benefit.authorSubtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramBenefits;

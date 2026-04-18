"use client"
import { MapPin, Star, Map, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

type State = {
  name: string;
  capital?: string;
  isUT?: boolean;
};

const states: State[] = [
  { name: "Andhra Pradesh", capital: "Amaravati" },
  { name: "Arunachal Pradesh", capital: "Itanagar" },
  { name: "Assam", capital: "Dispur" },
  { name: "Bihar", capital: "Patna" },
  { name: "Chhattisgarh", capital: "Naya Raipur" },
  { name: "Goa", capital: "Panaji" },
  { name: "Gujarat", capital: "Gandhinagar" },
  { name: "Haryana", capital: "Chandigarh" },
  { name: "Himachal Pradesh", capital: "Shimla" },
  { name: "Jharkhand", capital: "Ranchi" },
  { name: "Karnataka", capital: "Bengaluru" },
  { name: "Kerala", capital: "Thiruvananthapuram" },
  { name: "Madhya Pradesh", capital: "Bhopal" },
  { name: "Maharashtra", capital: "Mumbai" },
  { name: "Manipur", capital: "Imphal" },
  { name: "Meghalaya", capital: "Shillong" },
  { name: "Mizoram", capital: "Aizawl" },
  { name: "Nagaland", capital: "Kohima" },
  { name: "Odisha", capital: "Bhubaneswar" },
  { name: "Punjab", capital: "Chandigarh" },
  { name: "Rajasthan", capital: "Jaipur" },
  { name: "Sikkim", capital: "Gangtok" },
  { name: "Tamil Nadu", capital: "Chennai" },
  { name: "Telangana", capital: "Hyderabad" },
  { name: "Tripura", capital: "Agartala" },
  { name: "Uttar Pradesh", capital: "Lucknow" },
  { name: "Uttarakhand", capital: "Dehradun" },
  { name: "West Bengal", capital: "Kolkata" },
  // UTs
  { name: "Delhi", isUT: true },
  { name: "Chandigarh", isUT: true },
  { name: "Puducherry", isUT: true },
  { name: "Ladakh", isUT: true },
  { name: "Jammu & Kashmir", isUT: true },
  { name: "Andaman & Nicobar", isUT: true },
  { name: "Lakshadweep", isUT: true },
  { name: "Daman & Diu", isUT: true },
  { name: "Dadra & Nagar Haveli", isUT: true },
];

const StateCard = ({ state }: { state: State }) => {
  return (
    <div
      className={`rounded-xl p-6 text-center transition-all cursor-pointer border flex-shrink-0 w-[280px] sm:w-auto
      ${
        state.isUT
          ? "bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 border-2 border-white hover:shadow-blue-400/40 shadow-lg"
          : "bg-[#242424] border-white/10 hover:border-white hover:shadow-blue-400/40 shadow-lg"
      }`}
    >
      <div className="mb-3 flex justify-center">
        {state.isUT ? (
          <Star className="w-9 h-9 text-orange-500" />
        ) : (
          <MapPin className="w-9 h-9 text-blue-500" />
        )}
      </div>

      <h3 className="font-semibold text-white font-serif text-lg">{state.name}</h3>

      <p className="text-xs text-gray-400 mt-1">
        {state.isUT ? "Union Territory" : `Capital: ${state.capital}`}
      </p>
    </div>
  );
};

export default function StatePartnership() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto rounded-2xl px-6 py-16 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 mb-4">
            <Map className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold uppercase tracking-wide text-orange-500">
              Associated With
            </span>
          </div>

          <h2 className="text-4xl text-center font-bold font-serif text-white mb-5 pt-5 leading-tight lg:text-4xl">
            Def-Space Innovation Supported by the State Government
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
            BSERC collaborates with state governments across India to promote space education, defence technology awareness, and skill development at grassroots level. Our partnerships strengthen India's innovation ecosystem and create opportunities for youth in every corner of the nation.
          </p>
        </div>

        {/* Slider for Mobile / Grid for Desktop */}
        <div className="mb-12">
          {/* Mobile Slider */}
          <div 
            className="sm:hidden relative"
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            {/* Navigation Arrows */}
            <button
              onClick={() => scroll("left")}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition ${showArrows ? 'opacity-100' : 'opacity-0 sm:opacity-0'}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition ${showArrows ? 'opacity-100' : 'opacity-0 sm:opacity-0'}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {states.map((state) => (
                <div key={state.name} className="snap-start">
                  <StateCard state={state} />
                </div>
              ))}
            </div>

             
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
            {states.map((state) => (
              <StateCard key={state.name} state={state} />
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="rounded-2xl p-10 border border-white/10 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 max-w-6xl mx-auto">
          <h3 className="text-4xl text-center font-bold font-serif text-white pt-5 mb-6 leading-tight lg:text-4xl">
            BSERC Impact
          </h3>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Space Education Programs",
                desc: "Curricula development, teacher training, and student workshops aligned with space science and technology.",
              },
              {
                title: "Skill Development & Internships",
                desc: "Internship opportunities, vocational training, and career guidance in space and defence sectors.",
              },
              {
                title: "Community Engagement",
                desc: "Public awareness campaigns, science exhibitions, and community participation in space missions.",
              },
              {
                title: "Research & Innovation",
                desc: "Collaborative research projects, innovation challenges, and startup acceleration in space technology.",
              },
              {
                title: "Technology Transfer",
                desc: "Access to satellite applications, earth observation data, and space technology solutions for state development.",
              },
              {
                title: "Economic Development",
                desc: "Job creation, industry partnerships, and socio-economic advancement through space sector growth.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 py-10 rounded-xl border border-white/10 bg-[#242424] text-center hover:shadow-md transition"
              >
                <h4 className="font-semibold text-center text-white mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 text-center mb-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
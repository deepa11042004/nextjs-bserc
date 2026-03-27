export default function WhyEventsMatter() {
  return (
    <section className="h-screenw-full py-12 sm:py-16 px-4 bg-black">
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8 "
      >
        {/* Heading */}
        <h3 className="text-4xl md:text-4xl   font-bold font-serif  text-white mb-6 ">
          Why These Events Matter
        </h3>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Left */}
          <div>
            <h4 className="text-blue-400 font-semibold text-lg mb-4">
              🎯 National Milestones
            </h4>

            <ul className="text-gray-400 text-sm sm:text-base leading-8 space-y-1">
              
              <li><span className="text-blue-400">✓</span> Celebrate India's sovereignty & freedom</li>
              <li><span className="text-blue-400">✓</span> Honor defence personnel & contributions</li>
              <li><span className="text-blue-400">✓</span> Showcase technological achievements</li>
              <li><span className="text-blue-400">✓</span> Inspire scientific excellence</li>
              <li><span className="text-blue-400">✓</span> Demonstrate strategic capabilities</li>
              <li><span className="text-blue-400">✓</span> Foster innovation ecosystem</li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <h4 className="text-orange-400 font-semibold text-lg mb-4">
              🚀 Youth Engagement
            </h4>

            <ul className="text-gray-400 text-sm sm:text-base leading-8 space-y-1">
              <li><span className="text-orange-400">✓</span> Inspire careers in space & defence</li>
              <li><span className="text-orange-400">✓</span> Promote STEM education & research</li>
              <li><span className="text-orange-400">✓</span> Encourage scientific curiosity</li>
              <li><span className="text-orange-400">✓</span> Build awareness of national achievements</li>
              <li><span className="text-orange-400">✓</span> Create entrepreneurial opportunities</li>
              <li><span className="text-orange-400">✓</span> Foster innovation culture</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            <span className="text-blue-400 font-semibold">BSERC's Role:</span>{" "}
            The Bharat Space Education Research Centre actively participates in
            these national observances, organizing workshops, seminars, and
            educational programs that connect students and professionals with
            India's space and defence sectors. Through events like National
            Space Day on August 23, BSERC inspires the next generation of
            innovators and researchers who will shape{" "}
            <span className="text-orange-400 font-semibold">
              Viksit Bharat 2047
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

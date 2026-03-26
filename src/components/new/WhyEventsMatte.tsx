export default function WhyEventsMatter() {
  return (

    <section className="h-screenw-full py-12 sm:py-16 px-4 bg-black">

    
    <div className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8 ">
      
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
            <li>✓ Celebrate India's sovereignty & freedom</li>
            <li>✓ Honor defence personnel & contributions</li>
            <li>✓ Showcase technological achievements</li>
            <li>✓ Inspire scientific excellence</li>
            <li>✓ Demonstrate strategic capabilities</li>
            <li>✓ Foster innovation ecosystem</li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <h4 className="text-orange-400 font-semibold text-lg mb-4">
            🚀 Youth Engagement
          </h4>

          <ul className="text-gray-400 text-sm sm:text-base leading-8 space-y-1">
            <li>✓ Inspire careers in space & defence</li>
            <li>✓ Promote STEM education & research</li>
            <li>✓ Encourage scientific curiosity</li>
            <li>✓ Build awareness of national achievements</li>
            <li>✓ Create entrepreneurial opportunities</li>
            <li>✓ Foster innovation culture</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          <span className="text-blue-400 font-semibold">
            BSERC's Role:
          </span>{" "}
          The Bharat Space Education Research Centre actively participates in
          these national observances, organizing workshops, seminars, and
          educational programs that connect students and professionals with
          India's space and defence sectors. Through events like National Space
          Day on August 23, BSERC inspires the next generation of innovators and
          researchers who will shape{" "}
          <span className="text-orange-400 font-semibold">
            Viksit Bharat 2047
          </span>.
        </p>
      </div>
    </div>
    </section>
  );
}
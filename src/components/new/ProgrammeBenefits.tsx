export default function ProgrammeBenefits() {
  return (
    <section className=" w-full py-12  px-4 mt-10  ">
      <div
        className="max-w-6xl mx-auto rounded-xl border border-white/10 
    bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10  p-6 sm:p-8 "
      >
        {/* Heading */}
        <h3 className="text-4xl md:text-4xl   font-bold font-serif  text-white mb-6 ">
          Programme Overview & Benefits
        </h3>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Left */}
          <div>
            <h4 className="text-blue-400 font-semibold text-lg mb-4">
              🎯 Scientific & Economic Impact
            </h4>

            <ul className="text-gray-400 text-sm sm:text-base leading-8 space-y-1">
              <li><span className="text-blue-400">✓</span> Microgravity-based research facility</li>
              <li><span className="text-blue-400">✓</span> Technological spin-offs for multiple sectors</li>
              <li><span className="text-blue-400">✓</span> Enhanced industrial participation</li>
              <li><span className="text-blue-400">✓</span> Job creation in high-tech domains</li>
              <li><span className="text-blue-400">✓</span> Accelerated innovation ecosystem</li>
              <li><span className="text-blue-400">✓</span> International collaboration opportunities</li>
            </ul>
          </div>

          {/* Right */}
          <div>
            <h4 className="text-orange-400 font-semibold text-lg mb-4">
              🚀 Youth Opportunities
            </h4>

            <ul className="text-gray-400 text-sm sm:text-base leading-8 space-y-1">
              <li><span className="text-orange-400">✓</span> Careers in space science & technology</li>
              <li><span className="text-orange-400">✓</span> Research & development opportunities</li>
              <li><span className="text-orange-400">✓</span> Skill development in emerging fields</li>
              <li><span className="text-orange-400">✓</span> International exposure & collaboration</li>
              <li><span className="text-orange-400">✓</span> Entrepreneurship in space sector</li>
              <li><span className="text-orange-400">✓</span> Innovation-driven career paths</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            <span className="text-blue-400 font-semibold">
              Total Investment Approved:
            </span>{" "}
            With a net additional funding of{" "}
            <span className="text-orange-400 font-semibold">₹11,170 Crore</span>
            . the total funding for the Gaganyaan Programme with the revised
            scope has been enhanced to ₹20,193 Crore. This substantial
            investment underscores India's commitment to becoming a
            self-reliant, technologically advanced space-faring nation.
          </p>
        </div>
      </div>
    </section>
  );
}

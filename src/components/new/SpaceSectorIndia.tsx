import React from "react";

const SpaceSectorIndia: React.FC = () => {
  return (
    <section className="w-full py-16 px-6 relative overflow-hidden bg-black">
      
      
      {/* Content Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Text Content Card - Left Side */}
          <div 
            className="relative rounded-xl p-6 md:p-10 border-l-4 border-orange-500 shadow-xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]"
           
          >
            {/* Main Heading */}
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
              Space Sector in India
            </h2>

            {/* PM Name */}
            <div className="text-orange-400 text-base md:text-lg font-bold mb-3">
              Hon'ble Prime Minister Shri Narendra Modi:
            </div>

            {/* First Paragraph */}
            <p className="text-gray-400 text-sm md:text-base leading-7 mb-4">
              The Government of India, under the visionary leadership of Honorable PM Shri Narendra Modi, has initiated
              groundbreaking reforms in the space sector.
            </p>

            {/* Second Paragraph */}
            <p className="text-gray-400 text-sm md:text-base leading-7 mb-4">
              These initiatives are designed to enhance and promote space education, research, and development across the
              nation. A key highlight of these efforts is the celebration of{" "}
              <span className="text-cyan-400 font-semibold">National Space Day on August 23</span> to commemorate the
              successful landing of{" "}
              <span className="text-cyan-400 font-semibold">Chandrayaan-3 on the moon in 2023</span>. This event is organized by the Bharat Space Education
              Research Centre to promote skills in academia, research, and industry for{" "}
              <span className="text-orange-400 font-semibold">Viksit Bharat 2047</span>.
            </p>

            {/* Mission Box */}
            <div 
              className="rounded-lg border border-cyan-500/40 p-4 mt-4"
              style={{
                background: "rgba(30,144,255,0.1)"
              }}
            >
              <p className="text-gray-200 text-sm md:text-base leading-7 m-0">
                <span className="inline-block mr-2 text-orange-400">★</span>
                <span className="font-semibold text-white">Our Mission:</span> BSERC is committed to fostering a strong and sustainable Defence and Space education
                ecosystem, equipping students and young professionals with industry-relevant skills and technical knowledge for
                success in the rapidly evolving space sector.
              </p>
            </div>
          </div>

          {/* Video Card - Right Side */}
          <div className="relative rounded-xl overflow-hidden border border-gray-700/50 shadow-xl"
            style={{
              background: "linear-gradient(to right bottom, #0c0e0f, #0e1013, #141015, #191113, #1c120f)"
            }}
          >
            <div className="absolute inset-0 h-full w-full">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="h-full w-full object-cover"
                style={{ zIndex: 0 }}
              >
                <source src="/video/pm.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpaceSectorIndia;
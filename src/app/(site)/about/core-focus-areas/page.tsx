import React from "react";

const Page: React.FC = () => {
  const cardStyles =
    "rounded-xl p-5 sm:p-6 md:p-8 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]";

  return (
    <section className="w-full bg-black py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-center font-serif font-bold text-white leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10">
          Government Initiatives in the Space Sector
        </h1>

        {/* Content Cards */}
        <div className="space-y-6 sm:space-y-8">
          <div className={cardStyles}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              The Government of India, under the visionary leadership of  Hon'ble {""}
            <span className="text-orange-400 font-semibold">
            PM Shri Narendra Modi,
            </span>
            {""} has initiated groundbreaking reforms in the space sector. These initiatives are designed to enhance and promote defence & space education, research, and development across the nation. A key highlight is the celebration of National Space Day on August 23, which underscores India's commitment to fostering innovation and scientific excellence in space exploration. In alignment with the 

              {" "}
            <span className="text-cyan-400 font-semibold">
             Viksit Bharat Abhiyan@2047.
            </span>
            </p>
          </div>

          <div className={cardStyles}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">

               {""}
            <span className="text-orange-400 font-semibold">
           Bharat Space Education Research Centre (BSERC)
            </span>
            {" "}
               functions as an official Space Tutor under ISRO and is registered under   {" "}
            <span className="text-cyan-400 font-semibold">
             iSTEM (Office of the Principal Scientific Adviser to the Government of India) .
            </span> {" "} All programmes conducted by the Centre are submitted to the ISRO, Department of Space, Government of India.
            </p>
          </div>

          <div className={cardStyles}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
             The programmes and initiatives of Bharat Space Education Research Centre are designed to align with the vision of  {" "}
            <span className="text-cyan-400 font-semibold">
           Viksit Bharat @2047
            </span> {" "} and Atmanirbhar Bharat, with a focus on Defence - Space Education and Innovation for a Developed India, in accordance with the guidelines of the Government of India.
            </p>
          </div>

          <div className={cardStyles}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
             Following the notice dated 8th December 2023 regarding the online meeting on {" "}
            <span className="text-cyan-400 font-semibold">
           “Viksit Bharat @2047: Voice of Youth”
            </span> {" "} <span className="text-orange-400 font-semibold">
         (F.1-1/2023(Secy/ViksitBharat@2047))
            </span> , and the subsequent launch of the {" "}
            <span className="text-cyan-400 font-semibold">
           Viksit Bharat @2047
            </span> {" "} initiative by the Hon’ble Prime Minister on 11th December 2023, the Centre remains committed to contributing meaningfully to this national mission.
            </p>
          </div>

          <div className={cardStyles}>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
             {" "}
            <span className="text-cyan-400 font-semibold">
          Bharat Space Education Research Centre
            </span> {" "}  is dedicated to advancing education, research, and skill development in Space Science, Defence Technology, and Emerging Technologies in collaboration with public and private organizations. The Centre operates in alignment with ISRO and iSTEM initiatives and holds approvals from the Ministry of Consumer Affairs, Government of India. It is also registered as a Skill India Training Centre under the Ministry of Skill Development and Entrepreneurship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
import {
  Network,
  Briefcase,
  TrendingUp,
  Award,
 Star,
  BookOpen,
  Users,
  Zap,
  Globe,
} from "lucide-react";
import Image from "next/image";
import HeroBanner from "@/components/layout/Banner";
interface Feature {
  title: string;
  description?: string;
  icon: React.ElementType;
  accent: "blue" | "orange";
  footer?: {
    title?: string;
    content: React.ReactNode;
  };
}
const features: Feature[] = [
  {
    title: "Our Vision",
    description:
      "To advance education and research in space and defence technologies, computing, and innovation to accelerate national development through cutting-edge research and technological excellence.",
    icon: Network,
    accent: "blue",
  },
  {
    title: "Our Mission",
    description:
      "To promote grassroots academic technology transfer by designing targeted programmes for students, faculty, researchers, and government officials, thereby enhancing knowledge, skills, and innovation in the space and defence sectors.",
    icon: Briefcase,
    accent: "orange",
  },
  {
    title: "Our Goal",
    description:
      "To make Space Science, Computing, and Technology accessible to all, while fostering innovation in satellite development, space tourism, drone technology, aircraft design, and advanced defence systems.",
    icon: TrendingUp,
    accent: "blue",
  },
  {
    title: "Core Focus Areas",
    icon: Award,
    accent: "orange",
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Space Science and Planetary Exploration</li>
          <li>Defence-Space and Emerging Technologies</li>
          <li>
            Astronomy, Rocketry, Satellite Technology, Drone Technology, and
            Remote Sensing
          </li>
          <li>Faculty and Student Development</li>
          <li>Community and Tribal Engagement</li>
          <li>Commemorate India's National Defence & Space Milestones</li>{" "}
        </ul>
      ),
    },
  },

  {
    title: "Major Initiatives:",
    icon: Award,
    accent: "blue",
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Def-Space Workshops </li>
          <li>National Technology Day May 11</li>
          <li>Def-Space Summer School ( 15th May - 30th June )</li>
          <li>Def-Space Summer Internship ( 19th June - 30th July )</li>
          <li>Def-Space Innovation Week ( 18th - 22nd August )</li>
          <li>National Space Day 23rd August</li>
          <li>Def-Space Winter Internship ( 15th December - 15th January )</li>
        </ul>
      ),
    },
  },
  {
    title: "Def-Space Education and Innovation:",
    icon: Award,
    description:
      "These initiatives cater to diverse audiences, from primary school students engaging with portable planetarium demonstrations to faculty and advanced students participating in workshops on topics such as:.",
    accent: "orange",
    footer: {
      content: (
        <ul className="list-disc space-y-1 pl-4">
          <li>Aircraft Design Technology</li>
          <li>Astronomy</li>
          <li>Rocketry</li>
          <li>Satellite Technology</li>
          <li>Defence Drone Technology & Air Taxi</li>
          <li>Remote Sensing</li>
          <li>Space Entrepreneurship</li>
          <li>Artificial Intelligence</li>
        </ul>
      ),
    },
  },
];

const page = () => {
  const cardStyles =
    "rounded-xl p-5 sm:p-6 md:p-8 lg:p-10 border-l-4 border-[#ff6b35] shadow-2xl bg-[linear-gradient(to_right_bottom,#0c141c,#14121b,#191118,#1c1114,#1c120f)]";

  return (
    <>
      <HeroBanner
        title="About Us"
        backgroundImage="/img/about-hero-v2.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },

          { label: "About", isActive: true },
        ]}
      />

      <div className="max-w-6xl mx-auto py-12 sm:py-16 ">
        {/* heading */}
        <div>
          {/* Heading */}
          <h1 className="text-center font-serif font-bold text-white leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-10">
            Government Initiatives in the Space Sector
          </h1>

          {/* paragraph */}
          <div className="space-y-6 sm:space-y-8">
            <div className={cardStyles}>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                The Government of India, under the visionary leadership of
                Hon'ble {""}
                <span className="text-orange-400 font-semibold">
                  PM Shri Narendra Modi,
                </span>
                {""} has initiated groundbreaking reforms in the space sector.
                These initiatives are designed to enhance and promote defence &
                space education, research, and development across the nation. A
                key highlight is the celebration of National Space Day on August
                23, which underscores India's commitment to fostering innovation
                and scientific excellence in space exploration. In alignment
                with the{" "}
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
                </span>{" "}
                functions as an official Space Tutor under ISRO and is
                registered under{" "}
                <span className="text-cyan-400 font-semibold">
                  iSTEM (Office of the Principal Scientific Adviser to the
                  Government of India) .
                </span>{" "}
                All programmes conducted by the Centre are submitted to the
                ISRO, Department of Space, Government of India.
              </p>
            </div>

            <div className={cardStyles}>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                The programmes and initiatives of Bharat Space Education
                Research Centre are designed to align with the vision of{" "}
                <span className="text-cyan-400 font-semibold">
                  Viksit Bharat @2047
                </span>{" "}
                and Atmanirbhar Bharat, with a focus on Defence - Space
                Education and Innovation for a Developed India, in accordance
                with the guidelines of the Government of India.
              </p>
            </div>

            <div className={cardStyles}>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                Following the notice dated 8th December 2023 regarding the
                online meeting on{" "}
                <span className="text-cyan-400 font-semibold">
                  “Viksit Bharat @2047: Voice of Youth”
                </span>{" "}
                <span className="text-orange-400 font-semibold">
                  (F.1-1/2023(Secy/ViksitBharat@2047))
                </span>{" "}
                , and the subsequent launch of the{" "}
                <span className="text-cyan-400 font-semibold">
                  Viksit Bharat @2047
                </span>{" "}
                initiative by the Hon’ble Prime Minister on 11th December 2023,
                the Centre remains committed to contributing meaningfully to
                this national mission.
              </p>
            </div>

            <div className={cardStyles}>
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {" "}
                <span className="text-cyan-400 font-semibold">
                  Bharat Space Education Research Centre
                </span>{" "}
                is dedicated to advancing education, research, and skill
                development in Space Science, Defence Technology, and Emerging
                Technologies in collaboration with public and private
                organizations. The Centre operates in alignment with ISRO and
                iSTEM initiatives and holds approvals from the Ministry of
                Consumer Affairs, Government of India. It is also registered as
                a Skill India Training Centre under the Ministry of Skill
                Development and Entrepreneurship.
              </p>
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="py-12 sm:py-16 ">
          {/* Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              const isBlue = feature.accent === "blue";

              return (
                <div
                  key={i}
                  className={`relative rounded-xl p-6 border-l-4 transition-all duration-300 hover:scale-[1.02]
                ${
                  isBlue
                    ? "border-blue-500 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-400/30"
                    : "border-orange-500 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-400/30"
                }`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 ${
                      isBlue ? "text-blue-400" : "text-orange-400"
                    }`}
                  >
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Title */}
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {feature.title}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Footer / Highlight Box */}
                  {feature.footer && (
                    <div
                      className={`mt-4 ${
                        isBlue
                          ? "bg-gradient-to-br from-[#1E90FF]/10 to-[#1E90FF]/5 border-[#1E90FF]"
                          : "bg-gradient-to-br from-[#FF6B35]/10 to-[#FF6B35]/5 border-[#FF6B35]"
                      } border-l-2 p-3 rounded-md text-sm text-gray-300`}
                    >
                      {feature.footer.title && (
                        <p className="font-semibold text-white mb-1">
                          {feature.footer.title}
                        </p>
                      )}
                      {feature.footer.content}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        

       
        {/* BSERC Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center py-10">
  {/* Text Content */}
  <div className="text-center lg:text-left order-2 lg:order-1">
    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
      BSERC
    </h2>
    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
      Bharat Space Education Research Centre further fosters learning
      through student and faculty development programs, specialized
      laboratories for Drone and Def-Space science, Def-Space Summer
      School, Def-Space Innovation Week, and Summer & Winter Internship
      opportunities.
    </p>
  </div>

  {/* Image */}
  <div className="flex justify-center lg:justify-end order-1 lg:order-2">
    <Image
      src="/img/bserc_new_logo.png"
      alt="BSERC Logo"
      width={400}
      height={400}
      className="w-48 sm:w-64 md:w-80 lg:w-full max-w-sm object-contain rounded-2xl shadow-lg"
    />
  </div>
</div>

         {/* Highlight */}
  <div className="flex justify-center items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
    <Star className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
     Def-Space Education and Innovation: For Innovators & Learners | Atmanirbhar Bharat | Viksit Bharat @2047
    </p>
  </div>


      </div>

    </>
  );
};

export default page;

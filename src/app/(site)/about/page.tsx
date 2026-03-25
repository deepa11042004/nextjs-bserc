import React from "react";

import Image from "next/image";

import HeroBanner from "@/components/layout/Banner";

const about = () => {
  return (
    <div className="bg-black">
      <HeroBanner
        title="About Us"
        backgroundImage="/img/about-hero-v2.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },

          { label: "About", isActive: true },
        ]}
      />

      {/* Section 1: Hero / Introduction */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <Image
              src="/img/logo.png"
              alt="BSERC Logo"
              width={400}
              height={400}
              className="h-full w-full rounded-lg shadow-lg object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Bharat Space Education Research Centre
            </h2>
            <p className="text-lg mb-4 text-gray-300">
              Space Science, Computing and Technology for all
            </p>
            <p className="mb-6 text-gray-300">
              The Bharat Space Education Research Centre is a leading
              organization committed to advancing scientific understanding of
              Earth and the Universe, promoting Space science, Computing and
              technology literacy for all, and inspiring the next generation of
              scientists and engineers.
            </p>

            {/* Features */}
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <i className="fa fa-atom text-white"></i>
              </div>
              <div className="ml-3">
                <h5 className="text-blue-400 font-semibold">
                  Scientific Understanding
                </h5>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
                <i className="fa fa-rocket text-white"></i>
              </div>
              <div className="ml-3">
                <h5 className="text-blue-400 font-semibold">
                  Space Technology
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Research & Exploration */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
          <div className="w-full lg:w-1/2 text-white order-2 lg:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Research & Exploration
            </h2>
            <p className="mb-4 text-gray-300">
              The Research Branch of Bharat Space Education Research Centre
              (BSERC) actively participates in a wide range of space science
              endeavors, encompassing Earth science, space physics, planetary
              science, and astrophysics.
            </p>
            <p className="mb-4 text-gray-300">
              The research team's expertise has expanded to include
              investigations of terrestrial and geospace phenomena, contributing
              to a deeper understanding of our planet and its place in the
              cosmos.
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
            <Image
              src="https://bserc.org/assets/img/research.png"
              alt="Research at BSERC"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <Image
                src="https://bserc.org/assets/img/education.png"
                alt="Education at BSERC"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Education & Initiatives
              </h2>
              <p className="mb-4 text-gray-300">
                These initiatives cater to diverse audiences, from primary
                school students engaging with portable planetarium
                demonstrations to faculty and advanced students participating in
                workshops on topics such as:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Astronomy
                  </li>
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Rocketry
                  </li>
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Satellite
                    Technology
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Drone
                    Technology
                  </li>
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Remote
                    Sensing
                  </li>
                  <li>
                    <i className="fa fa-check text-blue-400 mr-2"></i>Space
                    Entrepreneurship
                  </li>
                </ul>
              </div>

              <p className="text-gray-300">
                BSERC further fosters learning through student and faculty
                development programs, specialized laboratories for drone and
                space science, and internship opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Community Engagement */}
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-10 items-center">
          <div className="w-full lg:w-1/2 text-white order-2 lg:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Community Engagement
            </h2>
            <p className="mb-4 text-gray-300">
              Recognizing the importance of community engagement, BSERC also
              implements programs focused on tribal development. These
              initiatives aim to bridge the gap and bring scientific awareness
              to all sections of society.
            </p>
            <p className="mb-4 text-gray-300">
              Our programs focus on cultural preservation, economic empowerment,
              and capacity building, ensuring that the benefits of space science
              and technology reach every corner of the community.
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-8 lg:mb-0">
            <Image
              src="/img/community.png"
              alt="Community Engagement"
              width={600}
              height={400}
              className="w-full rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;

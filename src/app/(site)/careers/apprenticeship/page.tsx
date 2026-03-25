"use client";

import HeroBanner from "@/components/layout/Banner";
import React from "react";

interface FeatureItem {
  title: string;
  description: string;
}

const page: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Real-world Projects",
      description: "Contribute to ongoing research and development projects.",
    },
    {
      title: "Mentorship",
      description: "Receive guidance from seasoned professionals.",
    },
    {
      title: "Skill Development",
      description:
        "Enhance your technical and soft skills through structured training.",
    },
    {
      title: "Networking",
      description: "Connect with peers and industry leaders.",
    },
  ];

  return (
    <div className="bg-black ">
      <HeroBanner
        title="About Us"
        backgroundImage="/img/about-hero-v2.webp"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/" },
          { label: "About", isActive: true },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-20 ">
        {/* Header Section */}
        <div className="text-center mx-auto mb-12 max-w-2xl">
          <p className="text-gray-400 text-lg mb-0">
            Join our apprenticeship program to gain practical skills in space
            technology, research, and engineering.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Image Column */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden h-full min-h-[400px]">
              <img
                className="absolute w-full h-full rounded-lg object-cover"
                src="https://bserc.org/assets/img/about-1.jpg"
                alt="Apprenticeship program participants working on space technology"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-1/2 py-5">
            <div className="h-full ">
              <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-7">
                Hands-on Learning Experience
              </h1>

              <p className="text-gray-400 mb-7">
                Work alongside experts and kickstart your career in the
                aerospace industry. Our program offers:
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="col-span-1">
                    <div className="flex items-center border-l-4 border-blue-500 pl-3">
                      <h5 className="mb-0 text-white font-semibold">
                        {feature.title}
                      </h5>
                    </div>
                    <p className="text-gray-400 mt-2 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                href="/contact"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

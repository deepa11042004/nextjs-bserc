"use client";

import { FC } from "react";
import { Plane } from "lucide-react";

type Workshop = {
  title: string;
  duration: string;
  description: string;
  image: string;
  id?: number;
  icon: React.ReactNode;
};

const workshops: Workshop[] = [
  {
    id: 1,
    title: "ADVANCED DRONE (AIR TAXI) WORKSHOP",
    duration: "1 Day - 3 Hrs",
    description:
      "Learn advanced drone systems and applications in defence operations.",
    image: "/img/advance_drone_flight.png",
    icon: <Plane size={24} />,
  },
  {
    id: 2,
    title: "Aircraft Design Technology",
    duration: "1 Day - 3 Hrs",
    description:
      "Explore principles of aerodynamics and aircraft design methodologies.",
    image: "/img/aircraft_design.png",
    icon: <Plane size={24} />,
  },
  {
    id: 3,
    title: "2-DAY ROCKETRY WORKSHOP",
    duration: "2 Days - 90-120 mins( Each Day)",
    description:
      "Master rocket science, propulsion systems, and space vehicle design.",
    image: "/img/twoday_rocketry.png",
    icon: <Plane size={24} />,
  },
  {
    id:4,
    title: "2-DAY DEFENCE DRONE TECHNOLOGY & INTEGRATION WORKSHOP",
    duration: "2 Days - 90-120 mins( Each Day)",
    description:
      "Next-gen autonomous aerial vehicles and urban air mobility solutions.",
    image: "/img/two_advance.png",
    icon: <Plane size={24} />,
  },
  {
    id:5,
    title: "3-DAY ADVANCED ROBOTICS WORKSHOP",
    duration: "3 Days - 90-120 mins( Each Day)",
    description:
      "Next-gen autonomous aerial vehicles and urban air mobility solutions.",
    image: "/img/three_day_advanced.png",
    icon: <Plane size={24} />,
  },

  {
    id:6,
    title: "3- DAY AIRCRAFT DESIGN TECHNOLOGY",
    duration: "3 Days - 180 min ( 3 Hrs )",
    description:
      "Next-gen autonomous aerial vehicles and urban air mobility solutions.",
    image: "/img/three_day_aircraft.png",
    icon: <Plane size={24} />,
  },
  {
    id:7,
    title: "3-Day Advanced Drone Technology ( Air Taxi )",
    duration: "3 Days - 150 min ( 2hrs: 30 Min)",
    description:
      "Next-gen autonomous aerial vehicles and urban air mobility solutions.",
    image: "/img/three_day_taxi.png",
    icon: <Plane size={24} />,
  },
];

const FeaturedWorkshops: FC = () => {
   

  return (
    <section className="w-full py-12 sm:py-16 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-center text-white pb-10  ">
          Featured Workshops
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop, index) => (
            <div
              key={index}
              className="
  rounded-xl p-4 flex flex-col space-y-5

  bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10
  border border-blue-500/20
  transition-all duration-300 ease-in-out
  hover:scale-[1.03]
  hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]  hover:border-sky-400/60"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
                  {workshop.icon}
                </div>
              </div>

              {/* Image */}
              <div className="h-[120px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                <img
                  src={workshop.image}
                  alt={workshop.title}
                  className="w-full h-full object-fill"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-1 text-white">
                {workshop.title}
              </h3>
              <p className="text-sm text-gray-400 font-bold mb-2">
                Duration : {workshop.duration}
              </p>
              <p className="text-sm text-gray-400 flex-grow">
                {workshop.description}
              </p>

              {/* Button */}
              <a
                href={`/all-programs/page-${workshop.id}`}
                className="mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition inline-block text-center"
              >
                Register Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorkshops;

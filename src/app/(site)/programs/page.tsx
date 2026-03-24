// components/WorkshopsSection.tsx
import Link from 'next/link';

export interface Workshop {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
  slug: string;
}

const workshops: Workshop[] = [
  {
    id: '1',
    title: 'Defence Drone Workshop',
    description: '2-DAY DEFENCE DRONE TECHNOLOGY & INTEGRATION WORKSHOP. This module has been carefully designed to...',
    imageUrl: 'https://bserc.org/uploads/programs/1773917555_Gemini_Generated_Image_pyrmbspyrmbspyrm%20(1).png',
    alt: 'Defence Drone Workshop',
    slug: 'Defence-Drone-Workshop',
  },
  {
    id: '2',
    title: 'ROBOTICS DESIGNING WORKSHOP',
    description: 'One-day Robotics designing workshop !',
    imageUrl: 'https://bserc.org/uploads/programs/1773922868_Robotics%20Design%20Workshop%20Website%20Image%20%20(1).png',
    alt: 'ROBOTICS DESIGNING WORKSHOP',
    slug: 'robotics-designing-workshop',
  },
  {
    id: '3',
    title: 'ADVANCED DRONE (AIR TAXI) WORKSHOP',
    description: 'One-day Advanced drone (Air Taxi) workshop !',
    imageUrl: 'https://bserc.org/uploads/programs/1773923654_Advanced%20aDrone%20Techonolgy%20Website%20image%20%20(1).png',
    alt: 'ADVANCED DRONE (AIR TAXI) WORKSHOP',
    slug: 'Advanced-Drone-Air-Taxi-Workshop',
  },
  {
    id: '4',
    title: 'ROCKETRY WORKSHOP',
    description: 'One-day Rocketry workshop !',
    imageUrl: 'https://bserc.org/uploads/programs/1773936016_Rocket%20Design%20Workshop%20Poster%20Wensite.jpg',
    alt: 'ROCKETRY WORKSHOP',
    slug: 'rocketry-workshop',
  },
  {
    id: '5',
    title: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    description: 'One-Day Aircraft Design Workshop !',
    imageUrl: 'https://bserc.org/uploads/programs/1773912663_Gemini_Generated_Image_j5ux1pj5ux1pj5ux%20(4)%20(1).png',
    alt: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    slug: 'Aircraft-Design-Technology-Workshop',
  },
  {
    id: '6',
    title: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    description: 'Collaboration with academic institutions for space research to foster the next generation of scienti...',
    imageUrl: 'https://bserc.org/uploads/programs/1768377784_acdmia.png',
    alt: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    slug: 'Aircraft-Design-Technology-Workshop',
  },
  {
    id: '7',
    title: 'Space Fest',
    description: 'Annual festival celebrating space science and technology with exhibitions and competitions.',
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    alt: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    slug: 'Aircraft-Design-Technology-Workshop',
  },
  {
    id: '8',
    title: 'Student Satellite',
    description: 'Hands-on program for building small satellites, covering design, testing, and launch.',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    alt: 'AIRCRAFT DESIGN TECHNOLOGY WORKSHOP',
    slug: 'Aircraft-Design-Technology-Workshop',
  },
   

];

export default function WorkshopsSection() {
  return (
    <section className="py-12 lg:py-16 bg-transparent">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            <strong>One Day Workshop</strong>
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our latest programs and workshops.
          </p>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <article
              key={workshop.id}
              className="bg-[#1a1a1a] text-white rounded-lg shadow-sm border-0 overflow-hidden flex flex-col h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Card Image */}
              <div className="relative overflow-hidden">
                <img
                  src={workshop.imageUrl.trim()}
                  alt={workshop.alt}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg lg:text-xl font-bold text-white mb-3 line-clamp-2">
                  {workshop.title}
                </h4>
                <p className="text-gray-300 text-sm opacity-80 flex-grow line-clamp-4">
                  {workshop.description}
                </p>
                <div className="mt-4 pt-4">
                  <Link
                    href={`/programs/${workshop.slug.trim()}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 border border-white/60 text-white text-sm font-medium rounded-md hover:bg-white hover:text-[#1a1a1a] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  >
                    Read More
                    <svg 
                      className="ml-2 w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Optional: Load More / Pagination Area */}
        <div className="flex justify-center mt-12">
          {/* Add pagination or "Load More" button here if needed */}
        </div>
      </div>
    </section>
  );
}
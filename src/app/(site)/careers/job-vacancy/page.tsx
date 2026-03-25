// NoOpeningsSection.tsx
import React from 'react';

import HeroBanner from '@/components/layout/Banner';
const NoOpeningsSection: React.FC = () => {
  return (
    <div className='bg-black'>

    <HeroBanner
      title="Job Vacancies"
      backgroundImage="/img/about-hero-v2.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
         { label: 'Careers', href: '/' },
        { label: 'Vacancies', isActive: true },
      ]}
    />

      <div className="max-w-7xl mx-auto px-4 py-20 ">
        
        {/* Header Section */}
        <div 
          className="text-center mx-auto mb-12 max-w-2xl animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          <p className="text-gray-400 text-lg mb-0">
            Explore exciting career opportunities at BSERC. We are always looking for
            passionate individuals to help us advance space education and research.
          </p>
        </div>

        {/* Content Card */}
        <div 
          className="flex justify-center animate-fade-in-up "
          style={{ animationDelay: '0.3s' }}
        >
          <div className="w-full lg:w-10/12 ">
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-700 text-center shadow-lg  ">
              
              {/* Info Icon - Inline SVG (no Font Awesome required) */}
              <div className="mb-6 flex justify-center">
                <svg 
                  className="w-12 h-12 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-semibold text-white mb-3">
                No Current Openings
              </h3>
              
              {/* Description */}
              <p className="text-gray-300 mb-6">
                We currently do not have any open positions. However, we are always
                interested in connecting with talented individuals.
              </p>

              {/* Divider */}
              <hr className="border-gray-700 mb-6 mx-auto w-1/2" />

              {/* Contact CTA */}
              <p className="text-gray-300 mb-0">
                Feel free to send your resume to{' '}
                <a 
                  href="mailto:careers@bserc.com" 
                  className="text-blue-500 hover:text-blue-400 font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                >
                  careers@bserc.com
                </a>{' '}
                for future consideration.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NoOpeningsSection;
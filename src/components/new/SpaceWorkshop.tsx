"use client";
import React from "react";
import { Video } from "lucide-react";

const SpaceWorkshop: React.FC = () => {
  return (
    <section className="w-full px-4 py-12 bg-black">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* SECTION 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1 bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 border-l-4 border-[#FF6B35] rounded-xl p-6 sm:p-8">
            <h2 className="font-serif text-xl sm:text-2xl font-base text-white mb-4">
              भारत अंतरिक्ष शिक्षा अनुसंधान केंद्र (Bharat Space Education
              Research Centre)
            </h2>

            <p className="text-[#FF6B35] font-semibold mb-4 text-sm sm:text-base">
              Advanced Drone Technology Workshop 2024-25
            </p>

            {/* Guest Box */}
            <div className="bg-[#FF6B35]/10 border border-[#FF6B35] rounded-lg p-5 mb-6">
              <p className="text-white text-sm leading-relaxed mb-4">
                <span className="text-[#FF6B35] font-semibold">
                  Hon'ble Shri Shekhar Dutt, SM, IAS
                </span>
                <br />
                Former Governor of Chhattisgarh & Former Defence Secretary,
                Govt. of India
              </p>

              <p className="text-gray-400 text-sm italic mb-4 leading-relaxed">
                कार्यशाला की शोभा बढ़ाने के लिए मुख्य विशिष्ट अतिथि के रूप में:
              </p>

              <p className="text-gray-400 text-sm italic mb-3 leading-relaxed">
                "यह अनूठी कार्यशाला युवाओं में उन्नत ड्रोन और अंतरिक्ष
                प्रौद्योगिकी के बारे में जानकारी देकर उनके बीच अंतरिक्ष अन्वेषण
                के जुनून को जगाने में मदद करेगी।"
              </p>

              <p className="text-gray-400 text-sm italic leading-relaxed">
                "हमारा मानना है कि आज इन युवा अन्वेषकों को सशक्त बनाने से
                वैश्विक अंतरिक्ष क्षेत्र में भारत की अग्रणी स्थिति की यात्रा में
                उनका योगदान बढ़ेगा।"
              </p>
            </div>

            {/* Learning */}
            <div>
              <h3 className="text-white font-base mb-3">
                मुख्य सीखें / Key Learning Areas:
              </h3>

              <ul className="text-gray-400  text-sm space-y-2 list-disc list-inside">
                <li>
                  <strong>मॉडल उन्नत ड्रोन डिजाइन</strong> - Advanced Drone
                  Design
                </li>
                <li>
                  <strong>प्रणोदन प्रणाली</strong> - Propulsion Systems
                </li>
                <li>
                  <strong>परिनियोजन और पृथक्करण तंत्र</strong> - Deployment &
                  Separation Techniques
                </li>
                <li>
                  <strong>मिशन डिजाइन सिद्धांत</strong> - Core Mission Design
                  Principles
                </li>
                <li>
                  <strong>उद्योग मार्गदर्शन</strong> - Expert Mentorship
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div
            className="order-1 lg:order-2 relative rounded-2xl overflow-hidden 
  min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
          >
            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/chief_1.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* SECTION 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/*   VIDEO */}
          <div
            className="relative rounded-2xl overflow-hidden 
min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]"
          >
            {/* Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/video/chief_2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* RIGHT CONTENT */}
          <div className="bg-gradient-to-br from-[#1E90FF]/10 to-[#FF6B35]/10 border-l-4 border-blue-500 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-serif font-base text-white mb-4">
              कार्यशाला का आयोजन
            </h2>

            <p className="text-[#FF6B35] font-semibold mb-4">
              भारत अंतरिक्ष प्रयोगशाला 2024-25
            </p>

            {/* Speaker Box */}
            <div className="bg-blue-500/10 border border-blue-500 rounded-lg p-5 mb-6">
              <p className="text-white text-sm mb-3">
                <span className="text-blue-400 font-semibold">
                  Prof. T. G. Sitharam
                </span>
                <br />
                <span className="text-xs text-white">
                  Chairman, All India Council for Technical Education (AICTE)
                </span>
              </p>

              <p className="text-gray-400 text-xs leading-relaxed ">
                कार्यशाला में मुख्य अतिथि के रूप में शामिल हुए और छात्रों को
                प्रेरित करते हुए अंतरिक्ष विज्ञान और प्रौद्योगिकी के महत्व पर
                गहन चर्चा की।
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">
                कार्यक्रम की विशेषताएं:
              </h3>

              <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                <li>
                  <strong>500+ छात्र</strong> देश भर से भागीदारी
                </li>
                <li>
                  <strong> तकनीकी प्रतिभा विकास</strong> - Innovation &
                  Technical Excellence
                </li>
                <li>
                  <strong>कक्षा 6 से अंतरिक्ष पाठ्यक्रम</strong> - Space Science
                  Curriculum
                </li>
                <li>
                  <strong>करियर संभावनाएं</strong> - Career Opportunities &
                  Guidance
                </li>
                <li>
                  <strong>समाज सेवा</strong> - Societal Advancement through
                  Innovation
                </li>
              </ul>
            </div>

            {/* Message */}
            <div className="bg-[#FF6B35]/10 border border-[#FF6B35] rounded-lg p-4">
              <p className="text-gray-400 text-base font-thin">
                <span className="text-[#FF6B35] font-semibold">
                  मुख्य संदेश:
                </span>{" "}
                कक्षा 6 से अंतरिक्ष विज्ञान पाठ्यक्रम शुरू करना आवश्यक है, जो
                भारत को वैश्विक स्तर पर एक प्रमुख शक्ति बनाने में सहायक होगा।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpaceWorkshop;

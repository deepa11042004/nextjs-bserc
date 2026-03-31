"use client";

import Link from "next/link";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-12 px-6 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/img/BSERC_new.png"
              alt="BSERC Logo"
              width={50}
              height={50}
              className="opacity-100"
            />

            <div>
              <h2 className="text-white font-bold text-lg tracking-wide">
                BSERC
              </h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Hub for Space Education
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">
            Empowering Future Innovators in Space Exploration. We are dedicated
            to advancing space science education and fostering innovation across
            India.
          </p>

          {/* Social Buttons */}
          <div className="flex gap-3">
            {["F", "I", "T", "L"].map((icon) => (
              <button
                key={icon}
                aria-label={`Social link ${icon}`}
                className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-sm font-semibold hover:bg-gray-700 transition"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-3 tracking-widest uppercase border-b-2 border-cyan-500 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about-us" className="hover:text-cyan-400 transition">
                About BSERC
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-cyan-400 transition">
                Team & Mentors
              </Link>
            </li>
            <li>
              <Link
                href="/workshops"
                className="hover:text-cyan-400 transition"
              >
                Workshops & Seminars
              </Link>
            </li>
            <li>
              <Link href="/skills" className="hover:text-cyan-400 transition">
                Skills & Education
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-cyan-400 transition font-semibold"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Head Office */}
        <div>
          <h3 className="text-white font-bold mb-3 tracking-widest uppercase border-b-2 border-cyan-500 inline-block pb-1">
            Head Office
          </h3>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2  ">
              <span role="img" aria-label="location pin">
                📍
              </span>
              New Delhi, India
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="phone">
                📞
              </span>
              +91 7042880241
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="email">
                ✉️
              </span>
              info@bserc.org
            </li>
            <li className="flex items-center gap-2">
              <span role="img" aria-label="email">
                ✉️
              </span>
              contact@bserc.org
            </li>
          </ul>
        </div>

         
        {/* Column 4: Stay Informed */}
        <div className="text-center sm:text-left ">
          <h3 className="text-white font-bold mb-3 tracking-widest uppercase border-b-2 border-cyan-500 inline-block pb-1">
            Stay Informed
          </h3>

          <div className="flex justify-center sm:justify-start mt-4">
            <div className="relative w-20 h-20 group">
              <Image
                src="/img/BSERC_new.png"
                alt="BSERC Logo Large"
                fill
                className="
                  object-contain
                  transition-transform duration-500 ease-in-out
                  group-hover:scale-110 
                  group-hover:rotate-90
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto mt-10 border-t border-gray-800 pt-6 text-xs text-gray-500 flex flex-col md:flex-row justify-between">
        <p>
          © 2026 <strong className="text-white">BSERC</strong>. All Rights
          Reserved.
        </p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:text-cyan-400 transition">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-cyan-400 transition">
            Terms & Conditions
          </Link>
          <span>|</span>
          <Link href="/refund" className="hover:text-cyan-400 transition">
            Refund Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

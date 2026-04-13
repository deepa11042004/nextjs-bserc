"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

// ─────────────────────────────────────────────────────────────
// Type definitions
// ─────────────────────────────────────────────────────────────

interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
}

interface ContactItem {
  icon: IconType;
  label: string;
  href?: string;
}

interface PartnerLogo {
  src: string | StaticImageData;
  alt: string;
  style?: React.CSSProperties;
}

interface CompanyLink {
  label: string;
  href: string;
  external?: boolean;
}

// ─────────────────────────────────────────────────────────────
// Typed data arrays
// ─────────────────────────────────────────────────────────────

const socialLinks: SocialLink[] = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const companyLinks: CompanyLink[] = [
  { label: "Def-Space Summer School", href: "/summer-school" ,external:true},
  { label: "Def-Space Summer Internship", href: "/bsercinternship" ,external:true},
  { label: "Def-Space Innovation Corridor", href: "/" ,external:false },
  { label: "Workshop", href: "/results/winter-internship-results" ,external:false},
  { label: "Contact Us", href: "/contact" ,external:false},
];

const contactItems: ContactItem[] = [
  { icon: FiMapPin, label: "New Delhi, India" },
  { icon: FiPhone, label: "+91 7042880241", href: "tel:+917042880241" },
  { icon: FiMail, label: "info@bserc.org", href: "mailto:info@bserc.org" },
  {
    icon: FiMail,
    label: "outreach@bserc.org",
    href: "mailto:outreach@bserc.org",
  },
];

const partnerLogos: PartnerLogo[] = [
  { src: "/img/isro.png", alt: "ISRO" },
  { src: "/img/DOS_light.png", alt: "DOAS" },
  { src: "/img/inspace.png", alt: "Ministry of Education" },
  { src: "/img/skill_india.jpg", alt: "skill india" },
  { src: "/img/viksit.png", alt: "vikisit india" },
];

// ─────────────────────────────────────────────────────────────
// Four-Column Footer Component
// ─────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Four Column Grid - Responsive */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand + Social */}
          <div className="space-y-4 text-center md:text-left">
            {/* Logo + Title */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="h-12 w-12 flex-shrink-0">
                <Image
                  src="/img/bserc_new_logo.png"
                  alt="BSERC logo"
                  width={500}
                  height={500}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold">BSERC</p>
                <p className="text-xs tracking-wide text-slate-400 leading-tight">
                  Space Tutor • ISRO
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto md:mx-0">
              Empowering Future Innovators in Space Exploration. We are
              dedicated to advancing space science education and fostering
              innovation across India.
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0b1224] text-slate-200 transition hover:text-white hover:bg-[#1a2340]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Partner Logos - Improved responsive grid */}
          <div>
             
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-4 items-center">
              {partnerLogos.map((item, idx) => (
                <div 
                  key={idx} 
                  className="h-12 sm:h-14 flex items-center justify-center md:justify-start"
                >
                  <Image
                  priority
                    src={item.src}
                    alt={item.alt}
                    width={76}
                    height={76}
                    className="max-h-full w-auto object-contain  "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                   {...(item.external && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    href={item.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-[#3B82F6] transition inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Head Office */}
          <div className="text-center md:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">
              Head Office
            </h4>
            <ul className="space-y-3">
              {contactItems.map(({ icon: Icon, label, href }, idx) => {
                const Wrapper = href ? "a" : "div";
                return (
                  <li key={idx}>
                    <Wrapper
                      href={href}
                      className="flex items-center justify-center md:justify-start gap-2 group"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0b1224] text-[#3B82F6] flex-shrink-0">
                        <Icon size={12} />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 leading-relaxed group-hover:text-[#3B82F6] transition">
                        {label}
                      </span>
                    </Wrapper>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
            <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left break-words">
              © 2026 BSERC. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2 text-[10px] sm:text-xs text-slate-400">
              <Link
                href="/help-desk"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Help Desk
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/faq"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                FAQ
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/bserc-policies/refund-policy"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Refund Policy
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/bserc-policies/privacy-policy"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-600">|</span>
              <Link
                href="/bserc-policies/terms-and-conditions"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
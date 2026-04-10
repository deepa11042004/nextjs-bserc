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
  { label: "Def-Space Summer School", href: "/summer-school" },
  { label: "Def-Space Summer Internship", href: "/bsercinternship" },
  { label: "Def-Space Innovation Corridor", href: "/" },
  { label: "Workshop", href: "/results/winter-internship-results" },
  { label: "Contact Us", href: "/" },
];

const contactItems: ContactItem[] = [
  { icon: FiMapPin, label: "New Delhi, India" },
  { icon: FiPhone, label: "+91 7042880241", href: "tel:+917042880241" },
  { icon: FiMail, label: "info@bserc.org", href: "mailto:info@bserc.org" },
  { icon: FiMail, label: "outreach@bserc.org", href: "mailto:outreach@bserc.org" },
];

const firstrowLog: PartnerLogo[] = [
  { src: "/img/isro.png", alt: "ISRO" },
  { src: "/img/DOS.svg", alt: "DOF" },
];

const secondrowLog: PartnerLogo[] = [
  { src: "/img/inspace.png", alt: "Ministry of Education" },
  { src: "/img/Skill_India.png", alt: "skill india" },
  { src: "/img/viksit.png", alt: "vikisit india" },
];

// ─────────────────────────────────────────────────────────────
// Responsive Footer Component - Def-Space Design System
// ─────────────────────────────────────────────────────────────

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        
        {/* Main Footer Grid - Responsive Layout */}
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* ───────── Brand Section ───────── */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Logo + Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center flex-shrink-0">
                <Image
                  width={500}
                  height={500}
                  src="/img/bserc_footer.png"
                  alt="BSERC logo"
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="text-lg sm:text-xl font-bold leading-tight">BSERC</p>
                <p className="text-[10px] sm:text-xs tracking-[0.2em] text-slate-400 break-words">
                  Space Tutor • Indian Space Research Organization (ISRO)
                </p>
              </div>
            </div>

            {/* Partner Logos - Responsive Grid */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {firstrowLog.map((item, idx) => (
                  <div
                    key={`first-${idx}`}
                    className="flex h-20 w-full sm:h-10 sm:w-20 items-center justify-center rounded-lg p-1.5"
                  >
                    <Image
                      width={700}
                      height={700}
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      style={item.style}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {secondrowLog.map((item, idx) => (
                  <div
                    key={`second-${idx}`}
                    className="flex h-8 w-16 sm:h-10 sm:w-20 items-center justify-center  rounded-lg p-1.5"
                  >
                    <Image
                      width={500}
                      height={500}
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-contain"
                      style={item.style}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Description - Responsive Text */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
              Empowering Future Innovators in Space Exploration. We are dedicated 
              to advancing space science education and fostering innovation across India.
            </p>

            {/* Social Links - Touch Optimized */}
            <div className="flex items-center gap-2 sm:gap-3 pt-1">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#0b1224] text-slate-200 transition-all duration-200 hover:text-white hover:scale-105 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)] hover:bg-[#1a2340] active:scale-95 touch-manipulation"
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ───────── Quick Links Section ───────── */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 transition-all duration-200 hover:text-[#3B82F6] hover:translate-x-0.5 sm:hover:translate-x-1 active:translate-x-0 touch-manipulation break-words"
                  >
                     {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ───────── Contact Section ───────── */}
          <div className="space-y-4 sm:space-y-5">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-slate-400">
              Head Office
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {contactItems.map(({ icon: Icon, label, href }, idx) => {
                const isClickable = href !== undefined;
                const Wrapper = isClickable ? "a" : "li";
                
                return (
                  <Wrapper
                    key={`${label}-${idx}`}
                    href={href}
                    className={`flex items-start gap-3 ${
                      isClickable 
                        ? "cursor-pointer transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation" 
                        : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-[#0b1224] text-[#3B82F6] flex-shrink-0">
                      <Icon size={14} className="sm:w-4 sm:h-4" />
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300 leading-relaxed break-words">
                      {label}
                    </span>
                  </Wrapper>
                );
              })}
            </ul>
          </div>
        </div>

        {/* ───────── Footer Bottom Bar ───────── */}
        <div className="mt-10 sm:mt-12 border-t border-white/5 pt-6">
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6">
            
            {/* Copyright */}
            <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left break-words">
              © 2026 BSERC. All rights reserved.
            </p>

            {/* Policy Links - Responsive Stack */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2 text-[10px] sm:text-xs text-slate-400">
              <a
                href="/bserc-policies/privacy-policy"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Privacy Policy
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-600 sm:hidden w-full h-px bg-white/5" />
              <a
                href="/bserc-policies/terms-and-conditions"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Terms & Conditions
              </a>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-600 sm:hidden w-full h-px bg-white/5" />
              <a
                href="/bserc-policies/refund-policy"
                className="transition hover:text-[#3B82F6] active:opacity-80 touch-manipulation whitespace-nowrap"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
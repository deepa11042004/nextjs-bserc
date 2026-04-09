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

// Type definitions
interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
}

interface ContactItem {
  icon: IconType;
  label: string;
}

interface PartnerLogo {
  src: string | StaticImageData;
  alt: string;
  style?: React.CSSProperties;
}

// Typed data arrays
const socialLinks: SocialLink[] = [
  { icon: FaFacebookF, label: "Facebook", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
];

const learningLinks: string[] = [
  "All Courses",
  "My Learning",
  "Categories",
  "Certifications",
  "Skill Tracks",
];

interface CompanyLink {
  label: string;
  href: string;
}

const companyLinks: CompanyLink[] = [
  { label: "Def-Space Summer School", href: "/summer-school" },
  { label: "Def-Space Summer Internship", href: "/bsercinternship" },
  { label: "Refund Policy", href: "/bserc-policies/refund-policy" },
  { label: "Privacy Policy", href: "/bserc-policies/privacy-policy" },
  { label: "Terms & Conditions", href: "/bserc-policies/terms-and-conditions" },
];

const contactItems: ContactItem[] = [
  { icon: FiMapPin, label: "New Delhi, India" },
  { icon: FiPhone, label: "+91 7042880241" },
  { icon: FiMail, label: "info@bserc.org" },
  { icon: FiMail, label: "outreach@bserc.org" },
];

const partnerLogos: PartnerLogo[] = [
  { src: "/img/isro.png", alt: "ISRO" },
  { src: "/img/DOS.svg", alt: "DOF" },
  {
    src: "/img/ministry.png",
    alt: "Ministry of Education",
    style: { filter: "brightness(0) invert(1)" },
  },

  { src: "/img/iit-delhi.png", alt: "IIT Delhi" },
];
// Component with TypeScript typing
const Footer: React.FC = () => {
  return (
    <footer className=" bg-black text-white border-t  border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  width={500}
                  height={500}
                  src="/img/bserc_footer.png"
                  alt="BSERC logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="text-xl font-bold">BSERC</p>
                <p className="text-xs tracking-[0.2em] text-slate-400">
                  Space Tutor Indian Space Research Organization (ISRO)
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              {partnerLogos.map((item, idx) => (
                <div
                  key={idx}
                  className="flex h-10 w-20 items-center justify-center"
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
            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering Future Innovators in Space Exploration. We are
              dedicated to advancing space science education and fostering
              innovation across India.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b1224] text-slate-200 transition hover:text-white hover:scale-105 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Learning */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Learning
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {learningLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 transition hover:text-[#3B82F6] hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    className="inline-flex items-center gap-2 transition hover:text-[#3B82F6] hover:translate-x-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Head Office
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              {contactItems.map(({ icon: Icon, label }, idx) => (
                <li key={`${label}-${idx}`} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0b1224] text-[#3B82F6]">
                    <Icon size={16} />
                  </span>
                  <span className="leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 BSERC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a target="_blank" href="/bserc-policies/privacy-policy" className="transition hover:text-[#3B82F6]">
              Privacy Policy
            </a>
            <span className="text-slate-600">|</span>
            <a target="_blank" href="/bserc-policies/terms-and-conditions" className="transition hover:text-[#3B82F6]">
              Terms & Conditions
            </a>
            <span className="text-slate-600">|</span>
            <a target="_blank" href="/bserc-policies/refund-policy" className="transition hover:text-[#3B82F6]">
             Refund Policy
            </a>

              
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

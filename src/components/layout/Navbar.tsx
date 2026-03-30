"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Profile01 from "@/components/layout/studentProfile";
import StudentLoginButton from "./StudentLoginButton";
import StudentProfile from "@/components/layout/studentProfile";

type DropdownItem =
  | { type: "link"; label: string; href: string }
  | {
      type: "nested";
      label: string;
      children: { label: string; href: string }[];
    }
  | { type: "divider" };

const NAV_ITEMS: { label: string; href?: string; dropdown?: DropdownItem[] }[] =
  [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    {
      label: "Institutions",
      dropdown: [
        { type: "link", label: "MoU", href: "/institutions/mou-form" },
        {
          type: "link",
          label: "Collaboration",
          href: "/institutions/collaboration",
        },
      ],
    },
    {
      label: "Programme",
      dropdown: [
        {
          type: "link",
          label: "One Day Workshop",
          href: "/programs/category/one-day-workshop",
        },
        { type: "link", label: "All Programs", href: "/programs" },
      ],
    },
    {
      label: "Administration",
      dropdown: [
        { type: "link", label: "Chairman", href: "/" },
        { type: "link", label: "Secretary", href: "/" },
        { type: "link", label: "Director General", href: "/" },
        { type: "link", label: "Director", href: "/" },
        { type: "link", label: "Staff", href: "/" },
        { type: "link", label: "Coordinator", href: "/" },
        { type: "link", label: "Committee", href: "/" },
      ],
    },
    {
      label: "Career",
      dropdown: [
        {
          type: "link",
          label: "Summer Internship",
          href: "/careers/summer-internship",
        },
        {
          type: "link",
          label: "Winter Internship",
          href: "/careers/winter-internship",
        },
        {
          type: "link",
          label: "Internship Results",
          href: "/careers/winter-internship-results",
        },
        {
          type: "link",
          label: "Apprenticeship",
          href: "/careers/apprenticeship",
        },
        { type: "link", label: "Job Vacancy", href: "/careers/job-vacancy" },
      ],
    },
    {
      label: "More",
      dropdown: [
        { type: "link", label: "Advisory Body", href: "/advisory-board" },
        {
          type: "nested",
          label: "People",
          children: [
            { label: "Faculty/Guest faculty", href: "/people/faculty" },
            { label: "Research Scholar", href: "/people/research-scholar" },
            { label: "Staff", href: "/people/staff" },
            { label: "Speaker", href: "/people/speaker" },
            { label: "FDP Members", href: "/people/fdp-members" },
          ],
        },
        {
          type: "nested",
          label: "Technology Partner",
          children: [
            { label: "ISRO", href: "/tech-partner#isro" },
            { label: "ESA", href: "/tech-partner#esa" },
            { label: "KAT", href: "/tech-partner#kat" },
            { label: "JAXA", href: "/tech-partner#jaxa" },
            { label: "NASA", href: "/tech-partner#nasa" },
            { label: "UN-GGIM", href: "/tech-partner#un-ggim" },
          ],
        },
        { type: "divider" },
        { type: "link", label: "Membership", href: "/membership" },
        {
          type: "link",
          label: "Knowledge Hub (Learn)",
          href: "/knowledge-hub",
        },
        { type: "link", label: "Missions", href: "/missions" },
        { type: "link", label: "Space Quiz", href: "/space-quiz" },
        { type: "link", label: "Glossary", href: "/glossary" },
        { type: "link", label: "FAQ", href: "/faq" },
      ],
    },
    { label: "Contact Us", href: "/contact" },
  ];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNested, setOpenNested] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeAll = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenNested(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown((p) => (p === label ? null : label));
    setOpenNested(null);
  };

  const { isLoggedIn, role } = useAuth();

  return (
    <>
      <header className="w-full bg-[#0a0c16] border-b border-white/5 sticky top-0 z-[60] backdrop-blur-md">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-[70px]">
          {/* Logo Left */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            onClick={closeAll}
          >
            <div className="relative w-9 h-9">
              <Image
                src="/img/logo.png"
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              BSERC
            </span>
          </Link>

          {/* Nav Center */}
          <ul className="hidden lg:flex items-center gap-4 text-[14px] font-medium text-gray-300 mx-auto">
            {NAV_ITEMS.map((item) =>
              item.href ? (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="px-3 py-2 hover:text-white transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                </li>
              ) : (
                <DesktopDropdown
                  key={item.label}
                  title={item.label}
                  items={item.dropdown!}
                />
              ),
            )}
          </ul>

          <div className="hidden lg:flex items-center">
            {!isLoggedIn ? (
              <StudentLoginButton />
            ) : role === "student" ? (
              <StudentProfile />
            ) : null}
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 -mr-1 text-gray-300 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-[58] bg-black/60"
            onClick={closeAll}
          />
          <div className="lg:hidden fixed top-[70px] left-0 right-0 bottom-0 z-[59] bg-[#0a0c16] overflow-y-auto">
            <ul className="flex flex-col text-[14px] font-medium text-gray-300 pb-10">
              {NAV_ITEMS.map((item) =>
                item.href ? (
                  <li key={item.label} className="border-b border-white/5">
                    <Link
                      href={item.href}
                      className="block px-5 py-4 hover:text-white hover:bg-white/5 transition-colors"
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <MobileDropdown
                    key={item.label}
                    title={item.label}
                    items={item.dropdown!}
                    isOpen={openDropdown === item.label}
                    onToggle={() => toggleDropdown(item.label)}
                    openNested={openNested}
                    onNestedToggle={(label) =>
                      setOpenNested((p) => (p === label ? null : label))
                    }
                    onClose={closeAll}
                  />
                ),
              )}

              <li className="border-t border-white/5 mt-4 mx-4">
                <Link
                  href="/auth/student/login"
                  className="block w-full text-center py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg"
                  onClick={closeAll}
                >
                  Log In
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
}

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function DesktopDropdown({
  title,
  items,
}: {
  title: string;
  items: DropdownItem[];
}) {
  return (
    <li className="relative group py-[22px]">
      <button className="flex items-center gap-1 px-2 hover:text-white transition-colors outline-none whitespace-nowrap">
        {title}
        <ChevronDown
          size={13}
          className="opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-200"
        />
      </button>

      <ul
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100
          absolute left-0 top-full z-50 mt-0 min-w-[210px]
          bg-[#0b1220] border border-white/10 rounded-xl py-2 shadow-2xl
          transition-all duration-200 translate-y-2 group-hover:translate-y-0"
      >
        {items.map((item, i) => {
          if (item.type === "divider")
            return <hr key={i} className="border-white/5 my-1" />;

          if (item.type === "link")
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </li>
            );

          // nested fly-out
          return (
            <li key={item.label} className="relative group/nested">
              <div className="flex items-center justify-between px-4 py-2 hover:bg-white/5 hover:text-white cursor-pointer transition-colors">
                <span className="whitespace-nowrap">{item.label}</span>
                <ChevronRight
                  size={13}
                  className="ml-2 opacity-60 rotate-180"
                />
              </div>
              <ul
                className="invisible opacity-0 group-hover/nested:visible group-hover/nested:opacity-100
                  absolute right-full top-0 mr-[1px] min-w-[200px]
                  bg-[#0b1220] border border-white/10 rounded-xl py-2 shadow-2xl
                  transition-all duration-200"
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      className="block px-4 py-2 hover:bg-white/5 hover:text-white transition-colors whitespace-nowrap"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

// ─── Mobile Dropdown ─────────────────────────────────────────────────────────

function MobileDropdown({
  title,
  items,
  isOpen,
  onToggle,
  openNested,
  onNestedToggle,
  onClose,
}: {
  title: string;
  items: DropdownItem[];
  isOpen: boolean;
  onToggle: () => void;
  openNested: string | null;
  onNestedToggle: (label: string) => void;
  onClose: () => void;
}) {
  return (
    <li className="border-b border-white/5">
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:text-white transition-colors"
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          size={15}
          className={`opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180 opacity-100" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="bg-[#080a14] py-1">
          {items.map((item, i) => {
            if (item.type === "divider")
              return <hr key={i} className="border-white/5 my-1 mx-4" />;

            if (item.type === "link")
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block px-8 py-3 text-[13px] hover:text-white hover:bg-white/5 transition-colors"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                </li>
              );

            // nested accordion
            return (
              <li key={item.label}>
                <button
                  className="w-full flex items-center justify-between px-8 py-3 text-[13px] hover:text-white transition-colors"
                  onClick={() => onNestedToggle(item.label)}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={13}
                    className={`opacity-50 transition-transform duration-200 ${openNested === item.label ? "rotate-180 opacity-100" : ""}`}
                  />
                </button>

                {openNested === item.label && (
                  <ul className="bg-[#060810]">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-12 py-2.5 text-[12.5px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                          onClick={onClose}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

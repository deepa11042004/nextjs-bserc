"use client";

import {
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  Tags,
  LayoutPanelLeft,
  Contact,
  UserRoundSearch,
  Images,
  Home,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type NavItemProps = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
};

function NavItem({
  href,
  icon: Icon,
  children,
  onClick,
  isActive = false,
}: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center px-3 py-2 text-sm rounded-md transition-colors
        ${
          isActive
            ? "bg-[#1F1F23] text-white font-medium"
            : "text-gray-300 hover:text-white hover:bg-[#1F1F23]"
        }
      `}
    >
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#");

  function handleNavigation(href: string) {
    setActiveHref(href);
    setIsMobileMenuOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-300" />
      </button>

      <nav
        className={`
          fixed inset-y-0 left-0 z-[70] w-64 bg-[#0F0F12] transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:w-64 border-r border-[#1F1F23]
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="h-16 px-6 flex items-center border-b border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="flex-shrink-0"
              />
              <span className="text-lg font-semibold hover:cursor-pointer text-white">
                BSERC Admin
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Overview
                </div>
                <NavItem
                  href="#dashboard"
                  icon={Home}
                  onClick={() => handleNavigation("#dashboard")}
                  isActive={activeHref === "#dashboard"}
                >
                  Dashboard
                </NavItem>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Management
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="#program-categories"
                    icon={Tags}
                    onClick={() => handleNavigation("#program-categories")}
                    isActive={activeHref === "#program-categories"}
                  >
                    Program Categories
                  </NavItem>
                  <NavItem
                    href="#programs"
                    icon={LayoutPanelLeft}
                    onClick={() => handleNavigation("#programs")}
                    isActive={activeHref === "#programs"}
                  >
                    Programs
                  </NavItem>
                  <NavItem
                    href="#advisory-board"
                    icon={Contact}
                    onClick={() => handleNavigation("#advisory-board")}
                    isActive={activeHref === "#advisory-board"}
                  >
                    Advisory Board
                  </NavItem>
                  <NavItem
                    href="#advisory-board-request"
                    icon={UserRoundSearch}
                    onClick={() => handleNavigation("#advisory-board-request")}
                    isActive={activeHref === "#advisory-board-request"}
                  >
                    Advisory Board Request
                  </NavItem>
                  <NavItem
                    href="#hero-sliders"
                    icon={Images}
                    onClick={() => handleNavigation("#hero-sliders")}
                    isActive={activeHref === "#hero-sliders"}
                  >
                    Hero Sliders
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Team Management
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="#faculty-requests"
                    icon={Users2}
                    onClick={() => handleNavigation("#faculty-requests")}
                    isActive={activeHref === "#faculty-requests"}
                  >
                    Faculty Requests
                  </NavItem>
                  <NavItem
                    href="#faculty-list"
                    icon={Shield}
                    onClick={() => handleNavigation("#faculty-list")}
                    isActive={activeHref === "#faculty-list"}
                  >
                    Faculty List
                  </NavItem>
                  <NavItem
                    href="#staff-requests"
                    icon={MessagesSquare}
                    onClick={() => handleNavigation("#staff-requests")}
                    isActive={activeHref === "#staff-requests"}
                  >
                    Staff Requests
                  </NavItem>
                  <NavItem
                    href="#speaker-requests"
                    icon={MessagesSquare}
                    onClick={() => handleNavigation("#speaker-requests")}
                    isActive={activeHref === "#speaker-requests"}
                  >
                    Speaker Requests
                  </NavItem>
                  <NavItem
                    href="#fdp-requests"
                    icon={Video}
                    onClick={() => handleNavigation("#fdp-requests")}
                    isActive={activeHref === "#fdp-requests"}
                  >
                    FDP Requests
                  </NavItem>
                  <NavItem
                    href="#internship-applications"
                    icon={Video}
                    onClick={() => handleNavigation("#internship-applications")}
                    isActive={activeHref === "#internship-applications"}
                  >
                    Internship Applications
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Users & Queries
                </div>
                <div className="space-y-1">
                  <NavItem
                    href="#admin-users"
                    icon={Users2}
                    onClick={() => handleNavigation("#admin-users")}
                    isActive={activeHref === "#admin-users"}
                  >
                    Admin Users
                  </NavItem>
                  <NavItem
                    href="#website-users"
                    icon={Shield}
                    onClick={() => handleNavigation("#website-users")}
                    isActive={activeHref === "#website-users"}
                  >
                    Website Users
                  </NavItem>
                  <NavItem
                    href="#contact-queries"
                    icon={MessagesSquare}
                    onClick={() => handleNavigation("#contact-queries")}
                    isActive={activeHref === "#contact-queries"}
                  >
                    Contact Queries
                  </NavItem>
                  <NavItem
                    href="#mou-requests"
                    icon={MessagesSquare}
                    onClick={() => handleNavigation("#mou-requests")}
                    isActive={activeHref === "#mou-requests"}
                  >
                    MoU Requests
                  </NavItem>
                  <NavItem
                    href="#collaboration-requests"
                    icon={Video}
                    onClick={() => handleNavigation("#collaboration-requests")}
                    isActive={activeHref === "#collaboration-requests"}
                  >
                    Collaboration Requests
                  </NavItem>
                  <NavItem
                    href="#faqs"
                    icon={Video}
                    onClick={() => handleNavigation("#faqs")}
                    isActive={activeHref === "#faqs"}
                  >
                    FAQs
                  </NavItem>
                  <NavItem
                    href="#quiz-question"
                    icon={Video}
                    onClick={() => handleNavigation("#quiz-question")}
                    isActive={activeHref === "#quiz-question"}
                  >
                    Quiz Question
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem
                href="#settings"
                icon={Settings}
                onClick={() => handleNavigation("#settings")}
                isActive={activeHref === "#settings"}
              >
                Settings
              </NavItem>
              <NavItem
                href="#help"
                icon={HelpCircle}
                onClick={() => handleNavigation("#help")}
                isActive={activeHref === "#help"}
              >
                Help
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

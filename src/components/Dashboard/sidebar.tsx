"use client"

import {
  Users2,
  Shield,
  MessagesSquare,
  Video,
  ExternalLink,
  HelpCircle,
  Menu,
  Tags,
  LayoutPanelLeft,
  Contact,
  UserRoundSearch,
  Images,
  Home,
} from "lucide-react"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

type NavItemProps = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
  isExternal?: boolean
}

function NavItem({
  href,
  icon: Icon,
  children,
  onClick,
  isActive = false,
  isExternal = false,
}: NavItemProps) {
  const baseClasses = `
    flex items-center px-3 py-2 text-sm rounded-md transition-colors
    ${
      isActive
        ? "bg-[#1F1F23] text-white font-medium"
        : "text-gray-300 hover:text-white hover:bg-[#1F1F23]"
    }
  `

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={baseClasses}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClick} className={baseClasses}>
      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
      {children}
    </Link>
  )
}

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Normalize pathname for comparison (remove trailing slashes, handle root)
  const normalizedPath = pathname === "/" ? "/admin" : pathname

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
            href="/admin"
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
                  href="/admin"
                  icon={Home}
                  onClick={() => setIsMobileMenuOpen(false)}
                  isActive={normalizedPath === "/admin"}
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
                    href="/admin/program-categories"
                    icon={Tags}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/program-categories"}
                  >
                    Program Categories
                  </NavItem>
                  <NavItem
                    href="/admin/programs"
                    icon={LayoutPanelLeft}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/programs"}
                  >
                    Programs
                  </NavItem>
                  <NavItem
                    href="/admin/advisory-board"
                    icon={Contact}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/advisory-board"}
                  >
                    Advisory Board
                  </NavItem>
                  <NavItem
                    href="/admin/advisory-board/request"
                    icon={UserRoundSearch}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/advisory-board/request"}
                  >
                    Advisory Board Request
                  </NavItem>
                  <NavItem
                    href="/admin/sliders"
                    icon={Images}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/sliders"}
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
                    href="/admin/faculty"
                    icon={Shield}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty"}
                  >
                    Faculty List
                  </NavItem>
                  <NavItem
                    href="/admin/faculty/faculty-requests"
                    icon={Users2}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty/faculty-requests"}
                  >
                    Faculty Requests
                  </NavItem>
                  <NavItem
                    href="/admin/faculty/staff-requests"
                    icon={MessagesSquare}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty/staff-requests"}
                  >
                    Staff Requests
                  </NavItem>
                  <NavItem
                    href="/admin/faculty/speaker-requests"
                    icon={MessagesSquare}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty/speaker-requests"}
                  >
                    Speaker Requests
                  </NavItem>
                  <NavItem
                    href="/admin/faculty/fdp-requests"
                    icon={Video}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty/fdp-requests"}
                  >
                    FDP Requests
                  </NavItem>
                  <NavItem
                    href="/admin/faculty/internship-applications"
                    icon={Video}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faculty/internship-applications"}
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
                    href="/admin/all-admins"
                    icon={Users2}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/all-admins"}
                  >
                    Admin Users
                  </NavItem>
                  <NavItem
                    href="/admin/website-users"
                    icon={Shield}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/website-users"}
                  >
                    Website Users
                  </NavItem>
                  <NavItem
                    href="/admin/contact-queries"
                    icon={MessagesSquare}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/contact-queries"}
                  >
                    Contact Queries
                  </NavItem>
                  <NavItem
                    href="/admin/mou-requests"
                    icon={MessagesSquare}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/mou-requests"}
                  >
                    MoU Requests
                  </NavItem>
                  <NavItem
                    href="/admin/collaboration-requests"
                    icon={Video}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/collaboration-requests"}
                  >
                    Collaboration Requests
                  </NavItem>
                  <NavItem
                    href="/admin/faqs"
                    icon={Video}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/faqs"}
                  >
                    FAQs
                  </NavItem>
                  <NavItem
                    href="/admin/quiz-questions"
                    icon={Video}
                    onClick={() => setIsMobileMenuOpen(false)}
                    isActive={normalizedPath === "/admin/quiz-questions"}
                  >
                    Quiz Questions
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem
                //LMS Dashboard link (replace with actual URL if different) 
                href="https://bserc-frontend.vercel.app/"
                icon={ExternalLink}
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={false}
                isExternal={true}
              >
                LMS Dashboard
              </NavItem>
              <NavItem
                href="/help"
                icon={HelpCircle}
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={normalizedPath === "/help"}
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
  )
}
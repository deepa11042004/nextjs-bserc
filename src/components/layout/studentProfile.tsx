"use client";

import {
  CircleUserRound,
  LifeBuoy,
  LogOut,
  MoveUpRight,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function StudentProfile() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  const displayName = user?.full_name || user?.name || "Guest";
  const displayEmail = user?.email || "guest@example.com";
  const avatarSeed = displayName || displayEmail;

  const handleLogout = () => {
    logout("/login", { scope: "user" });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <button onClick={() => setOpen(!open)}>
        <div
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#10a5c4] text-white font-semibold text-sm uppercase 
           border border-white/10 hover:scale-105 transition"  >
          {avatarSeed.charAt(0) || "G"}
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-60 rounded-xl shadow-xl 
          bg-[#0a0c16] border border-white/10 backdrop-blur-xl
          overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
        >
          {/* User Info */}
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-sm font-semibold text-white truncate pb-2">
              {displayName}
            </p>
            <p className="text-xs text-zinc-400 truncate">
              {displayEmail}
            </p>
          </div>

          {/* Menu */}
          <div className="p-2 space-y-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
              text-zinc-300 hover:text-white hover:bg-white/5 transition"
            >
              <CircleUserRound className="w-4 h-4" />
              <span className="text-sm">My Profile</span>
            </Link>

            <Link
              href="/help-desk"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg 
              text-zinc-300 hover:text-white hover:bg-white/5 transition"
            >
              <LifeBuoy className="w-4 h-4" />
              <span className="text-sm">Help Desk</span>
            </Link>

            <Link
              href="/bserc-policies/terms-and-conditions"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg 
              text-zinc-300 hover:text-white hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-sm">Terms</span>
              </div>
              <MoveUpRight className="w-4 h-4 opacity-70" />
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg 
              text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

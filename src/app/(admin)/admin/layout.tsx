// app/admin/layout.tsx
"use client"
 
import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/Dashboard/sidebar"
import TopNav from "@/components/Dashboard/top-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }
  return (
    <div className="flex h-screen dark">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-[#0F0F12]">
        
          {children}
          
        </main>
      </div>
    </div>
  )
}
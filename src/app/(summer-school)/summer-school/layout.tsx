"use client";
import React from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "./Navbar";
import NavBanner from "@/components/layout/NavBanner";
export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBanner />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

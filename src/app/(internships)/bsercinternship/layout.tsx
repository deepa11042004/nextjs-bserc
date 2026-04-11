"use client";
import React from "react";

import Navbar from "./Navbar";
import NavBanner from "@/components/layout/NabBanner";
import Footer from "@/components/layout/Footer";
export default function IntershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBanner/>
      <Navbar />
     {children}
      <Footer/>    </>
  );
}

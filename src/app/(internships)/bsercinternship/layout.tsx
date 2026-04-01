"use client";
import React from "react";

import Navbar from "./Navbar";
import Footer from "@/components/InternshipSection/Footer";
export default function IntershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
     {children}
      <Footer/>    </>
  );
}

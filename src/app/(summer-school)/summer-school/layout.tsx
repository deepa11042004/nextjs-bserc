"use client";
import React from "react";

import Navbar from "./Navbar";

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

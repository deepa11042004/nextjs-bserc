"use client";
import React from "react";

import Navbar from "./Navbar"
export default function IntershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body >
      <Navbar />
      <main>{children}</main>
    </body>
  );
}

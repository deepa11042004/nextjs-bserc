import type { Metadata } from "next";
import "@/app/globals.css";

import { Poppins, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/AuthContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BSERC  ",
  description:
    "Empowering the next generation of scientists, engineers, and innovators through cutting-edge space education programs.",
  keywords: [
    "BSERC",
    "space education",
    "drone technology",
    "rocketry",
    "robotics",
    "India",
  ],
  openGraph: {
    title: "BSERC — Bharat Space Education Research Centre",
    description:
      "Hands-on space, drone & robotics education for the next generation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

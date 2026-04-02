import type { Metadata } from "next";
import "@/app/globals.css";
 
import { AuthProvider } from "@/context/AuthContext";

// Import local fonts
 

 
export const metadata: Metadata = {
  title: "BSERC",
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
    <html lang="en" data-scroll-behavior="smooth"  >
      <body  >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
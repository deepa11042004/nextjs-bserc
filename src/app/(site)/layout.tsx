import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NavBanner from "@/components/layout/NabBanner";
export const dynamic = "force-static";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <NavBanner/>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

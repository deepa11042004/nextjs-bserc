import NavBanner from "@/components/layout/NavBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DefSpaceSection from "@/components/new/DefSpaceSection";
import BDSICFeatures from "@/components/new/BDSICFeatures";

const page = () => {
  return (
    <>
      <NavBanner />
      <Navbar />
      <div className="bg-black">
        <DefSpaceSection />
        <BDSICFeatures />
      </div>
      <Footer />
    </>
  );
};

export default page;

import Home from "@/components/new/Home";
import PMVision from "@/components/new/Pmvision";
import SpaceSectorIndia from "@/components/new/SpaceSectorIndia";
import SpaceTimeline from "@/components/new/SpaceTimeline";
import DefSpaceSection from "@/components/new/DefSpaceSection";
import BDSICFeatures from "@/components/new/BDSICFeatures";
import SpaceWorkshop from "@/components/new/SpaceWorkshop";
import BsercInitiative from "@/components/new/BsercInitiative";
import OurFeatures from "@/components/new/OurFeatures";
import SpaceTravellers from "@/components/new/SpaceTravellers";
import SpaceEvents from "@/components/new/SpaceEvents";
import WhyEventsMatter from "@/components/new/WhyEventsMatte";
import DefenceEvents from "@/components/new/DefenceEvents";
import KeyDefence from "@/components/new/KeyProgram";
import KeyFigures from "@/components/new/KeyFigures";
import LatestNews from "@/components/new/LatestNews";
import ISROMissionsSection from "@/components/new/ISROMissionsSection";
import StatePartnership from "@/components/new/StatePartnership";
import FeaturedWorkshops from "@/components/new/FeaturedWorkshops";

export default function HomePage() {
  return (
    <>
      <Home />
      <PMVision />
      <SpaceSectorIndia />
      <SpaceTimeline />
      <DefSpaceSection />
      <BDSICFeatures />
      <SpaceWorkshop />
      <BsercInitiative />
      <FeaturedWorkshops />
      <OurFeatures />
      <SpaceTravellers />
      <SpaceEvents />
      <WhyEventsMatter />
      <DefenceEvents />
      <KeyDefence />
      <KeyFigures />
      <LatestNews />
      <ISROMissionsSection />
      <StatePartnership />
    </>
  );
}

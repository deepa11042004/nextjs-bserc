import PMVision from "@/components/new/Pmvision";
import SpaceSectorIndia from "@/components/new/SpaceSectorIndia";
import SpaceWorkshop from "@/components/new/SpaceWorkshop";
import BsercInitiative from "@/components/new/BsercInitiative";
import HomePageClientEffects from "@/components/new/HomePageClientEffects";
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
import HeroSlider from "@/components/new/HeroSlider";
import Stats from "@/components/new/Stats";

export default function HomePage() {
  return (
    <>
      <HomePageClientEffects />
      <HeroSlider />
      <div className="flex justify-center my-6 bg-blue-700 py-4">
        <a href="https://forms.gle/NNBBxDkwzb84efgD6" className="inline-block">
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-[0_0_12px_rgba(249,115,22,0.6)] hover:shadow-[0_0_22px_rgba(249,115,22,1)] hover:bg-orange-600 transition-colors font-semibold text-lg"
          >
            National Technology Day
          </button>
        </a>
      </div>
      <Stats />
      <PMVision />
      <SpaceSectorIndia />
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

import HeroSection from "@/components/Home/Hero";
import SpaceSector from "@/components/Home/SpaceSector";
import Scrolldown from "@/components/ui/Scrolldown";
import ResearchSection from "@/components/Home/ResearchSection";
import VisionMissionGoal from "@/components/Home/VisionMissionGoal";
import Support from "@/components/Home/Support";
import DroneSection from "@/components/Home/DroneSection";
import AeroModellingSection from "@/components/Home/AeroModellingSection";
import RocketSection from "@/components/Home/RocketSection";
import RoboticsSection from "@/components/Home/RoboticsSection";
import GisSection from "@/components/Home/GisSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Scrolldown />
      <SpaceSector />
      <ResearchSection />
      <VisionMissionGoal />
      <Support />
      <DroneSection />
      <AeroModellingSection />
      <RocketSection />
      <RoboticsSection />
      <GisSection />
    </>
  );
}

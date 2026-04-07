// import { TimelineSection } from "@/components/InternshipSection/KeyDate";
 

// import Paragraphs from "@/components/InternshipSection/Paragraphs";
// import { Services } from "@/components/InternshipSection/Services";
 import StatsCard from "@/components/InternshipSection/StatsCard";
// import ProgramBenefits from "@/components/InternshipSection/ProgramBenefits";
// import ProgramOverview from "@/components/InternshipSection/ProgramOverview";
// import ResultsAnnouncements from "@/components/InternshipSection/ResultsAnnouncements";
// import { CompleteTimeline } from "@/components/InternshipSection/CompletionTimeline";
// import Hero from "@/components/InternshipSection/Hero";
import HeroSlider from "@/components/InternshipSection/HeroSlider";
import Overview from "@/components/InternshipSection/Overview";
 
import BharatInternship from "@/components/InternshipSection/BharatInternship";
import ProgramDetails from "@/components/InternshipSection/ProgramDetails";
import Meritorious from "@/components/InternshipSection/Meritorious";
import ProgrammeTimeline from "@/components/InternshipSection/ProgrammeTimeline";
import PricingFees from "@/components/InternshipSection/PricingFees";
import CoreTechnologyDomains from "@/components/InternshipSection/CoreTechnologyDomains";

const page = () => {
  return (
    <div className="bg-black">
     <HeroSlider />
     <StatsCard />
     <BharatInternship />
     <Overview/>
     <ProgramDetails />
     <Meritorious />
     <ProgrammeTimeline />
     <PricingFees/>
     <CoreTechnologyDomains/>
      {/* <Hero/>
      <Paragraphs />
      <StatsCard />
      <Services />
      <TimelineSection />
      <CompleteTimeline />
      <ProgramOverview />
      <ResultsAnnouncements />
      <ProgramBenefits /> */}
    </div>
  );
};

export default page;

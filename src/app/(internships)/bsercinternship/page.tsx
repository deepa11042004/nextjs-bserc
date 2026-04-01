import { TimelineSection } from "@/components/InternshipSection/KeyDate";
import Home from "../../../components/InternshipSection/Hero";
import { Marquee } from "../../../components/InternshipSection/Marquee";
import Paragraphs from "../../../components/InternshipSection/Paragraphs";
import { Services } from "../../../components/InternshipSection/Services";
import StatsCard from "../../../components/InternshipSection/StatsCard";
import ProgramBenefits from "@/components/InternshipSection/ProgramBenefits";
import ProgramOverview from "@/components/InternshipSection/ProgramOverview";
import ResultsAnnouncements from "@/components/InternshipSection/ResultsAnnouncements";
import { CompleteTimeline } from "@/components/InternshipSection/CompletionTimeline";
import PostIntership from "@/components/InternshipSection/PostInternship";
const page = () => {
  return (
    <div className="bg-black">
      <Home />
      <Paragraphs />
      <StatsCard />
      <Marquee />
      <Services />
      <TimelineSection />
      <PostIntership/>
      <CompleteTimeline/>
      <ProgramOverview />
      <ResultsAnnouncements />
      <ProgramBenefits />
    </div>
  );
};

export default page;

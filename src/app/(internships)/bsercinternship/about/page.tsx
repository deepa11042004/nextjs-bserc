import AboutProgramme from "@/components/InternshipSection/AboutProgramme";
import { CoreTech } from "@/components/global/CoreTech";
import ProgrammeHighlights from "@/components/InternshipSection/ProgrammeHighlights";
import CareerPathways from "@/components/InternshipSection/CareerPathways";
const page = () => {
  return (
    <>
      <AboutProgramme />
      <CoreTech />
      <ProgrammeHighlights />
      <CareerPathways />
    </>
  );
};

export default page;

import Hero from "@/components/SummerSchool/Hero";
import Stats from "@/components/SummerSchool/Stats";
import Bharat from "@/components/SummerSchool/Bharat";
import ProgramOverview from "@/components/SummerSchool/ProgramOverView";
import EligibilityCriteria from "@/components/SummerSchool/EligibilityCriteria";
import ProgrammeTimeline from "@/components/SummerSchool/ProgrammeTimeline";
import { CoreTech } from "@/components/SummerSchool/CoreTech";
import SchoolHighlights from "@/components/SummerSchool/SchoolHighlights";
import CertificationFee from "@/components/SummerSchool/CertificationFee";
import MeritScholarships from "@/components/SummerSchool/MeritScholarships";
import RegisterCTA from "@/components/SummerSchool/RegisterCTA";

 

const page = () => {
  return (
    <>
      <Hero/>      
      <Stats/>   
      <Bharat/>
      <ProgramOverview/>
      <EligibilityCriteria/>
      <ProgrammeTimeline/>
      <CoreTech/>
      <SchoolHighlights/>
      <CertificationFee/>
      <MeritScholarships/>
      <RegisterCTA/>       
    </>
  );
};

export default page;

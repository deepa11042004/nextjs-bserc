 
import Home from "./Hero";
import Paragraphs from "./Paragraphs";
import StatsCard from "./StatsCard";
const page = () => {
  return (
    <div className="bg-black">
      <Home />
      <Paragraphs/>
      <StatsCard/>
    </div>
  );
};

export default page;

import SelectionPlan from "../../components/PlanSection";
import SubscribeHero from "../../Components/SubscribeHero";
import WhyChooseUs from "../../Components/WhyChoose";
import { subscribeData } from "../../data/subscribePageData";

const Subscribe = () => {
  return (
    <div>
      <SubscribeHero />
      <WhyChooseUs textArray={subscribeData} />
      <SelectionPlan />
    </div>
  );
};

export default Subscribe;

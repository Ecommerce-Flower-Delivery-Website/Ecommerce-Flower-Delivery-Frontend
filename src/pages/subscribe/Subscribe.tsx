import SelectionPlan from "../../components/PlanSection";
import SubscribeHero from "../../components/SubscribeHero";
import SubscriptionFAQ from "../../components/SubscriptionFAQ/SubscriptionFAQ";
import { subscribeData } from "../../data/subscribePageData";
import StepsExplanation from "../components/StepsExplanation/StepsExplanation";

const Subscribe = () => {
  return (
    <div>
      <SubscribeHero />
      <StepsExplanation textArray={subscribeData} />
      <SelectionPlan />
      <SubscriptionFAQ />
    </div>
  );
};

export default Subscribe;

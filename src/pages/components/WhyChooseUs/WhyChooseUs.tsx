import SectionTitle from "../SectionTitle/SectionTitle";
import TextDetail from "../textDetail";

const WhyChooseUs = () => {
  return (
    <div className="aj-story">
      <div className="flex flex-col md:flex-row">
        {/* Left Column */}
        <div className="w-full md:w-1/2 border md:border-b-0 border-t-0 md:border-t border-[#121212] px-4 py-10 md:p-[80px]">
          <SectionTitle title="Why choose us ?" />
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex flex-col">
          <TextDetail
            title="Stylish bouquets by florists"
            text="At our floral studio, our professional florists craft the most elegant and stylish bouquets using only the freshest and highest quality materials available. We stay up-to-date with the latest floral design trends and offer unique arrangements that are sure to impress. Let us brighten up your day with our stunning bouquets and same-day delivery service."
          />
          <TextDetail
            title="On-time delivery"
            text="Never miss a moment with our on-time flower delivery service. Our couriers will deliver your bouquet personally, without boxes, to ensure it arrives in perfect condition. Trust us to deliver your thoughtful gift reliably."
          />
          <TextDetail
            title="Safe payment"
            text="You can feel secure when placing an order with us, as we use industry-standard security measures to protect your payment information. Your transaction will be safe and hassle-free, so you can shop with confidence."
          />
          <TextDetail
            title="Subscription by your needs"
            text="With our subscription service tailored to your specific needs, you can enjoy the convenience of having beautiful bouquets delivered straight to your door at regular intervals. Our flexible service is perfect for busy individuals or those who want to ensure they always have fresh flowers on hand. You'll save time and money with this hassle-free solution to your floral needs."
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

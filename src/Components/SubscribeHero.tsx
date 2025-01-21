import SectionTitle from "./SectionTitle/SectionTitle";

const subscribeFeatures = [
  {
    title: "For Yourself",
    pargraph:
      "The perfect way to keep your home fresh and beautiful. Get a regular delivery of stunning bouquets straight to your doorstep without lifting a finger. Enjoy the beauty and fragrance of fresh flowers hassle-free!",
  },
  {
    title: "As a Gift",
    pargraph:
      "Simply provide us with their address and let us take care of the rest, delivering beautiful blooms straight to their doorstep at the frequency and duration of your choosing.",
  },
  {
    title: "For Business",
    pargraph:
      "Is a great way to create a pleasant atmosphere and leave a good impression on your guests and customers. Fresh floral arrangements will improve the aesthetic image of your business, and our service guarantees timely replacement without extra care or effort on your part.",
  },
];

const SubscribeHero = () => {
  return (
    <>
      <header className="md:flex ">
        <div className="md:w-1/2">
          <img
            src="../../public/assets/images/image (2).jpg"
            className="h-[500px] md:h-full w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 px-4 py-10 md:p-20">
          <div className="pb-4">
            <SectionTitle title="Flower Subscription" />
          </div>
          <div className="flex flex-col	gap-6 pb-12 md:pb-[79px] lg:pb-[71px]">
            {subscribeFeatures.map((el, index) => {
              return (
                <div key={index}>
                  <h3 className="font-medium text-[16px] leading-[19.2px] text-[#121212] pb-2">
                    {el.title}
                  </h3>
                  <ul className="list-disc pl-6">
                    <li className="leading-[22.4px] text-[#121212E5] marker:text-[11px]">
                      {el.pargraph}
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
          <button className="w-full sm:w-fit py-[18px] px-6 border border-[#121212] font-medium leading-[19.2px] text-[#121212]">
            EXPLORE PLANS
          </button>
        </div>
      </header>
    </>
  );
};

export default SubscribeHero;

import { Copyright } from "lucide-react";
import DetailPart from "../DetailPart";
import ImagePart from "../ImagePart";
import FlowerImage from "./../../../assets/flower-1.jpeg";
import HeroImage from "./../../../assets/hero.jpeg"

const Hero = () => {
  return (
    <div className="aj-hero">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column */}
        <div className="w-full lg:w-1/2 border border-[#121212] px-4 py-10 md:p-[80px]">
          <h2 className="text-[40px] md:text-[67px] leading-[48px] md:leading-[80.4px] font-semibold flex flex-col mb-4">Kyiv <span className="flex items-center">LuxeBouquets <sup><Copyright /></sup></span></h2>
          <p className="font-normal text-sm md:text-lg leading-[19.6px] md:leading-[25.2px] text-[#121212E5]">Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our <span className="italic">Online Flower Delivery Service</span></p>
          <div className="down-part flex pt-4 md:pt-6 mt-6 md:mt-[54px] items-end border-t border-t-[#121212]">
            <div className="img-container w-full h-[256px] pr-4 md:pr-6 mr-4 md:mr-6 border-r border-r-[#121212]">
              <img src={HeroImage} alt="girl" className="grayscale min-w-[155.5px] w-full h-full object-cover" />
            </div>
            <p className="text-sm leading-[16.8px]">Experience the joy of giving with our modern floral studio. Order online and send fresh flowers, plants and gifts today.</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Row */}
          <div className="flex flex-grow">
            {/* Inner Column 1 */}
            <div className="relative w-1/2 border border-t-[#121212] p-4">
              <DetailPart title="Fresh Flowers" dir="right" />
            </div>

            {/* Inner Column 2 */}
            <div className="w-1/2 border border-[#121212] border-b-0">
              <ImagePart image={FlowerImage} />
            </div>
          </div>
          {/* Row */}
          <div className="flex flex-grow">
            {/* Inner Column 1 */}
            <div className="w-1/2 border border-t-[#121212]">
              <ImagePart image={FlowerImage} />
            </div>

            {/* Inner Column 2 */}
            <div className="relative w-1/2 border border-[#121212] border-b-0 p-4">
              <DetailPart title="Dried Flowers" dir="left" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Left Column */}
        <div className="w-0 lg:w-1/2"></div>
        {/* Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Row */}
          <div className="flex">
            {/* Inner Column 1 */}
            <div className="relative w-1/2 border border-[#121212] border-r-0 border-b-0 p-4">
              <DetailPart title="Live Plants " dir="right" />
            </div>

            {/* Inner Column 2 */}
            <div className="w-1/2 border border-[#121212] border-b-0">
              <ImagePart image={FlowerImage} />
            </div>
          </div>
          {/* Row */}
          <div className="flex">
            {/* Inner Column 1 */}
            <div className="w-1/2 border border-[#121212] border-r-0 border-b-0">
              <ImagePart image={FlowerImage} />
            </div>

            {/* Inner Column 2 */}
            <div className="relative w-1/2 border border-[#121212] border-b-0 p-4">
              <DetailPart title="Aroma Candels " dir="left" />
            </div>
          </div>
          {/* Row */}
          <div className="flex">
            {/* Inner Column 1 */}
            <div className="relative w-1/2 border border-[#121212] border-r-0 p-4">
              <DetailPart title="Fresheners" dir="right" />
            </div>

            {/* Inner Column 2 */}
            <div className="w-1/2 border border-[#121212]">
              <ImagePart image={FlowerImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

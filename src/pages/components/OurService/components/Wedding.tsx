import TextContent from "./TextContent";
import WeddingImage from "./../../../../assets/wedding.png";

const Wedding = () => {
  return (
    <div
      className="flex justify-center items-center py-[216.5px] text-white"
      style={{ background: `url(${WeddingImage})` }}
    >
      <TextContent
        subTitle="service"
        title="Wedding & Event Decor"
        text="Let our team of expert florists and designers create stunning, on-trend floral décor for your special day. Trust us to bring your vision to life."
        button="Inquire Now"
      />
    </div>
  );
};

export default Wedding;
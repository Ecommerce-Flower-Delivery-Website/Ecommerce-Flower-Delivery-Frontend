import ContactUs from "../components/ContactUs/ContactUs";
import Hero from "../components/Hero/Hero";
import OurClientsSay from "../components/OurClientsSay/OurClientsSay";
import OurService from "../components/OurService/OurService";
import HomeAboutUs from "../components/HomeAboutUs/HomeAboutUs";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div className="home">
      {/* <Hero />
      <HomeAboutUs />
      <WhyChooseUs />
      <ContactUs />
      <OurService /> */}
      <OurClientsSay />
    </div>
  );
};

export default Home;

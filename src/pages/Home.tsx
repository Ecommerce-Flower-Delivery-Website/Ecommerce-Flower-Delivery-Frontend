import ContactUs from "./components/ContactUs/ContactUs"
import OurClientsSay from "./components/OurClientsSay/OurClientsSay"
import OurService from "./components/OurService/OurService"

const Home = () => {
  return (
    <div className="home">
      
      <ContactUs />
      <OurService />
      <OurClientsSay />
    </div>
  )
}

export default Home
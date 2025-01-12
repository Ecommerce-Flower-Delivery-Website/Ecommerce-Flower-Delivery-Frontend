import FlowerSubscription from "./components/FlowerSubscription"
import Wedding from "./components/Wedding"

const OurService = () => {
  return (
    <div className="our-service">
      <h2 className="text-[50px] text-center leading-[60px] my-20">Our Service</h2>
      <FlowerSubscription />
      <Wedding />
    </div>
  )
}

export default OurService
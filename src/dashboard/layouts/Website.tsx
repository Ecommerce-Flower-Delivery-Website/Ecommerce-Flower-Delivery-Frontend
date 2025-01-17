import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import SubscriptionFAQ from "../../Components/SubscriptionFAQ/SubscriptionFAQ";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";

const Website = () => {
  return (
    <>
      <Navbar />
        {/* <Outlet /> */}
        {/* <SubscriptionFAQ /> */}
        <RelatedProducts />
      <Footer />
    </>
  );
}

export default Website
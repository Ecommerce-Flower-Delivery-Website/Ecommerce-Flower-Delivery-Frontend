import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const Website = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
}

export default Website
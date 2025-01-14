import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const Website = () => {
  return (
    <main className=" bg-white text-black">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Website;

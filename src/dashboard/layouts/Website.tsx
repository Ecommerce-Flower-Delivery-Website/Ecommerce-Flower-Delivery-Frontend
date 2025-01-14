import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

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

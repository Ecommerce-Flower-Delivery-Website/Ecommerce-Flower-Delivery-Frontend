import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
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

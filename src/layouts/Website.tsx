import { Outlet } from "react-router-dom";
// import Footer from "../../components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { useDialogRenderer } from "../hooks/useDialogRender";

import { RootState, useReduxSelector } from "../store/store";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "../contexts/CartContext";
import { ScrollArea } from "../components/ui/ScrollArea";

const Website = () => {
  const { user } = useReduxSelector((state: RootState) => state.auth);
  const { renderDialog } = useDialogRenderer(user);

  return (
    <CartProvider>
      <ScrollArea className=" h-screen bg-white text-black ">
        <Navbar />
        <Outlet />
        <Footer />
        {renderDialog()}
      </ScrollArea>
    </CartProvider>
  );
};

export default Website;

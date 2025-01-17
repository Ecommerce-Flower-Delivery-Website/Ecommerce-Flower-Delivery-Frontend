import { Outlet } from "react-router-dom";
// import Footer from "../../components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { useDialogRenderer } from "../hooks/useDialogRender";

import { RootState, useReduxSelector } from "../store/store";

const Website = () => {
  const { user } = useReduxSelector((state: RootState) => state.auth);
  const { renderDialog } = useDialogRenderer(user);

  return (
    <div className=" bg-white text-black light">
      <Navbar />
      <Outlet />
      {renderDialog()}
    </div>
  );
};

export default Website;

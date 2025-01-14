// import { Link } from "react-router-dom";
import "./App.css";
import LoginFormDialog from "./components/auth/LoginFormDialog";
import RegisterFormDialog from "./components/auth/RegisterFormDialog";
import ForgotPasswordDialog from "./components/auth/ForgotPasswordDialog";
import VerificationDialog from "./components/auth/VerificationDialog";

function App() {


  return (
    <>
    <LoginFormDialog/>
    <RegisterFormDialog/>
    
    <ForgotPasswordDialog/>
    <VerificationDialog/>

      {/* <Link
        className="text-3xl font-bold underline"
        to={"/dashboard/login_dashboard"}
      >
        login dashboard
      </Link> */}
    </>
  );
}

export default App;

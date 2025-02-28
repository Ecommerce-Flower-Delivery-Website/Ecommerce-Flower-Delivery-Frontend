import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { PiTelegramLogo } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";
import { SlSocialFacebook, SlSocialTwitter } from "react-icons/sl";
import { Link, useSearchParams } from "react-router-dom";
import { useReduxSelector } from "../../../store/store";
import { EnumsDialogShow, EnumsSearchParams } from "../../../types/global";
import CartModal from "./CartModal";

const Navbar = () => {
  const [navMenu, setNavMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useReduxSelector((state) => state.auth);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (navMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navMenu]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      <div className="border sticky h-[81px] top-0 z-40 bg-white divide-x divide-textPrimaryColor  border-textPrimaryColor flex justify-between items-center">
        <div className="lg:w-1/4 h-full flex justify-center items-center ">
          <button
            onClick={() => setNavMenu(!navMenu)}
            className="lg:hidden inline-block p-3 md:p-4 h-full hover:bg-gray-800 hover:text-white border-r border-textPrimaryColor"
          >
            <IoMdMenu size={"24"} />
          </button>
          <button className="hidden lg:inline-block border-r border-textPrimaryColor w-1/2 h-full text-center  font-medium text-base ">
            Shop
          </button>
          <Link
            to="/contact"
            className="hidden  border-r border-textPrimaryColor  lg:flex justify-center items-center w-1/2 h-full text-center  font-medium text-base "
          >
            Contact
          </Link>
        </div>
        <div className="lg:w-1/4 h-full   flex justify-center items-center divide-x divide-textPrimaryColor  ">
          {localStorage.getItem("token") ? (
            <button
              className=" lg:inline-block lg:w-1/2  h-full text-center  font-medium text-base "
              onClick={handleLogout}
            >
              Sign out
            </button>
          ) : (
            <button
              className=" lg:inline-block whitespace-nowrap lg:w-1/2 px-4 h-full text-center  font-medium text-base "
              onClick={() => {
                setSearchParams((prevParams) => {
                  prevParams.set(
                    EnumsSearchParams.dialog,
                    EnumsDialogShow.Login
                  );
                  return prevParams;
                });
              }}
            >
              Sign in
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            disabled={!user}
            className="hidden disabled:opacity-50 flex-1 disabled:pointer-events-none lg:inline-block  h-full text-center  font-medium text-base "
          >
            Cart
          </button>
          <button
            disabled={!user}
            onClick={() => setIsOpen(true)}
            className="lg:hidden disabled:opacity-50 flex-1 h-full disabled:pointer-events-none inline-block p-3 md:p-4  hover:bg-gray-800 hover:text-white"
          >
            <RiShoppingBagLine size={"24"} />
          </button>
        </div>
      </div>
      {navMenu && (
        <>
          <div className="fixed z-50 inset-0 w-full h-full bg-[rgba(210,210,215,0.35)] backdrop-blur-sm"></div>
          <div className="fixed z-50 top-0 left-0 w-[100%] md:w-[384px] h-full bg-white border border-textPrimaryColor">
            <button
              onClick={() => setNavMenu(!navMenu)}
              className="w-full text-start p-3 font-medium border-b border-textPrimaryColor"
            >
              <IoMdClose size={"18px"} />
            </button>
            {localStorage.getItem("token") ? (
              <button
                className="hidden lg:inline-block w-1/2 h-[81px] text-center border-l border-textPrimaryColor font-medium text-base "
                onClick={handleLogout}
              >
                Sign out
              </button>
            ) : (
              <button
                className="hidden lg:inline-block w-1/2 h-[81px] text-center border-l border-textPrimaryColor font-medium text-base "
                onClick={() => {
                  setSearchParams((prevParams) => {
                    prevParams.set(
                      EnumsSearchParams.dialog,
                      EnumsDialogShow.Login
                    );
                    return prevParams;
                  });
                }}
              >
                Sign in
              </button>
            )}
            <button
              className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
              style={{ fontSize: "21px" }}
            >
              Shop
            </button>
            <button
              className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
              style={{ fontSize: "21px" }}
            >
              Service
            </button>
            <Link to="/contact">
              <button
                className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
                style={{ fontSize: "21px" }}
              >
                Contact
              </button>
            </Link>
            <Link to="/about-us">
              <button
                className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
                style={{ fontSize: "21px" }}
              >
                About us
              </button>
            </Link>
            <div className="w-full flex flex-col p-6 border-b border-textPrimaryColor">
              <a href="" className="mb-4 font-medium">
                Shipping & returns
              </a>
              <a href="" className="mb-4 font-medium">
                Terms & conditions
              </a>
              <a href="" className="font-medium">
                Privacy policy
              </a>
            </div>
            <div className="flex w-full justify-between p-6">
              <FaInstagram size={"24px"} className="cursor-pointer" />
              <ImPinterest2 size={"24px"} className="cursor-pointer" />
              <SlSocialFacebook size={"24px"} className="cursor-pointer" />
              <SlSocialTwitter size={"24px"} className="cursor-pointer" />
              <PiTelegramLogo size={"24px"} className="cursor-pointer" />
            </div>
          </div>
        </>
      )}

      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;

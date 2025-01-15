import { useClickOutside } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { PiTelegramLogo } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";
import { SlSocialFacebook, SlSocialTwitter } from "react-icons/sl";
import { useReduxSelector } from "../../../store/store";
import CartModal from "./CartModal";
interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
const Navbar = () => {
  const [navMenu, setNavMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useReduxSelector((state) => state.auth);
  console.log("user", user);
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: "Rosy Delight",
      price: 100,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1454262041357-5d96f50a2f27?w=800&q=80",
    },
  ]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (navMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navMenu]);

  return (
    <>
      <div className="border border-textPrimaryColor flex justify-between items-center">
        <div className="lg:w-1/4 ">
          <button
            onClick={() => setNavMenu(!navMenu)}
            className="lg:hidden inline-block p-3 md:p-4 border-r border-textPrimaryColor hover:bg-gray-800 hover:text-white"
          >
            <IoMdMenu size={"24"} />
          </button>
          <button className="hidden lg:inline-block w-1/2 h-[81px] text-center border-r border-textPrimaryColor font-medium text-base ">
            Shop
          </button>
          <button className="hidden lg:inline-block w-1/2 h-[81px] text-center border-r border-textPrimaryColor font-medium text-base ">
            Contact
          </button>
        </div>
        <div className="lg:w-1/4 ">
          <button className="hidden lg:inline-block w-1/2 h-[81px] text-center border-l border-textPrimaryColor font-medium text-base ">
            Sign in
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="hidden lg:inline-block w-1/2 h-[81px] text-center border-l border-textPrimaryColor font-medium text-base "
          >
            Cart
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden inline-block p-3 md:p-4 border-l border-textPrimaryColor hover:bg-gray-800 hover:text-white"
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
            <button
              className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
              style={{ fontSize: "21px" }}
            >
              Sign in
            </button>
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
            <button
              className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
              style={{ fontSize: "21px" }}
            >
              Contact
            </button>
            <button
              className="w-full text-start p-6 font-medium border-b border-textPrimaryColor"
              style={{ fontSize: "21px" }}
            >
              About us
            </button>
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
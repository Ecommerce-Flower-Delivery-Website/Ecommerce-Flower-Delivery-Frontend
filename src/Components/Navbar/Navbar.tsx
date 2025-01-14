import { useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { ImPinterest2 } from "react-icons/im";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { PiTelegramLogo } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";
import { useClickOutside } from "@mantine/hooks";
import { useReduxSelector } from "../../store/store";
import { Portal } from "@radix-ui/react-portal";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
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
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
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

      <Portal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
              <motion.div
                ref={ref}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white text-black shadow-xl"
              >
                <div className="grid grid-rows-[auto_1fr_auto] h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-black">
                    <h2 className="text-xl font-semibold">Shopping Cart</h2>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="hover:text-gray-600 transition-colors"
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close</span>
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="overflow-auto">
                    <AnimatePresence>
                      {cartItems.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-4 text-center text-gray-500"
                        >
                          Your cart is empty
                        </motion.div>
                      ) : (
                        cartItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          >
                            <CartItem {...item} onRemove={removeItem} />
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                  {cartItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Subtotal */}
                      <div className="flex items-center justify-between p-4 border-y border-black">
                        <span className="font-medium">Subtotal</span>
                        <span className="font-medium">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Gift Message */}
                      <div className="p-4 border-b border-black">
                        <textarea
                          placeholder="Gift Message"
                          className="w-full border-black resize-none focus:ring-0 focus-visible:ring-0 rounded-none transition-shadow"
                        />
                      </div>

                      {/* Shipping Info */}
                      <div className="p-4 text-center text-sm space-y-1 border-b border-black">
                        <p>Shipping & taxes calculated at checkout</p>
                        <p>Free standard shipping within Kyiv</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Checkout Button */}
                  {cartItems.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="w-full bg-black text-white p-4 hover:bg-gray-900 transition-colors"
                    >
                      CHECK OUT
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
};
interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
}

function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onRemove,
}: CartItemProps) {
  return (
    <div className="grid grid-cols-1  py-8 sm:grid-cols-[100px_100px_1fr] gap-4 p-4 border-b border-black">
      <div className="relative border size-[100px] border-black overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover absolute inset-0 w-full h-full transition-transform hover:scale-110"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm">Quantity ({quantity})</p>
        <p className="font-medium">${price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-sm ml-auto text-gray-500 hover:text-gray-900 transition-colors"
      >
        Remove
      </button>
    </div>
  );
}
export default Navbar;

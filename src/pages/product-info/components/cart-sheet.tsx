import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { CartItem } from "./cart-item";
import { Portal } from "@radix-ui/react-portal";
import { useClickOutside } from "@mantine/hooks";
import { useReduxSelector } from "../../../store/store";
interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function CartSheet() {
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
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hover:text-gray-600 transition-colors"
      >
        <ShoppingBag className="h-5 w-5" />
        <span className="sr-only">Open cart</span>
      </button>

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

                    {cartItems.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {/* Subtotal */}
                        <div className="flex items-center justify-between p-4 border-b border-black">
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
                  </div>

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
}
import { useClickOutside } from "@mantine/hooks";
import { Portal } from "@radix-ui/react-select";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCart } from "../../../contexts/CartContext";
interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: () => void;
}

function CartItem({ name, price, quantity, image, onRemove }: CartItemProps) {
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
        onClick={() => onRemove()}
        className="text-sm ml-auto text-gray-500 hover:text-gray-900 transition-colors"
      >
        Remove
      </button>
    </div>
  );
}
const CartModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const { data, isLoading, removeItem } = useCart();

  // Handle cart data
  const cartItems = data?.items || [];
  const subtotal = cartItems.reduce(
    (total, item) => total + item.quantity * 10, // Replace `10` with actual price per item if available
    0
  );
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
  return (
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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white text-black shadow-xl"
            >
              <div ref={ref} className="grid grid-rows-[auto_1fr_auto] h-full">
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
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 text-center text-gray-500"
                    >
                      Loading...
                    </motion.div>
                  ) : (
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
                            key={item.productId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          >
                            <CartItem
                              image={item.productId.image}
                              name={item.productId.name}
                              price={item.productId.price}
                              quantity={item.productId.quantity}
                              onRemove={() => removeItem(item.productId)}
                            />
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  )}
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
  );
};

export default CartModal;

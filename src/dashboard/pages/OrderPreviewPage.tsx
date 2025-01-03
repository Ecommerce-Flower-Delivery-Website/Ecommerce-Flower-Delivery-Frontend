import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { getOrderByIdThunk } from "../../store/slices/orderSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { Card, CardContent } from "../components/card";

export const OrderPreviewPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { orderPreview: order, isPending } = useReduxSelector(
    (state) => state.orders
  );
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (!params.id) {
      navigate("/not-found");
      return;
    }
    dispatch(getOrderByIdThunk({ id: params.id }));
  }, [dispatch, navigate, params.id]);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (!order) {
    navigate("/not-found");
    return null;
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen  p-6"
    >
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 ">Order Details</h1>

          <Section title="Recipient Information">
            <InfoItem label="Name" value={order.recipientName} />
            <InfoItem label="Phone" value={order.recipientPhone} />
            <InfoItem
              label="Address"
              value={
                order.address
                  ? `${order.address.street}, Apt ${order.address.apartmentNumber}`
                  : "Address not provided"
              }
            />
            <InfoItem
              label="Knows Address"
              value={order.doesKnowAddress ? "Yes" : "No"}
            />
          </Section>

          <Section title="Delivery Information">
            <InfoItem
              label="Date"
              value={new Date(order.dateDelivery).toLocaleDateString()}
            />
            <InfoItem label="Time" value={order.timeDelivery} />
          </Section>

          <Section title="Products">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.array_product.map((product, index) => (
                <motion.div
                  key={index}
                  className="p-4 border rounded-md cursor-pointer shadow-sm bg-background"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() =>
                    navigate(`/dashboard/products/product/${product._id}`)
                  }
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-sm ">
                        ${product.priceAfterDiscount.toFixed(2)}
                      </p>
                      {product.discount ? (
                        <p className="text-sm text-green-600">
                          {product.discount}% off
                        </p>
                      ) : null}
                      <p className="text-sm ">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section title="Payment Information">
            <InfoItem
              label="Total Amount"
              value={`$${order.totalAmount.toFixed(2)}`}
            />
            {order.discountGift && (
              <InfoItem
                label="Gift Discount"
                value={`$${order.discountGift}`}
              />
            )}
            {order.discountSubscribe && (
              <InfoItem
                label="Subscription Discount"
                value={`$${order.discountSubscribe}`}
              />
            )}
            <InfoItem
              label="Card Number"
              value={`**** **** **** ${order.cardNumber.slice(-4)}`}
            />
            <InfoItem label="CVV" value={order.cvvCode} />
          </Section>

          <Section title="Order Status">
            <InfoItem
              label="Status"
              value={order.isDone ? "Completed" : "Pending"}
            />
          </Section>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <motion.section
    className="mb-8 bg-muted rounded-md p-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl font-semibold mb-4 ">{title}</h2>
    <div className="p-4 rounded-md">{children}</div>
  </motion.section>
);

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <p className="mb-2">
    <span className="font-medium ">{label}:</span>{" "}
    <span className="">{value}</span>
  </p>
);

export default OrderPreviewPage;

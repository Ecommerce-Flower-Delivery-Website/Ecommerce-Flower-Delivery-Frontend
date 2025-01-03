import { DialogClose } from "@radix-ui/react-dialog";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Order,
  removeOrderThunk,
  toggleOrderStatusThunk,
} from "../../../../store/slices/orderSlice";
import { useReduxDispatch, useReduxSelector } from "../../../../store/store";
import { Button } from "../../../components/button";
import { Checkbox } from "../../../components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog";

export const ToggleStatusButton = ({ order }: { order: Order }) => {
  const dispatch = useReduxDispatch();
  const { isPending } = useReduxSelector((state) => state.orders);
  const toggle = (values: { _id: string; status: boolean }) => {
    dispatch(toggleOrderStatusThunk(values));
  };

  return (
    <span className=" relative size-4">
      {isPending ? (
        <Loader2 className=" animate-spin inline size-4" />
      ) : (
        <Checkbox
          id="isDone"
          defaultChecked={order.isDone}
          onCheckedChange={(checked) => {
            toggle({ _id: order._id, status: Boolean(checked) });
          }}
        />
      )}
    </span>
  );
};

export const Remove = ({ orderId }: { orderId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" size-8 p-1 " variant="ghost">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
        </DialogHeader>
        <p>are you sure you want to delete the order ?</p>
        <div className="flex w-full justify-between">
          <DialogClose asChild>
            <Button variant={"ghost"}>Close</Button>
          </DialogClose>
          <Button
            onClick={() => dispatch(removeOrderThunk(orderId))}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const Show = ({ order }: { order: Order }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="size-8 p-1" variant="ghost">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>Recipient Name:</strong> {order.recipientName}
          </p>
          <p>
            <strong>Phone:</strong> {order.recipientPhone}
          </p>
          <p>
            <strong>Delivery Date:</strong>{" "}
            {new Date(order.dateDelivery).toLocaleDateString()}
          </p>
          <p>
            <strong>Delivery Time:</strong> {order.timeDelivery}
          </p>
          <p>
            <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
          </p>
          {order.address && (
            <p>
              <strong>Address:</strong> {order.address.street}, Apt{" "}
              {order.address.apartmentNumber}
            </p>
          )}
          <p>
            <strong>Order Status:</strong>{" "}
            {order.isDone ? "Completed" : "Pending"}
          </p>
          <p>
            <strong>Payment Info:</strong> Card ending in{" "}
            {order.cardNumber.slice(-4)}
          </p>
        </div>
        <div className="flex w-full justify-between mt-4">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

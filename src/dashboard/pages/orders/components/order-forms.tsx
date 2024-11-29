import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Check, Edit as EditIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validateSchemas } from "../../../../lib/zod";
import { Button } from "../../../components/button";
import { Checkbox } from "../../../components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/dialog";
import { ErrorMessage } from "../../../components/error-message";
import { Input } from "../../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../components/select";
import {
  createOrder,
  removeOrder,
  updateOrder,
} from "../../../store/slices/orderSlice";
import { useReduxDispatch } from "../../../store/store";

type CreateOrderFormType = z.infer<typeof validateSchemas.createOrder>;
const Products = [
  {
    _id: "products_1",
    name: "sub products 1",
  },
  {
    _id: "products_2",
    name: "sub products 2",
  },
  {
    _id: "products_3",
    name: "sub products 3",
  },
];
export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<CreateOrderFormType>({
    resolver: zodResolver(validateSchemas.createOrder),
    defaultValues: {
      products: [],
    },
  });
  const dispatch = useReduxDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) => {
      const newState = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      setValue("products", newState);
      return newState;
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => dispatch(createOrder(values)))}
          className="grid  py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="cart_id" className="text-right">
              Cart Id
            </label>
            <Input
              id="cart_id"
              {...register("cart_id")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.cart_id?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="address" className="text-right">
              Address
            </label>
            <Input
              id="address"
              {...register("address")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.address?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="total" className="text-right">
              Total
            </label>
            <Input
              id="total"
              type="number"
              {...register("total")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.total?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="products" className="text-right">
              Products
            </label>
            <Select onValueChange={(value) => toggleOption(value)}>
              <SelectTrigger className="w-[200px] col-span-3  bg-white dark:bg-gray-800">
                {selectedOptions.length > 0
                  ? `selected : ${selectedOptions.length}`
                  : "select sub products"}
              </SelectTrigger>
              <SelectContent>
                {Products.map((prod) => {
                  return (
                    <SelectItem
                      className=" relative flex justify-start px-2  items-center "
                      key={prod._id}
                      value={prod._id}
                    >
                      {selectedOptions.includes(prod._id) && (
                        <Check className="h-4 w-4 inline-block text-white" />
                      )}
                      <span className="inline-block mx-2">{prod.name}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.products?.message} />
          <div className="grid grid-cols-4  items-center gap-4">
            <label htmlFor="isDone" className="text-right">
              status
            </label>
            <Checkbox
              id="isDone"
              {...register("isDone", {
                setValueAs: (val) => {
                  return val === "on";
                },
              })}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.isDone?.message} />
          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Create Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const Edit = ({ order }: { order: Order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: order,
  });
  const dispatch = useReduxDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    order.products
  );

  const toggleOption = (value: string) => {
    setSelectedOptions((prev) => {
      const newState = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      setValue("products", newState);
      return newState;
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) =>
            dispatch(updateOrder({ _id: order._id, data: values }))
          )}
          className="grid  py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="cart_id" className="text-right">
              Cart Id
            </label>
            <Input
              id="cart_id"
              {...register("cart_id")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.cart_id?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="address" className="text-right">
              Address
            </label>
            <Input
              id="address"
              {...register("address")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.address?.message} />
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="total" className="text-right">
              Total
            </label>
            <Input
              id="total"
              inputMode="decimal"
              {...register("total")}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.total?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="products" className="text-right">
              Products
            </label>
            <Select onValueChange={(value) => toggleOption(value)}>
              <SelectTrigger className="w-[200px] col-span-3  bg-white dark:bg-gray-800">
                {selectedOptions.length > 0
                  ? `selected : ${selectedOptions.length}`
                  : "select sub products"}
              </SelectTrigger>
              <SelectContent>
                {Products.map((prod) => {
                  return (
                    <SelectItem
                      className=" relative flex justify-start px-2  items-center "
                      key={prod._id}
                      value={prod._id}
                    >
                      {selectedOptions.includes(prod._id) && (
                        <Check className="h-4 w-4 inline-block text-white" />
                      )}
                      <span className="inline-block mx-2">{prod.name}</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.products?.message} />
          <div className="grid grid-cols-4  items-center gap-4">
            <label htmlFor="isDone" className="text-right">
              status
            </label>
            <Checkbox
              id="isDone"
              defaultChecked={order.isDone}
              onCheckedChange={(checked) => {
                if (typeof checked !== "boolean") return;
                setValue("isDone", checked);
              }}
              className="col-span-3"
            />
          </div>
          <ErrorMessage message={errors.isDone?.message} />
          <Button
            type="submit"
            disabled={isLoading}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export const Remove = ({ orderId }: { orderId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useReduxDispatch();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
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
            onClick={() => dispatch(removeOrder(orderId))}
            className="hover:bg-primary-hover bg-primary text-white"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

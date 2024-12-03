import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Check, Edit as EditIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { validateSchemas } from "../../../../lib/zod";
import { Button } from "../../../components/button";
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

import { useReduxDispatch } from "../../../../store/store";
import { z } from "zod";
import {
  createCart,
  removeCart,
  updateCart,
} from "../../../../store/slices/cartSlice";

type CreateCartFormType = z.infer<typeof validateSchemas.createCart>;
const ProductOptions = [
  { _id: "prod_1", name: "Product 1" },
  { _id: "prod_2", name: "Product 2" },
  { _id: "prod_3", name: "Product 3" },
];

export const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<Cart["status"]>("active");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<CreateCartFormType>({
    resolver: zodResolver(validateSchemas.createCart),
    defaultValues: {
      products: [],
      discount: 0,
      status: "active",
      totalAmount: 0,
    },
  });

  const dispatch = useReduxDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelection);
    setValue("products", newSelection);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Cart</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) => dispatch(createCart(values)))}
          className="grid py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="user_id">User ID</label>
            <Input
              className="col-span-3"
              id="user_id"
              {...register("user_id")}
            />
          </div>
          <ErrorMessage message={errors.user_id?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="discount">Discount</label>
            <Input
              className="col-span-3"
              type="number"
              id="discount"
              {...register("discount")}
            />
          </div>
          <ErrorMessage message={errors.discount?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="totalAmount">Total</label>
            <Input
              id="totalAmount"
              type="number"
              className="col-span-3"
              {...register("totalAmount")}
            />
          </div>
          <ErrorMessage message={errors.totalAmount?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status">Status</label>
            <Select
              value={status}
              onValueChange={(value: "active" | "complete") => {
                setStatus(value);
                setValue("status", value);
              }}
            >
              <SelectTrigger className=" col-span-3">{status}</SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.status?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label>Products</label>
            <Select onValueChange={toggleProduct}>
              <SelectTrigger className=" col-span-3">
                {selectedProducts.length > 0
                  ? `Selected: ${selectedProducts.length}`
                  : "Select Products"}
              </SelectTrigger>
              <SelectContent>
                {ProductOptions.map((product) => (
                  <SelectItem
                    className=" relative flex justify-start px-2  items-center "
                    key={product._id}
                    value={product._id}
                  >
                    {selectedProducts.includes(product._id) && (
                      <Check className="h-4 w-4 inline-block text-white" />
                    )}
                    <span className="inline-block mx-2">{product.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.products?.message} />

          <Button type="submit" disabled={isLoading}>
            Create Cart
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
type EditCartFormType = z.infer<typeof validateSchemas.editCart>;
export const Edit = ({ cart }: { cart: Cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(cart.status);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm<EditCartFormType>({
    resolver: zodResolver(validateSchemas.editCart),
    defaultValues: {
      _id: cart._id,
      user_id: cart.user_id,
      discount: cart.discount,
      status: cart.status,
      totalAmount: cart.totalAmount,
      products: cart.products,
    },
  });

  const dispatch = useReduxDispatch();
  const [selectedProducts, setSelectedProducts] = useState<string[]>(
    cart.products
  );

  const toggleProduct = (productId: string) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    setSelectedProducts(newSelection);
    setValue("products", newSelection);
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
          <DialogTitle>Edit Cart</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((values) =>
            dispatch(updateCart({ _id: cart._id, data: values }))
          )}
          className="grid py-4 "
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="user_id">User ID</label>
            <Input
              id="user_id"
              className="col-span-3"
              {...register("user_id")}
            />
          </div>
          <ErrorMessage message={errors.user_id?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="discount">Discount</label>
            <Input
              id="discount"
              type="number"
              className="col-span-3"
              {...register("discount")}
            />
          </div>
          <ErrorMessage message={errors.discount?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="totalAmount">Total</label>
            <Input
              id="totalAmount"
              type="number"
              className="col-span-3"
              {...register("totalAmount")}
            />
          </div>
          <ErrorMessage message={errors.totalAmount?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status">Status</label>
            <Select
              value={status}
              onValueChange={(value: "active" | "complete") => {
                setStatus(value);
                setValue("status", value);
              }}
            >
              <SelectTrigger className=" col-span-3">{status}</SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.status?.message} />

          <div className="grid grid-cols-4 items-center gap-4">
            <label>Products</label>
            <Select onValueChange={toggleProduct}>
              <SelectTrigger className="col-span-3">
                {selectedProducts.length > 0
                  ? `Selected: ${selectedProducts.length}`
                  : "Select Products"}
              </SelectTrigger>
              <SelectContent>
                {ProductOptions.map((product) => (
                  <SelectItem
                    key={product._id}
                    value={product._id}
                    className="relative flex justify-start px-2 items-center"
                  >
                    {selectedProducts.includes(product._id) && (
                      <Check className="h-4 w-4 inline-block text-white" />
                    )}
                    <span className="inline-block mx-2">{product.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ErrorMessage message={errors.products?.message} />

          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const Remove = ({ cartId }: { cartId: string }) => {
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
          <DialogTitle>Delete Cart</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this cart?</p>
        <div className="flex justify-between py-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => dispatch(removeCart(cartId))}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

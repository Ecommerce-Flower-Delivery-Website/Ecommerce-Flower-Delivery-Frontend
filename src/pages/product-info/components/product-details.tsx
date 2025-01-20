import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccessoryType, useCart } from "../../../contexts/CartContext";
import LoadingSpinner from "../../../dashboard/components/LoadingSpinner";
import { api } from "../../../lib/ajax/api";
type Category = {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Product = {
  _id: string;
  priceAfterDiscount: string;
  quantity: string;
  title: string;
  image: string;
  stock: string;
  price: string;
  category_id: Category;
  description: string;
  accessory_id: string[];
  __v: number;
};

export function ProductDetails({ productId }: { productId: string }) {
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`product/${productId}`],
    queryFn: async () => {
      const res = await api.get(`/product/${productId}`);
      return res.data?.data?.product as Product & { _id: string };
    },
    throwOnError: true,
  });

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const backendBaseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL;
  const navigate = useNavigate();
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (!product) {
    navigate("/not-found");
    return;
  }
  const accessories = (product.accessory_id ??
    []) as unknown as AccessoryType[];
  console.log(product);
  return (
    <div className="grid grid-cols-1 border border-y-0  divide-x-[1px] divide-black xl:grid-cols-2">
      <div className="relative  aspect-[420/375] md:h-full w-full ">
        <img
          src={backendBaseUrl + product.image}
          alt="Rosy Delight Bouquet"
          className=" absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
        <div>
          <div className="text-sm mb-4">
            <span className="text-gray-600 uppercase">
              {product.category_id?.title}
            </span>
            <span className="mx-2">/</span>
            <span className=" uppercase">{product.title}</span>
          </div>
          <h1 className="text-xl md:text-2xl mb-4 uppercase">
            {product.title} - ${product.price}
          </h1>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="space-y-2">
          <div className="text-sm mb-4">Quantity</div>
          {product.stock == "0" ? (
            <div>
              <p>out of stack</p>
            </div>
          ) : (
            <div className="flex items-center justify-between border md:max-w-min border-black">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border-r border-black hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-8">{quantity}</span>
              <button
                disabled={Number(product.stock) <= quantity}
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 border-l border-black hover:bg-gray-100"
              >
                +
              </button>
            </div>
          )}
        </div>

        {accessories.length > 0 ? (
          <div>
            <p className=" text-sm text-[#121212]/50 capitalize mb-2">
              vase not included
            </p>
            <div className="text-sm mb-4">Excellent Combination with:</div>
            <div className="relative flex justify-between ">
              <button className=" inline-flex   w-8   items-center justify-center  ">
                <ChevronLeft className="size-8" />
              </button>
              <div className="   md:space-x-4   overflow-x-scroll flex pb-4">
                {accessories.map((vase) => (
                  <div
                    key={vase._id}
                    className="flex-none relative  inline-block  max-md:w-full  md:w-[100px]"
                  >
                    <div
                      className="flex-col transition-colors  hover:bg-gray-300 active:bg-pink-400 cursor-pointer flex relative  justify-center   mx-auto max-md:size-[208px] "
                      onClick={() =>
                        setSelectedAccessories((prev) => [...prev, vase._id])
                      }
                    >
                      <div
                        className={` max-md:flex-1  relative md:size-[100px] border overflow-hidden border-[#D2D2D7]`}
                      >
                        <img
                          src={vase.image}
                          alt={vase.title}
                          className=" absolute inset-0 size-full object-cover"
                        />
                      </div>
                      <div className="text-start p-2">
                        <h3 className="text-sm mb-2">{vase.title}</h3>
                        <p className="text-sm text-[#808080]">{vase.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="  inline-flex   w-8   items-center justify-center  ">
                <ChevronRight className="size-8" />
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex-1 border border-gray-200 flex justify-center items-center capitalize">
            <p>no accessories available to this product</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className=" font-bold mb-2">Price options</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="price-option"
                defaultChecked
                className="border-black text-black accent-black size-4 focus:ring-0"
              />
              <span>One time purchase. Price $100</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="price-option"
                className="border-black text-black accent-black size-4 focus:ring-0"
              />
              <span>Subscribe now, and save 25% on this order.</span>
            </label>
          </div>
        </div>

        <button
          onClick={() =>
            addItem({
              productId: product._id,
              productQuantity: quantity,
              accessoriesId: selectedAccessories,
            })
          }
          className="w-full bg-black text-white py-4 hover:bg-gray-900"
        >
          ADD TO BASKET
        </button>
      </div>
    </div>
  );
}

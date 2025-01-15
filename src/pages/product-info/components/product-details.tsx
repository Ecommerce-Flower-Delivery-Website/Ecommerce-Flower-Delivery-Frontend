import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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

const vaseOptions = [
  {
    name: "Glass Vase",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1602161946461-d4c17f1c8e11?w=500&q=80",
  },
  {
    name: "Hammershoi",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?w=500&q=80",
  },
  {
    name: "Ceramic Vase",
    price: "$35",
    image:
      "https://images.unsplash.com/photo-1525974160448-038dacadcc71?w=500&q=80",
  },
  {
    name: "Steel vase",
    price: "$25",
    image:
      "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=500&q=80",
  },
  {
    name: "Bamboo",
    price: "$30",
    image:
      "https://images.unsplash.com/photo-1485881446909-51498e996c0b?w=500&q=80",
  },
];

export function ProductDetails({ productId }: { productId: string }) {
  const { data: product } = useQuery({
    queryKey: [`product/${productId}`],
    queryFn: async () => {
      const res = await api.get(`/product/${productId}`);
      return res.data?.data?.product as Product & { _id: string };
    },
  });

  console.log(JSON.stringify(product));
  const [quantity, setQuantity] = useState(1);
  const [selectedVase, setSelectedVase] = useState<string | undefined>(
    undefined
  );
  const backendBaseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL;
  return (
    <div className="grid grid-cols-1 border border-y-0  divide-x-[1px] divide-black xl:grid-cols-2">
      <div className="relative  aspect-[420/375] md:h-full w-full ">
        <img
          src={backendBaseUrl + product?.image}
          alt="Rosy Delight Bouquet"
          className=" absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="p-4 md:p-8 space-y-6 md:space-y-8">
        <div>
          <div className="text-sm mb-4">
            <span className="text-gray-600 uppercase">
              {product?.category_id?.title}
            </span>
            <span className="mx-2">/</span>
            <span className=" uppercase">{product?.title}</span>
          </div>
          <h1 className="text-xl md:text-2xl mb-4 uppercase">
            {product?.title} - ${product?.price}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {product?.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm mb-4">Quantity</div>
          <div className="flex items-center justify-between border md:max-w-min border-black">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 border-r border-black hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-8">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 border-l border-black hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>

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
              {vaseOptions.map((vase) => (
                <div
                  key={vase.name}
                  className="flex-none relative  inline-block  max-md:w-full  md:w-[100px]"
                >
                  <div
                    className="flex-col  cursor-pointer flex relative  justify-center   mx-auto max-md:size-[208px] "
                    onClick={() => setSelectedVase(vase.name)}
                  >
                    <div
                      className={` max-md:flex-1  relative md:size-[100px] border overflow-hidden border-[#D2D2D7]`}
                    >
                      <img
                        src={vase.image}
                        alt={vase.name}
                        className=" absolute inset-0 object-cover"
                      />
                    </div>
                    <div className="text-start p-2">
                      <h3 className="text-sm mb-2">{vase.name}</h3>
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
          <div className="text-left font-semibold text-sm text-[#121212] mt-2">
            Vase Not Included
          </div>
        </div>

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

        <button className="w-full bg-black text-white py-4 hover:bg-gray-900">
          ADD TO BASKET
        </button>
      </div>
    </div>
  );
}

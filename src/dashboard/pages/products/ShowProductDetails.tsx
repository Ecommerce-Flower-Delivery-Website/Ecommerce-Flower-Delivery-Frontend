import { ArrowBigLeft } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import { getProduct } from "../../../store/slices/productSlice";
import Loader from "../../components/Loader";
import AccessoryPhoto from "../../components/AccessoryPhoto";

const ShowProductDetails = () => {
  const { id } = useParams();
  const dispatch = useReduxDispatch();
  const { product, loading } = useReduxSelector((state) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  const { image, title, price, description, stock } = product.product;

  return (
    <div className="min-h-screen p-5">
      <NavLink to="/dashboard/products" className="mb-5 inline-block">
        <ArrowBigLeft size={40} className="cursor-pointer" />
      </NavLink>
      <div className="dark:bg-[#020817] shadow-lg w-full mx-auto rounded p-5 flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2 w-full">
          <img
            className="w-full lg:h-full object-cover rounded-lg"
            src={`http://localhost:5000${image}`}
            alt={title || "Product"}
          />
        </div>
        <div className="lg:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Product Name: {title}
            </h1>
            <div className="flex justify-between mb-4">
              <h1 className="text-lg lg:text-xl font-bold">Price: {price}$</h1>
              <h1 className="text-lg lg:text-xl font-bold">
                Category: Flowers
              </h1>
            </div>
            <h1 className="text-lg lg:text-xl font-bold mb-4">
              Description: {description}
            </h1>
            <h1 className="text-lg lg:text-xl font-bold mb-4">
              Quantity: {stock}
            </h1>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold mb-2">Accessory:</h1>
            <AccessoryPhoto />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProductDetails;

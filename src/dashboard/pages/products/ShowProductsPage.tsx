import { NavLink } from "react-router-dom";
import ProductsTable from "../../components/ProductsTable";
import { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import { getProducts } from "../../../store/slices/productSlice";
import Loader from "../../components/Loader";

const ShowProductsPage = () => {
  const dispatch = useReduxDispatch();
  const { products, loading } = useReduxSelector((state) => state.product);

  const fetchData = () => {
    dispatch(getProducts());
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <NavLink
              to={"/dashboard/products/add"}
              className="bg-primary rounded p-4 font-bold mb-6"
            >
              Add Products
            </NavLink>
          </div>
          <div>
            <ProductsTable productsArray={products} fetchData={fetchData} />
          </div>
        </>
      )}
    </>
  );
};

export default ShowProductsPage;

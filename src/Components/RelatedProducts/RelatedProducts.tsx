import { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "../../store/store";
import { getRelatedProduct } from "../../store/slices/productSlice";
import LoadingSpinner from "../../dashboard/components/LoadingSpinner";

const RelatedProducts = () => {
  const dispatch = useReduxDispatch();
  const { products, loading, error } = useReduxSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getRelatedProduct("67816e4a52f7628e2f9623d7")).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        console.log(products);
      }
    });
  }, []);
  if (error) {
    return <div>No Related Products Found</div>;
  }
  return (
    <div>
      <div className="md:text-[38px] text-[26px] py-20 text-center text-textPrimaryColor font-medium">
        You may also like…
      </div>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap border-t border-l border-textPrimaryColor">
          {products.map((product) => {
            return (
              <div className="h-[360px] lg:w-1/4 md:w-1/2 w-full relative">
                <img
                  src={`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${
                    product.image
                  }`}
                  alt="error"
                  className="h-[360px] w-full object-cover border-textPrimaryColor 
                            border-b md:border-b md:border-r lg:border-b-0"
                />
                <div className="absolute inset-0 mb-6 flex items-center justify-end flex flex-col">
                  <h1 className="font-medium mb-1 text-textPrimaryColor">
                    {product.title}
                  </h1>
                  <p className="text-sm font-medium text-textSecondrayColor">
                    price {product.price}$
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;

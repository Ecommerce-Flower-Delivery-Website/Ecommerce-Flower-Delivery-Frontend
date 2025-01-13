import { ArrowBigLeft } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useReduxDispatch } from "../../../store/store";
import { addProducts } from "../../../store/slices/productSlice";

const AddProductsPage = () => {
  const file = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setImage] = useState<string | File>("");
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    file.current?.click();
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image) {
      setImage(image);
      const imageUrl = URL.createObjectURL(image);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("priceAfterDiscount", priceAfterDiscount);
    formData.append("quantity", quantity);
    formData.append("category_id", categoryId);
    formData.append("image", image);

    dispatch(addProducts(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setLoading(false);
        navigate("/dashboard/products");
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <>
      <div>
        <NavLink to={"/dashboard/products"}>
          <ArrowBigLeft size={40} />
        </NavLink>
        {loading ? (
          <div className="w-full flex justify-center items-center h-full">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Row 1: Title, Price After Discount, Category */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="title" className="block mb-2">
                  Title :
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="priceAfterDiscount" className="block mb-2">
                  Price After Discount :
                </label>
                <input
                  type="number"
                  id="priceAfterDiscount"
                  name="priceAfterDiscount"
                  onChange={(e) => setPriceAfterDiscount(e.target.value)}
                  placeholder="Price After Discount"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="category_id" className="block mb-2">
                  Category Id :
                </label>
                <input
                  type="text"
                  id="category_id"
                  name="category_id"
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder="Category Id"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            {/* Row 2: Quantity, Stock, Price */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="quantity" className="block mb-2">
                  Quantity :
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Quantity"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="stock" className="block mb-2">
                  Stock :
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Stock"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <label htmlFor="price" className="block mb-2">
                  Price :
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="w-full h-12 px-3 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            {/* Row 3: Description and Image */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[300px]">
                <label htmlFor="description" className="block mb-2">
                  Description :
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-48 px-3 py-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded resize-none"
                  required
                />
              </div>

              <div className="flex-1 min-w-[300px]">
                <label htmlFor="image" className="block mb-2">
                  Image :
                </label>
                <div
                  className="w-full h-48 border bg-white border-dashed dark:border-white border-gray-300 border-2 dark:bg-gray-800 rounded overflow-hidden"
                  onClick={handleClick}>
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Selected Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src="/assets/images/UploadIcon.png"
                        alt="Upload Icon"
                        className="w-12 h-12"
                      />
                    </div>
                  )}
                  <input
                    ref={file}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => handleFile(e)}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-primary text-white py-3 px-16 font-semibold rounded hover:bg-opacity-90 transition-colors">
                Add Product
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AddProductsPage;

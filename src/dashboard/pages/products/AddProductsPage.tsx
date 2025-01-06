import { ArrowBigLeft } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useReduxDispatch } from "../../../store/store";
import { addProducts } from "../../../store/slices/productSlice";

const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home Appliances" },
  { id: "4", name: "Books" },
  { id: "5", name: "Beauty" },
];

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
            <div>
              <label htmlFor="title" className="block mb-2">
                Title :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2">
                Quantity :
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="stock" className="block mb-2">
                Stock :
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block mb-2">
                Price :
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="priceAfterDiscount" className="block mb-2">
                Price After Discount :
              </label>
              <input
                type="number"
                id="priceAfterDiscount"
                name="priceAfterDiscount"
                onChange={(e) => setPriceAfterDiscount(e.target.value)}
                placeholder="price after discount"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block mb-2">
              Category Id :
              </label>
              <input
                type="text"
                id="category_id"
                name="category_id"
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="category id"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2">
                Description :
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                rows={4}
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2">
                Image :
              </label>
              <button
                type="button"
                className="flex p-5 border bg-white border-dashed dark:border-white border-gray-300 border-2 w-full dark:bg-gray-800 items-center justify-center rounded"
                onClick={handleClick}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected Preview"
                    className="w-[400px] h-[200px] rounded-md"
                  />
                ) : (
                  <img src="/assets/images/UploadIcon.png" alt="Upload Icon" />
                )}
                <input
                  ref={file}
                  className="sr-only"
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => handleFile(e)}
                />
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary text-white py-3 px-16 font-semibold rounded"
              >
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

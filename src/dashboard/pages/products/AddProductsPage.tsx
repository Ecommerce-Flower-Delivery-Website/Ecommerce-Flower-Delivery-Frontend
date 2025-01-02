import { ArrowBigLeft } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { useReduxDispatch } from "../../../store/store";
import { addProducts } from "../../../store/slices/productSlice";

// const categories = [
//   { id: "1", name: "Electronics" },
//   { id: "2", name: "Clothing" },
//   { id: "3", name: "Home Appliances" },
//   { id: "4", name: "Books" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
//   { id: "5", name: "Beauty" },
// ];

const AddProductsPage = () => {
  const file = useRef<HTMLInputElement | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");
  // const [size, setSize] = useState(1);
  const [loading, setloading] = useState(false);
  const [title, settitle] = useState<string>('');
  const [description, setdescription] = useState<string>('');
  const [stock, setstock] = useState<string>('');
  const [price, setprice] = useState<string>('');
  const [image, setimage] = useState<string | File>('');
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();



  const handleClick = () => {
    file.current?.click();
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image) {
      setimage(image);
      const imageUrl = URL.createObjectURL(image);
      setpreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setloading(true);
      const formDate = new FormData();
      formDate.append("title", title);
      formDate.append("description", description);
      formDate.append("stock", stock);
      formDate.append("price", price);
      formDate.append("image", image);
      dispatch(addProducts(formDate)).then((result)=>{
        if(result.meta.requestStatus === "fulfilled"){
          setloading(false);
          navigate("/dashboard/products");
        }else{
          setloading(false);
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
              <label htmlFor="title" className="block mb-2 mb-2">
                Title :
              </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => settitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2  dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2">
                Stock :
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                onChange={(e) => setstock(e.target.value)}
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
                onChange={(e) => setprice(e.target.value)}
                placeholder="Price"
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
                onChange={(e) => setdescription(e.target.value)}
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
                onClick={handleClick}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Selected Preview"
                    className="w-[400px] h-[200px]  rounded-md"
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

            {/* <div className="w-full">
              <label
                htmlFor="category"
                className="block overflow-hidden mb-2 text-sm font-medium">
                Category
              </label>
              <select
                size={size}
                onFocus={() => setSize(5)}
                onBlur={() => setSize(1)}
                onChange={(e) => {
                  setSize(1);
                  e.target.blur();
                }}
                id="category"
                name="category"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div> */}
            <div>
              <button
                type="submit"
                className="bg-primary text-white py-3 px-16 font-semibold rounded">
                Add Product
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default AddProductsPage
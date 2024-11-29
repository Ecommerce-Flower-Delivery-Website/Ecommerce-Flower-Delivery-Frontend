import { ArrowBigLeft } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home Appliances" },
  { id: "4", name: "Books" },
  { id: "5", name: "Beauty" },
  { id: "5", name: "Beauty" },
  { id: "5", name: "Beauty" },
  { id: "5", name: "Beauty" },
  { id: "5", name: "Beauty" },
];
const EditProductsPage = () => {
  const file = useRef<HTMLInputElement | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");
  const [size, setSize] = useState(1);

  const handleClick = () => {
    file.current?.click();
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null;
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      setpreviewImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div>
        <NavLink to={"/dashboard/products"}>
          <ArrowBigLeft size={40} />
        </NavLink>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label htmlFor="title" className="block mb-2 mb-2">
              Title :
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="w-full p-2  dark:bg-gray-800 font-semibold border border-gray-300 rounded"
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
              placeholder="Quantity"
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
                  className="w-full h-full object-cover rounded-md"
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

          <div className="w-full">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium">
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
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary text-white py-3 px-16 font-semibold rounded">
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProductsPage
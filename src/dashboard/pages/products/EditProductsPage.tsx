import { ArrowBigLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import { getProduct, updateProduct } from "../../../store/slices/productSlice";
import Loader from "../../components/Loader";

// const categories = [
//   { id: "1", name: "Electronics" },
// ];

const EditProductsPage = () => {

  const { id } = useParams();
  const dispatch = useReduxDispatch();
  const { product, loading } = useReduxSelector((state) => state.product);
  console.log(id);
  const file = useRef<HTMLInputElement | null>(null);
  const [previewImage, setpreviewImage] = useState<string>("");
  // const [loading, setloading] = useState(false);
  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [stock, setstock] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [image, setimage] = useState<string | File>("");
  const navigate = useNavigate();
  // const [size, setSize] = useState(1);  

  const handleClick = () => {
    file.current?.click();
  };
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
    console.log(title, description, stock, price, image);
    const formData = new FormData();
    if(title){
      formData.append("title", title);
    }    
    if(description){
      formData.append("description", description);
    }    
    if(price){
      formData.append("price", price);
    }    

    if(priceAfterDiscount) {
      formData.append("priceAfterDiscount", priceAfterDiscount);
    }

    if (quantity) {
      formData.append("quantity", quantity);
    }

    if (categoryId) {
      formData.append("category_id", categoryId);
    }

    if(stock){
      formData.append("stock", stock);
    }    
    if(image){
      formData.append("image", image);
    } 
    dispatch(updateProduct({ data :formData, id})).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
      navigate("/dashboard/products");
      }
    });   
  };

  useEffect(()=> {
    dispatch(getProduct(id)).then((result) => {
      if(result.meta.requestStatus === "fulfilled"){
        
        settitle(product?.product.title);
        setdescription(product?.product.description);
        setstock(product?.product.stock);
        setprice(product?.product.price);
        setPriceAfterDiscount(product?.product.priceAfterDiscount);
        setQuantity(product?.product.quantity);
        setCategoryId(product.product.category_id);
        setpreviewImage(`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${product?.product.image}`);
      }
    });
  },[])

  return (
    <>
      <div>
        <NavLink to={"/dashboard/products"}>
          <ArrowBigLeft size={40} />
        </NavLink>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
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
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2  dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="quantity" className="block mb-2">
                quantity :
              </label>
              <input
                type="text"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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
                value={stock}
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
                value={price}
                onChange={(e) => setprice(e.target.value)}
                placeholder="Price"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="priceAfterDiscount" className="block mb-2">
                priceAfterDiscount :
              </label>
              <input
                type="number"
                id="priceAfterDiscount"
                name="priceAfterDiscount"
                value={priceAfterDiscount}
                onChange={(e) => setPriceAfterDiscount(e.target.value)}
                placeholder="Price After Discount"
                className="w-full p-2 dark:bg-gray-800 font-semibold border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block mb-2">
                category_id :
              </label>
              <input
                type="text"
                id="category_id"
                name="category_id"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Category Id"
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
                value={description}
                onChange={(e) => setdescription(e.target.value)}
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

            {/* <div className="w-full">
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
          </div> */}
            <div>
              <button
                type="submit"
                className="bg-primary text-white py-3 px-16 font-semibold rounded">
                Edit Product
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default EditProductsPage
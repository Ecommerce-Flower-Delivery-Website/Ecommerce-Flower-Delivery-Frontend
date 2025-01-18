import { useEffect, useState } from "react";
import { api } from "../../../../lib/ajax/api";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

export interface Product {
  _id: number;
  title: string;
}

export interface Accessory {
  _id: number;
  title: string;
  image: string | File;
  stock: number;
  description: string;
  price: number;
  products: number[]; // Array of selected product IDs
}

interface AddPopupProps {
  setAccessories: React.Dispatch<React.SetStateAction<Accessory[]>>;
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  newAccessory: Accessory;
  setNewAccessory: React.Dispatch<React.SetStateAction<Accessory>>;
}

const AddPopup: React.FC<AddPopupProps> = ({
  setAccessories,
  setPopupVisible,
  newAccessory,
  setNewAccessory,
}) => {
  const [products, setProducts] = useState<Product[]>([]); // List of products
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]); // Selected product IDs

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("http://localhost:3000/api/v1/product");
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddAccessory = async () => {
    if (!newAccessory.title || !newAccessory.image) {
      alert("Title and Image are required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newAccessory.title);
      formData.append(
        "image",
        newAccessory.image instanceof File ? newAccessory.image : ""
      );
      formData.append("stock", newAccessory.stock.toString());
      formData.append("description", newAccessory.description);
      formData.append("price", newAccessory.price.toString());
      formData.append("products", JSON.stringify(selectedProducts)); // Add selected products

      const response = await api.post(
        "http://localhost:3000/api/v1/accessory",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const addedAccessory = response.data;

      setAccessories((prev) => [...prev, addedAccessory]);
      setPopupVisible(false);
      setNewAccessory({
        _id: 0,
        title: "",
        image: "",
        stock: 0,
        description: "",
        price: 0,
        products: [],
      });
      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      console.error("Error adding accessory:", error);
      alert("Failed to add accessory. Please try again.");
    }
  };

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-4">Add New Accessory</h2>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            value={newAccessory.title}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, title: e.target.value })
            }
          />

          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setNewAccessory({ ...newAccessory, image: file });
              }
            }}
            accept="image/*"
            placeholder="Select Image"
          />

          <Input
            placeholder="Stock"
            type="number"
            value={newAccessory.stock}
            onChange={(e) =>
              setNewAccessory({
                ...newAccessory,
                stock: parseInt(e.target.value) || 0,
              })
            }
          />

          <Input
            placeholder="Description"
            value={newAccessory.description}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, description: e.target.value })
            }
          />

          <Input
            placeholder="Price"
            type="number"
            value={newAccessory.price}
            onChange={(e) =>
              setNewAccessory({
                ...newAccessory,
                price: parseFloat(e.target.value) || 0,
              })
            }
          />

          {/* Multi-select dropdown */}
          <div>
            <label className="block font-medium mb-2">Select Products</label>
            <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
              {products?.map((product) => (
                <label
                  key={product._id}
                  className="flex items-center gap-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleProductSelection(product._id)}
                  />
                  {product.title}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setPopupVisible(false);
                setNewAccessory({
                  _id: 0,
                  title: "",
                  image: "",
                  stock: 0,
                  description: "",
                  price: 0,
                  products: [],
                });
                setSelectedProducts([]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddAccessory}>Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPopup;

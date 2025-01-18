import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../../components/card";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { api } from "../../../../lib/ajax/api";
import { handleApiError } from "../../../../lib/utils";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  title: string;
}

interface EditPopupProps {
  accessory: {
    _id: number;
    title: string;
    imageFiles: File[];
    stock: number;
    description: string;
    price: number;
    productIds: string[];
  };
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateAccessory: (updatedAccessory: any) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({
  accessory,
  setPopupVisible,
  updateAccessory,
}) => {
  const [updatedAccessory, setUpdatedAccessory] = useState({
    ...accessory,
    imageFiles: [] as File[],
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setUpdatedAccessory({
      ...accessory,
      imageFiles: [] as File[],
    });
    const fetchProducts = async () => {
      try {
        const response = await api.get("http://localhost:3000/api/v1/product");
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [accessory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAccessory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUpdatedAccessory((prev) => ({
        ...prev,
        imageFiles: Array.from(e.target.files),
      }));
    }
  };

  const handleProductSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductIds = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setUpdatedAccessory((prev) => ({
      ...prev,
      products_array: selectedProductIds,
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", updatedAccessory.title);
      formData.append("stock", updatedAccessory.stock.toString());
      formData.append("description", updatedAccessory.description);
      formData.append("price", updatedAccessory.price.toString());

      updatedAccessory.imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      updatedAccessory.productIds.forEach((productId) => {
        formData.append("products", productId);
      });

      const response = await api.put(
        `http://localhost:3000/api/v1/accessory/${updatedAccessory._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error updating accessory");
      }

      toast.success("Accessory updated successfully!");
      updateAccessory(response.data);
      setPopupVisible(false);
    } catch (error) {
      handleApiError(error);
      console.error("Error saving accessory:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-96">
        <CardHeader className="text-xl font-bold">Edit Accessory</CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              name="title"
              value={updatedAccessory.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <Input
              name="stock"
              type="number"
              value={updatedAccessory.stock}
              onChange={handleInputChange}
              placeholder="Stock"
            />
            <Input
              name="description"
              value={updatedAccessory.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <Input
              name="price"
              type="number"
              value={updatedAccessory.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <label className="block">
              <span className="text-gray-700">Upload Images</span>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Select Products</span>
              <select
                name="productIds"
                value={updatedAccessory.productIds}
                onChange={handleProductSelection}
                className="w-full text-black rounded border px-3 py-2"
                multiple
              >
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPopupVisible(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPopup;

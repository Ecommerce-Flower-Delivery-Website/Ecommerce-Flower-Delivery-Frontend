import React, { useRef, useState } from "react";
import axios from "axios";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { toast } from "react-toastify";

export interface Accessory {
  _id: number;
  title: string;
  image: File;
  stock: string;
  description: string;
  price: string;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setNewAccessory({ ...newAccessory, image: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddAccessory = async () => {
    if (newAccessory.title && newAccessory.image) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/accessory",
          newAccessory
        );

        const addedAccessory = response.data;
        setAccessories((prev) => [...prev, addedAccessory]);
        setPopupVisible(false);
        setNewAccessory({
          _id: 0,
          title: "",
          image: "",
          stock: "0",
          description: "",
          price: "0",
        });
        setPreviewImage(null);
        toast.success("deleted successfully");
      } catch (error) {
        console.error("Error adding accessory:", error);
        alert("Failed to add accessory. Please try again.");
      }
    } else {
      alert("Please fill in all required fields, including the image.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-900">
        <h2 className="text-xl font-semibold mb-3">Add New Accessory</h2>
        <div className="flex flex-col gap-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Title
            </label>
            <Input
              placeholder="Title"
              value={newAccessory.title}
              onChange={(e) =>
                setNewAccessory({ ...newAccessory, title: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="image" className="block mb-1">
              Image
            </label>
            <button
              type="button"
              className="flex p-4 border bg-white border-dashed dark:border-white border-gray-300 border-2 w-full dark:bg-gray-800 items-center justify-center rounded"
              onClick={handleFileInputClick}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Selected Preview"
                  className="w-full max-h-[150px] object-cover rounded-md"
                />
              ) : (
                <img src="/assets/images/UploadIcon.png" alt="Upload Icon" />
              )}
              <input
                ref={fileInputRef}
                className="sr-only"
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
              />
            </button>
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Stock
            </label>
            <Input
              placeholder="Stock"
              type="text"
              value={newAccessory.stock}
              onChange={(e) =>
                setNewAccessory({
                  ...newAccessory,
                  stock: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <Input
              placeholder="Description"
              value={newAccessory.description}
              onChange={(e) =>
                setNewAccessory({
                  ...newAccessory,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Price
            </label>
            <Input
              placeholder="Price"
              type="text"
              value={newAccessory.price}
              onChange={(e) =>
                setNewAccessory({
                  ...newAccessory,
                  price: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPopupVisible(false)}>
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

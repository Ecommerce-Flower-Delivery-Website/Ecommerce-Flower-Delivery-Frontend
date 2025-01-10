import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../../components/card";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { api } from "../../../../lib/ajax/api";
import { handleApiError } from "../../../../lib/utils";
import { toast } from "react-toastify";

interface EditPopupProps {
  accessory: {
    _id: number;
    title: string;
    image: string;
    stock: number;
    description: string;
    price: number;
  };
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  updateAccessory: (updatedAccessory: any) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({
  accessory,
  setPopupVisible,
  updateAccessory,
}) => {
  const [updatedAccessory, setUpdatedAccessory] = useState(accessory);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setUpdatedAccessory(accessory);
  }, [accessory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAccessory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("title", updatedAccessory.title);
    formData.append("description", updatedAccessory.description);
    formData.append("price", updatedAccessory.price.toString());
    formData.append("stock", updatedAccessory.stock.toString());

    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", updatedAccessory.image); // Send the existing image if no new one is selected
    }

    try {
      const response = await api.put(
        `http://localhost:3000/api/v1/accessory/${updatedAccessory._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.status !== 200) {
        throw new Error("Error updating accessory");
      }

      // If successful, update the accessory in the parent component
      toast.success("updated successfully");
      updateAccessory(updatedAccessory);
      setPopupVisible(false); // Close the popup
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
              onChange={handleChange}
              placeholder="Title"
            />
            {/* File input for image */}
            <Input
              name="image"
              type="file"
              onChange={handleImageChange}
              placeholder="Select Image"
            />
            <Input
              name="stock"
              type="number"
              value={updatedAccessory.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
            <Input
              name="description"
              value={updatedAccessory.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <Input
              name="price"
              type="number"
              value={updatedAccessory.price}
              onChange={handleChange}
              placeholder="Price"
            />
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

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/button";
import { Card, CardContent, CardHeader } from "../../../components/card";
import { Input } from "../../../components/input";

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
            <Input
              name="image"
              value={updatedAccessory.image}
              onChange={handleChange}
              placeholder="Image URL"
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
            <Button onClick={updateAccessory}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPopup;

import { api } from "../../../../lib/ajax/api";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

export interface Accessory {
  _id: number;
  title: string;
  image: File | string;
  stock: number;
  description: string;
  price: number;
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
  const handleAddAccessory = async () => {
    if (newAccessory.title && newAccessory.image) {
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
        });
      } catch (error) {
        console.error("Error adding accessory:", error);
        alert("Failed to add accessory. Please try again.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewAccessory({ ...newAccessory, image: file });
    }
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
            onChange={handleFileChange}
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
          <div className="flex justify-end gap-4">
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

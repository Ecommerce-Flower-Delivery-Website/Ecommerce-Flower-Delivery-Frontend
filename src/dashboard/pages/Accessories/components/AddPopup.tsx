import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

interface Accessory {
  _id: number;
  title: string;
  image: string;
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
  const handleAddAccessory = () => {
    if (newAccessory.title && newAccessory.image) {
      setAccessories((prev) => [...prev, { ...newAccessory, _id: Date.now() }]);
      setPopupVisible(false);
      setNewAccessory({
        _id: 0,
        title: "",
        image: "",
        stock: 0,
        description: "",
        price: 0,
      });
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
            placeholder="Image URL"
            value={newAccessory.image}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, image: e.target.value })
            }
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

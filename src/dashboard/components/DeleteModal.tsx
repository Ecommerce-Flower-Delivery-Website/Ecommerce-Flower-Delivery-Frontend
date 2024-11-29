interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 px-6 z-50 flex justify-center items-center deleteModale bg-black bg-opacity-50 backdrop-blur-[10px]">
      <div
        className="bg-gray-500 lg:w-[50%] lg:h-[50%] md:w-[75%] md:h-[50%] w-[100%] h-[50%] px-3 flex justify-center items-center flex-col"
        style={{
          borderRadius: "20px",
          boxShadow: "2px 5px 10px 0px rgba(0, 0, 0, 0.1)",
        }}>
        <h1 className="font-semibold mb-20" style={{ fontSize: "22px" }}>
          Are you sure you want to delete the product?
        </h1>
        <div className="flex gap-10">
          <button
            onClick={onConfirm}
            className="md:w-[150px] md:h-[50px] w-[90px] h-[50px] bg-primary md:text-[32px] text-[20px] text-white font-medium text-center rounded">
            YES
          </button>
          <button
            onClick={onClose}
            className="md:w-[150px] md:h-[50px] w-[90px] h-[50px] bg-primary md:text-[32px] text-[20px] text-white font-medium text-center rounded">
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

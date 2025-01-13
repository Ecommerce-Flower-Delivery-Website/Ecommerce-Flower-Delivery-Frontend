interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onRemove: (id: number) => void;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  onRemove,
}: CartItemProps) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 p-4 border-b border-black">
      <div className="relative border size-[100px] border-black overflow-hidden">
        <img
          src={image}
          alt={name}
          className="object-cover absolute inset-0 w-full h-full transition-transform hover:scale-110"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm">Quantity ({quantity})</p>
        <p className="font-medium">${price.toFixed(2)}</p>
        <button
          onClick={() => onRemove(id)}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

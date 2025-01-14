const relatedProducts = [
  {
    id: 1,
    name: "Rattan Grapefruit",
    price: "$68",
    image:
      "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=500&q=80",
  },
  {
    id: 2,
    name: "Lime & Matcha",
    price: "$65",
    image:
      "https://images.unsplash.com/photo-1509719662282-b82bed65c427?w=500&q=80",
  },
  {
    id: 3,
    name: "Cedar & Lavender",
    price: "$65",
    image:
      "https://images.unsplash.com/photo-1599748999938-3b5bf0c3c544?w=500&q=80",
  },
  {
    id: 4,
    name: "Ocean Mist",
    price: "$55",
    image:
      "https://images.unsplash.com/photo-1602521879205-40c1f72d3e88?w=500&q=80",
  },
];

export function RelatedProducts() {
  return (
    <div>
      <div className="text-center p-4 md:p-8 border-y border-black">
        <h2 className="text-xl md:text-2xl">You may also like...</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {relatedProducts.map((product, index) => (
          <a
            href="#"
            key={product.id}
            className={`block group border-t sm:first:border-t-0 sm:nth-2:border-t-0 md:border-t-0 ${
              index < relatedProducts.length - 1
                ? "md:border-r border-black"
                : ""
            }`}
          >
            <div className="aspect-square relative">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover absolute inset-0 w-full h-full"
              />
            </div>
            <div className="text-center p-4">
              <h3 className="text-base">{product.name}</h3>
              <p className="text-sm text-gray-600">price {product.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

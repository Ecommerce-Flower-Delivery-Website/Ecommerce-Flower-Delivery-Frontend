import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";

const dummyProducts = [
  {
    id: 1,
    name: "Rose Bouquet",
    category: "Flowers",
    price: 20,
    stock: 15,
    description: "A beautiful bouquet of fresh roses.",
  },
  {
    id: 2,
    name: "Tulip Vase",
    category: "Decor",
    price: 35,
    stock: 10,
    description: "A charming vase filled with vibrant tulips.",
  },
  {
    id: 3,
    name: "Sunflower Seeds",
    category: "Gardening",
    price: 10,
    stock: 50,
    description: "Quality sunflower seeds for your garden.",
  },
  {
    id: 4,
    name: "Lily Bouquet",
    category: "Flowers",
    price: 25,
    stock: 20,
    description: "A delightful bouquet of fragrant lilies.",
  },
  {
    id: 5,
    name: "Orchid Plant",
    category: "Indoor Plants",
    price: 50,
    stock: 5,
    description: "A sophisticated orchid plant to adorn your home.",
  },
  {
    id: 6,
    name: "Cactus Garden",
    category: "Indoor Plants",
    price: 40,
    stock: 8,
    description: "A collection of small, easy-care cacti.",
  },
  {
    id: 7,
    name: "Daisy Basket",
    category: "Flowers",
    price: 18,
    stock: 12,
    description: "A cheerful basket of daisies perfect for any occasion.",
  },
  {
    id: 8,
    name: "Bonsai Tree",
    category: "Indoor Plants",
    price: 75,
    stock: 3,
    description: "A carefully cultivated bonsai tree for decor and serenity.",
  },
  {
    id: 9,
    name: "Garden Tool Set",
    category: "Gardening",
    price: 30,
    stock: 25,
    description: "A handy set of tools for all your gardening needs.",
  },
  {
    id: 10,
    name: "Lavender Sachet",
    category: "Aromatherapy",
    price: 12,
    stock: 40,
    description: "A calming lavender sachet for relaxation and sleep.",
  },
  {
    id: 11,
    name: "Hanging Fern",
    category: "Indoor Plants",
    price: 60,
    stock: 6,
    description: "A lush hanging fern to enhance indoor spaces.",
  },
  {
    id: 12,
    name: "Peony Vase",
    category: "Decor",
    price: 45,
    stock: 9,
    description: "An elegant vase of peonies for your living room.",
  },
  {
    id: 13,
    name: "Succulent Trio",
    category: "Indoor Plants",
    price: 25,
    stock: 14,
    description: "A set of three cute succulents for a minimalist touch.",
  },
];


const ProductsTable = () => {
  const products = dummyProducts;
  const naviagte = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [show, setshow] = useState(false);

  const handleRowClick = (rowData: (typeof dummyProducts)[0]) => {
    console.log("Row clicked:", rowData);
    naviagte(`/dashboard/products/product/${rowData.id}`);
  };

  const deleteProduct = (e: React.MouseEvent, id: number) => {
   e.stopPropagation();
   setshow(true);
  };
  const onConfirm = () => {
    console.log('hhhh');
  }
  const onClose = () => {
    setshow(false);
  }
  const editProducts = (e: React.MouseEvent, id: number) => {
   e.stopPropagation();
   naviagte("/dashboard/products/edit");
  };
  

  const columns: ColumnDef<(typeof dummyProducts)[number]>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => row.getValue("category"),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.getValue("price").toFixed(2)}`,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => `${row.getValue("description")}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.getValue("stock"),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"
            onClick={(e) => editProducts(e,row.original.id)}>
            <Edit2 size={15} />
          </button>
          <button
            className="text-red-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"
            onClick={(e) => deleteProduct(e, row.original.id)}>
            <Trash2 size={15} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="p-4 dark:bg-[#020817] shadow-lg dark:text-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 w-full rounded dark:bg-gray-800 border border-gray-600"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
          />
        </div>
        <div className="w-full overflow-auto">
          <table className="w-full border-collapse border border-gray-600 text-left">
            <thead className="dark:bg-gray-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-2 border hover:underline border-gray-600 cursor-pointer"
                      onClick={() =>
                        header.column.toggleSorting(
                          header.column.getIsSorted() === "asc"
                        )
                      }>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "asc"
                          ? " ▲"
                          : " ▼"
                        : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleRowClick(row.original)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border border-gray-600">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {show && <DeleteModal onClose={onClose} onConfirm={onConfirm} />}
    </>
  );
};

export default ProductsTable;

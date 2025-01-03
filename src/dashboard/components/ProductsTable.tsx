import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import {
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch } from "../../store/store";
import { deleteProduct } from "../../store/slices/productSlice";

const dummyProducts =  [
    {
      _id: "1",
      title: "Gaming Laptop Pro",
      price: 1299.99,
      stock: 15,
      description:
        "High-performance gaming laptop with RTX 3080, 32GB RAM, and 1TB SSD",
      accessory_id: 1,
      created_at: "2024-01-01T00:00:00.000Z",
      updated_at: "2024-01-01T00:00:00.000Z",
    },
    {
      _id: "2",
      title: "Wireless Gaming Mouse",
      price: 79.99,
      stock: 50,
      description: "Ultra-responsive wireless gaming mouse with RGB lighting",
      accessory_id: 2,
      created_at: "2024-01-02T00:00:00.000Z",
      updated_at: "2024-01-02T00:00:00.000Z",
    },
    {
      _id: "3",
      title: "Mechanical Keyboard",
      price: 149.99,
      stock: 30,
      description: "Premium mechanical keyboard with Cherry MX switches",
      accessory_id: 3,
      created_at: "2024-01-03T00:00:00.000Z",
      updated_at: "2024-01-03T00:00:00.000Z",
    },
    {
      _id: "4",
      title: "4K Gaming Monitor",
      price: 499.99,
      stock: 20,
      description: "27-inch 4K gaming monitor with 144Hz refresh rate",
      accessory_id: 4,
      created_at: "2024-01-04T00:00:00.000Z",
      updated_at: "2024-01-04T00:00:00.000Z",
    },
    {
      _id: "5",
      title: "Gaming Headset",
      price: 129.99,
      stock: 40,
      description:
        "Surround sound gaming headset with noise-cancelling microphone",
      accessory_id: 5,
      created_at: "2024-01-05T00:00:00.000Z",
      updated_at: "2024-01-05T00:00:00.000Z",
    },
    {
      _id: "6",
      title: "Gaming Chair",
      price: 299.99,
      stock: 25,
      description:
        "Ergonomic gaming chair with lumbar support and adjustable armrests",
      accessory_id: 6,
      created_at: "2024-01-06T00:00:00.000Z",
      updated_at: "2024-01-06T00:00:00.000Z",
    },
    {
      _id: "7",
      title: "RGB Mousepad",
      price: 39.99,
      stock: 60,
      description: "Extended RGB mousepad with customizable lighting effects",
      accessory_id: 7,
      created_at: "2024-01-07T00:00:00.000Z",
      updated_at: "2024-01-07T00:00:00.000Z",
    },
    {
      _id: "8",
      title: "Webcam Pro",
      price: 89.99,
      stock: 35,
      description: "1080p webcam with auto-focus and low-light correction",
      accessory_id: 8,
      created_at: "2024-01-08T00:00:00.000Z",
      updated_at: "2024-01-08T00:00:00.000Z",
    },
    {
      _id: "9",
      title: "USB Microphone",
      price: 119.99,
      stock: 45,
      description: "Professional USB condenser microphone for streaming",
      accessory_id: 9,
      created_at: "2024-01-09T00:00:00.000Z",
      updated_at: "2024-01-09T00:00:00.000Z",
    },
    {
      _id: "10",
      title: "Graphics Card",
      price: 699.99,
      stock: 10,
      description: "High-end graphics card for ultimate gaming performance",
      accessory_id: 10,
      created_at: "2024-01-10T00:00:00.000Z",
      updated_at: "2024-01-10T00:00:00.000Z",
    },
    {
      _id: "11",
      title: "SSD Drive",
      price: 159.99,
      stock: 55,
      description: "1TB NVMe SSD for ultra-fast storage solutions",
      accessory_id: 11,
      created_at: "2024-01-11T00:00:00.000Z",
      updated_at: "2024-01-11T00:00:00.000Z",
    },
    {
      _id: "12",
      title: "Gaming Console",
      price: 499.99,
      stock: 18,
      description: "Next-gen gaming console with 4K gaming capabilities",
      accessory_id: 12,
      created_at: "2024-01-12T00:00:00.000Z",
      updated_at: "2024-01-12T00:00:00.000Z",
    },
    {
      _id: "13",
      title: "Streaming Deck",
      price: 149.99,
      stock: 28,
      description: "Customizable streaming control deck with LCD keys",
      accessory_id: 13,
      created_at: "2024-01-13T00:00:00.000Z",
      updated_at: "2024-01-13T00:00:00.000Z",
    },
    {
      _id: "14",
      title: "Cable Management Kit",
      price: 29.99,
      stock: 70,
      description: "Complete cable management solution for clean setup",
      accessory_id: 14,
      created_at: "2024-01-14T00:00:00.000Z",
      updated_at: "2024-01-14T00:00:00.000Z",
    },
    {
      _id: "15",
      title: "Capture Card",
      price: 159.99,
      stock: 22,
      description: "4K60 capture card for streaming and recording",
      accessory_id: 15,
      created_at: "2024-01-15T00:00:00.000Z",
      updated_at: "2024-01-15T00:00:00.000Z",
    },
  ];


interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  category_id?: number;
  accessory_id: number;
  created_at: string;
  updated_at: string;
}


interface ProductsTableProps {
  productsArray: Product[];
  fetchData: () => void;
}


const ProductsTable: React.FC<ProductsTableProps> = ({
  productsArray,
  fetchData,
}) => {
  const products = productsArray?.products || [];

  const naviagte = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [show, setshow] = useState(false);
  const [id, setid] = useState<string>("");
  const dispatch = useReduxDispatch();

  // Pagination state
   const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
     pageIndex: 0,
     pageSize: 2,
   });

   const pagination = {
     pageIndex,
     pageSize,
   };

  const handleRowClick = (rowData: (typeof productsArray)[0]) => {
    console.log("Row clicked:", rowData);
    naviagte(`/dashboard/products/product/${rowData._id}`);
  };

  const deleteProductfunc = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setid(id);
    setshow(true);
  };


  const onConfirm = async (id: string) => {
    await dispatch(deleteProduct(id));
    fetchData();
    setshow(false);
  };

  const onClose = () => {
    setshow(false);
  };

  const editProducts = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    naviagte(`/dashboard/products/edit/${id}`);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  const columns: ColumnDef<(typeof productsArray)[number]>[] = [
    {
      accessorKey: "title",
      header: "Name",
      cell: ({ row }) => row.getValue("title"),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.getValue("price").toFixed(2)}`,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => row.getValue("stock"),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => truncateText(row.getValue("description"), 40),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            className="text-blue-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"

            onClick={(e) => editProducts(e, row.original._id)}>
            <Edit2 size={15} />
          </button>
          <button
            className="text-red-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"

            onClick={(e) => deleteProductfunc(e, row.original._id)}>
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
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    manualPagination: false,
  });

  return (
    <>
      <div className="p-4 dark:bg-[#020817] shadow-lg dark:text-white rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="p-2 w-full rounded dark:bg-gray-800 border border-gray-600"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />
        </div>
        <div className="w-full overflow-auto">

          {products.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 p-4">
              No Products Found
            </div>
          ) : table.getRowModel().rows.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 p-4">
              No Products Found
            </div>
          ) : (
            <>
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
                        <td
                          key={cell.id}
                          className="p-2 border border-gray-600">
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

              {/* Pagination Controls */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  {/* <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="p-2 bg-transparent border border-gray-600 rounded dark:bg-gray-800">
                    {[10, 20, 30, 40, 50].map((size) => (
                      <option key={size} value={size}>
                        Show {size}
                      </option>
                    ))}
                  </select> */}
                  <span className="text-sm">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    className="p-1 border border-gray-600 rounded dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}>
                    <ChevronsLeft size={20} />
                  </button>
                  <button
                    className="p-1 border border-gray-600 rounded dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    className="p-1 border border-gray-600 rounded dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    <ChevronRight size={20} />
                  </button>
                  <button
                    className="p-1 border border-gray-600 rounded dark:hover:bg-gray-800 disabled:opacity-50"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}>
                    <ChevronsRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {show && <DeleteModal onClose={onClose} onConfirm={onConfirm} id={id} />}
    </>
  );
};

export default ProductsTable;

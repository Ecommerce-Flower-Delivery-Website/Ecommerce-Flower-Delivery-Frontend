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
    }
  ];
interface Product {
  priceAfterDiscount:string;
  discount?: string;
  quantity: string;
  _id: string;
  title: string;
  price: number;
  stock: number;
  description: string;
  image?: string;
  category_id: number;
  accessory_id?: number;
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
      accessorKey: "category_id",
      header: "category id",
      cell: ({ row }) => row.getValue("category_id"),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => row.getValue("title"),
      filterFn: "includesString", 
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => row.getValue("quantity"),
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
    }, {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.getValue("price")}`,
    },
    {
      accessorKey: "priceAfterDiscount",
      header: "Price After Discount",
      cell: ({ row }) => `$${row.getValue("priceAfterDiscount")}`,
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

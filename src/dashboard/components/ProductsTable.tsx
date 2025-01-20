import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { useReduxDispatch } from "../../store/store";
import { deleteProduct } from "../../store/slices/productSlice";

import DeleteModal from "./DeleteModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Input } from "./input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Card, CardContent, CardHeader } from "./card";

interface Product {
  priceAfterDiscount: string;
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
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState<string>("");

  // Pagination state
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const handleRowClick = (rowData: Product) => {
    navigate(`/dashboard/products/product/${rowData._id}`);
  };

  const deleteProductFunc = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setId(id);
    setShow(true);
  };

  const onConfirm = async (id: string) => {
    await dispatch(deleteProduct(id));
    fetchData();
    setShow(false);
  };

  const editProduct = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/dashboard/products/edit/${id}`);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    return truncated.substring(0, truncated.lastIndexOf(" ")) + "...";
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "title",
      header: "Title",
      filterFn: "includesString",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => truncateText(row.getValue("description"), 40),
    },
    {
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
        <div className="flex gap-2">
          <button
            className="p-2 rounded-full text-blue-500 hover:bg-primary"
            onClick={(e) => editProduct(e, row.original._id)}>
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="p-2 rounded-full text-red-500 hover:bg-primary"
            onClick={(e) => deleteProductFunc(e, row.original._id)}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const pagination = {
    pageIndex,
    pageSize,
  };

  const table = useReactTable({
    data: productsArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    pageCount: Math.ceil(productsArray.length / pageSize),
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Show</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) =>
                setPagination((prev) => ({
                  ...prev,
                  pageSize: Number(value),
                  pageIndex: 0,
                }))
              }>
              <SelectTrigger className="w-20">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 15, 20, 25].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>

          <Input
            placeholder="Search by title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </CardHeader>

      <CardContent>
        {productsArray.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No Products Found
          </div>
        ) : (
          <>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
                          key={header.id}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                          onClick={() =>
                            header.column.toggleSorting(
                              header.column.getIsSorted() === "asc"
                            )
                          }>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() && (
                            <span className="ml-1">
                              {header.column.getIsSorted() === "asc"
                                ? "▲"
                                : "▼"}
                            </span>
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => handleRowClick(row.original)}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => table.previousPage()}
                      className={
                        !table.getCanPreviousPage()
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: table.getPageCount() }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => table.setPageIndex(i)}
                        isActive={table.getState().pagination.pageIndex === i}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => table.nextPage()}
                      className={
                        !table.getCanNextPage()
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        )}
      </CardContent>

      {show && (
        <DeleteModal
          onClose={() => setShow(false)}
          onConfirm={onConfirm}
          id={id}
        />
      )}
    </Card>
  );
};

export default ProductsTable;

import React, { useEffect, useState } from "react";
import {
  useReduxDispatch,
  useReduxSelector,
  RootState,
} from "../../../store/store";
import {
  getCategories,
  TCategoryFromBackEnd,
} from "../../../store/slices/categorySlice";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import { Card, CardContent, CardHeader } from "../../components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import * as CategoryForms from "./components/CategoryForms";
import { Input } from "../../components/input";

const CategoryPage = () => {
  const { categories, loading, pagination } = useReduxSelector(
    (state: RootState) => state.category
  );
  const dispatch = useReduxDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getCategories({ page: 1, limit: rowsPerPage }));
  }, [dispatch, rowsPerPage]);

  const totalPages = pagination.totalPages;

  const columns: ColumnDef<TCategoryFromBackEnd, unknown>[] = [
    {
      accessorKey: "_id",
      header: "ID",
    },
    {
      accessorKey: "title",
      header: "Title",
      filterFn: "includesString", // Ensure the column supports filtering
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <img
              className="w-[100px] lg:h-full object-cover rounded-lg"
              src={`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${row.getValue(
                "image"
              )}`}
              alt={"category image"}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <div className="flex space-x-2">
            <CategoryForms.EditCategory category={category} />
            <CategoryForms.RemoveCategory categoryId={category._id} />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: categories,
    columns,
    state: { globalFilter: searchTerm },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchTerm,
  });

  const setCurrentPage = ({ page }: { page: number }) => {
    dispatch(getCategories({ page, limit: rowsPerPage }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <CardHeader className="flex items-end justify-end gap-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Show</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => setRowsPerPage(parseInt(value))}
            >
              <SelectTrigger className="w-[70px] bg-white dark:bg-gray-800">
                <SelectValue placeholder={rowsPerPage} />
              </SelectTrigger>
              <SelectContent>
                {[1, 10, 25, 50, 100].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 max-md:flex-wrap">
            <Input
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="max-w-sm dark:placeholder:text-white bg-white dark:bg-gray-800"
            />
            <CategoryForms.CreateCategory />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table className="table-auto border-collapse w-full mb-7">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-left px-4 py-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center px-4 py-2"
                >
                  No categories found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setCurrentPage({
                    page: Math.max(pagination.currentPage - 1, 1),
                  })
                }
                className={
                  pagination.currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => setCurrentPage({ page: i + 1 })}
                  isActive={pagination.currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage({
                    page: Math.min(pagination.currentPage + 1, totalPages),
                  })
                }
                className={
                  pagination.currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

export default CategoryPage;

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/card";
import { Input } from "../../components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import * as UserForms from "./components/user-forms";
import { useSelector } from "react-redux";
import { RootState, useReduxDispatch } from "../../../store/store";
import { getUsers } from "../../../store/slices/userSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { TUserFromBackend } from "../../../store/slices/userSlice";
import { Button } from "../../components/button";

export const UserPage = () => {
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useReduxDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns: ColumnDef<TUserFromBackend, unknown>[] = [
    {
      accessorKey: "name", // Changed "username" to "name"
      header: () => <span className="p-0 hover:bg-transparent">Name</span>,
    },
    {
      accessorKey: "email",
      header: () => <span className="p-0 hover:bg-transparent">Email</span>,
    },
    {
      accessorKey: "phone",
      header: () => <span className="p-0 hover:bg-transparent">Phone</span>,
    },
    {
      accessorKey: "isAdmin", // Field in your data
      header: "Admin Status",
      filterFn: (row, columnId, filterValue) => {
        if (filterValue === "") return true; // Show all rows if no filter is applied
        const cellValue = row.getValue<boolean>(columnId); // Get the actual value
        return cellValue === (filterValue === "true"); // Compare boolean values
      },
      cell: ({ row }) => {
        const isAdmin = row.getValue("isAdmin") as boolean;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs ${
              isAdmin
                ? "bg-green-500/25 text-green-500" // Style for admin
                : "" // Style for non-admin
            }`}
          >
            {isAdmin ? "Admin" : "User"}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <span>
            <UserForms.Edit user={user} />
            <UserForms.Remove userId={user._id} />
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <CardHeader className="flex items-end justify-end gap-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-1 items-center justify-end gap-2 max-md:flex-wrap">
            <Input
              placeholder="Search by name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm dark:placeholder:text-white bg-white dark:bg-gray-800"
            />
            <Select
              value={
                (table.getColumn("isAdmin")?.getFilterValue() as string) ??
                "all"
              }
              onValueChange={(value) =>
                table
                  .getColumn("isAdmin")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800">
                <SelectValue
                  placeholder="Filter by Admin Status"
                  className="text-black dark:text-white"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="true">Admin</SelectItem>
                <SelectItem value="false">User</SelectItem>
              </SelectContent>
            </Select>
            <UserForms.Create /> {/* Add User button */}
          </div>
        </div>
      </CardHeader>

      <CardContent className="rounded-md min-h-14">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={
                  !table.getCanPreviousPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
              {[...Array.from({ length: table.getPageCount() })].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(i)} // Use setPageIndex to navigate to the page
                    isActive={table.getState().pagination.pageIndex === i} // Check if the page is active
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={() => table.nextPage()}
                className={
                  !table.getCanNextPage()
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

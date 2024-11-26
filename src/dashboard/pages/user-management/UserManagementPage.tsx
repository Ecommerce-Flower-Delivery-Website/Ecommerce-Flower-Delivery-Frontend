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
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";

const dummyUsers = [
  {
    _id: "1",
    username: "JohnDoe",
    email: "john@example.com",
    phone: "+0963 9490234897",
    subscription: "premium",
  },
  {
    _id: "2",
    username: "JaneSmith",
    email: "jane@example.com",
    phone: "+0963 9490234897",
    subscription: "none",
  },
  {
    _id: "3",
    username: "AliceBrown",
    email: "alice@example.com",
    phone: "+0963 9490234897",
    subscription: "none",
  },
  {
    _id: "4",
    username: "BobJones",
    email: "bob@example.com",
    phone: "+0963 9490234897",
    subscription: "none",
  },
];

export const UserManagementPage = () => {
  const users = dummyUsers;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const columns: ColumnDef<(typeof users)[number]>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Name
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Email
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Points
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "subscription",
      header: "subscription",
      filterFn: (row, columnId, filterValue) => {
        const cellValue = row.getValue<string>(columnId);
        return cellValue === filterValue;
      },
      cell: ({ row }) => {
        const status = row.getValue("subscription") as string;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs ${
              status === "premium"
                ? "bg-purple-500/25  text-purple-500"
                : "bg-amber-400/25 text-amber-400"
            }`}
          >
            {status}
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
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageSize: rowsPerPage,
        pageIndex: currentPage - 1,
      },
    },
  });

  return (
    <Card>
      <CardHeader className="flex items-end justify-end gap-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-1 items-center justify-end gap-2 max-md:flex-wrap">
            <Input
              placeholder="Search by name..."
              value={
                (table.getColumn("username")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="max-w-sm bg-white dark:bg-gray-800"
            />
            <Select
              value={
                (table.getColumn("subscription")?.getFilterValue() as string) ??
                "all"
              }
              onValueChange={(value) =>
                table
                  .getColumn("subscription")
                  ?.setFilterValue(value === "all" ? "" : value)
              }
            >
              <SelectTrigger className="w-[200px]  bg-white dark:bg-gray-800">
                <SelectValue placeholder="Filter by subscription" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subscription</SelectItem>
                <SelectItem value="premium">premium</SelectItem>
                <SelectItem value="none">none</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="rounded-md">
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
        <div className="flex items-center justify-between py-4">
          <div className="text-nowrap text-sm text-muted-foreground">
            Showing{" "}
            {table.getRowModel().rows?.length + (currentPage - 1) * rowsPerPage}
            of {users.length} entries
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

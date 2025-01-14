import { NavLink, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { deleteSubsciblePlan, getSubscribePlans } from "../../../store/slices/subscribePlansSlice";

import {
  RootState,
  useReduxDispatch,
  useReduxSelector,
} from "../../../store/store";
import { Card, CardContent, CardHeader } from "../../components/card";
import { Input } from "../../components/input";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/pagination";
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
import { Edit2, Eye, Trash2 } from "lucide-react";
import { SubscribePlan } from "../../../types/subscribePlansType";
import DeleteModalPlan from "../../components/SubscribePlans/DeleteModalPlan";

const SubscribePlans = () => {
  const { subscribePlansData, loading } = useReduxSelector(
    (state: RootState) => state.subscribePlans
  );
  const [show, setshow] = useState(false);
  const [id, setid] = useState<string>("");
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const totalPages = subscribePlansData?.pagination?.totalPages;
  const setCurrentPage = ({ page }: { page: number }) => {
    dispatch(getSubscribePlans({ page, limit: rowsPerPage }));
  };
  useEffect(() => {
    dispatch(getSubscribePlans({ page: subscribePlansData?.pagination.currentPage, limit: rowsPerPage }));
  }, [dispatch, subscribePlansData?.pagination.currentPage, rowsPerPage]);

  const editProducts = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/dashboard/subscribe-plans/edit/${id}`);
  };

  const deleteSubscibePlanfunc = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setid(id);
    setshow(true);
  };
  
    const onConfirm = async (id: string) => {
      await dispatch(deleteSubsciblePlan(id));
      dispatch(getSubscribePlans({ page: subscribePlansData?.pagination.currentPage, limit: rowsPerPage }));
      setshow(false);
    };
  
    const onClose = () => {
      setshow(false);
    };

  const columns: ColumnDef<SubscribePlan, unknown>[] = [
{
        accessorKey: "title",
        header: "Name",
        cell: ({ row }) =>  <div className="text-center">{row.getValue("title")}</div> ,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const price = row.getValue("price");
            if (typeof price === 'string') {
                const numberPrice = parseFloat(price);
                if (!isNaN(numberPrice)) {
                    return <div className="text-center">${numberPrice.toFixed(2)}</div> ;
                }
              }
              return <div className="text-center">$0.00</div> 
        },
      },
      {
        accessorKey: "isFreeDelivery",
        header: "Free Delivery",
        cell: ({ row }) => {
            const isFree = row.getValue("isFreeDelivery");
            if (isFree==="1") {
            return <div className="text-center">yes</div>;
        }else return <div className="text-center">no</div>
        },
      },
      {
        accessorKey: "deliveryFrequency",
        header: "Delivery Frequency",
        cell: ({ row }) => <div className="text-center">{row.getValue("deliveryFrequency")}</div>,
      },
      {
        accessorKey: "deliveryCount",
        header: "Delivery Count",
        cell: ({ row }) => <div className="text-center">{row.getValue("deliveryCount")}</div>,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            return( <div className="text-center">
                <img
                className="w-[100px] lg:h-full object-cover rounded-lg"
                src={`${import.meta.env.VITE_PUBLIC_API_BASE_URL}${row.getValue("image")}`}
                alt={"Subscribe Plan"}
                />
                </div>
                )
        },
      },

      {
        accessorKey: "features",
        header: "Features",
        cell: ({ row }) => {
            const features = row.getValue("features");
            
            if (Array.isArray(features)) {
              return (
                <div className="text-center">
                  {features.join(', ').length > 50 ? 
                    `${features.slice(0, 47).join(',')}...` :
                    features.join(', ')
                  }
                </div>
              );
            }
            return <div className="text-center">_</div>; 
    }
},
    {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2 justify-center">
          <button
            className="text-green-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"

            onClick={(e) => editProducts(e, row.original._id)}>
            <Edit2 size={15} />
          </button>
          <button
            className="text-red-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"

            onClick={(e) => deleteSubscibePlanfunc(e, row.original._id)}>
            <Trash2 size={15} />
          </button>
          <button
            className="text-blue-500 dark:bg-gray-900 bg-gray-300 rounded-full p-2 dark:hover:bg-gray-800"

            onClick={()=>{navigate(`/dashboard/subscribe-plans/${row.original._id}`)}}>
            <Eye size={15} />
          </button>
        </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: subscribePlansData?.subscribePlans,
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
        pageIndex: subscribePlansData?.pagination.currentPage - 1,
      },
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
          <div className="flex justify-end">
            <NavLink
              to={"/dashboard/subscribe-plans/add"}
              className="bg-primary rounded p-4 font-bold mb-6">
              Add Subscribe Plan
            </NavLink>
        </div>

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
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">entries</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 max-md:flex-wrap">
            <Input
              placeholder="Search by name..."
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm dark:placeholder:text-white bg-white dark:bg-gray-800"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="rounded-md min-h-14">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
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
            {subscribePlansData?.subscribePlans?.length > 0 ? (
              table.getPrePaginationRowModel().rows?.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
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
            {table.getPrePaginationRowModel().rows?.length +
              (subscribePlansData?.pagination.currentPage - 1) * rowsPerPage}
            of {subscribePlansData?.pagination?.totalPlans} entries
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage({
                      page: Math.max(subscribePlansData?.pagination.currentPage - 1, 1),
                    })
                  }
                  className={
                    subscribePlansData?.pagination.currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
              {[...Array.from({ length: totalPages })].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage({ page: i + 1 })}
                    isActive={subscribePlansData?.pagination.currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage({
                      page: Math.min(subscribePlansData?.pagination.currentPage + 1, totalPages),
                    })
                  }
                  className={
                    subscribePlansData?.pagination.currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
      {show && <DeleteModalPlan onClose={onClose} onConfirm={onConfirm} id={id} />}

    </Card>
    </>

    
  );
};

export default SubscribePlans
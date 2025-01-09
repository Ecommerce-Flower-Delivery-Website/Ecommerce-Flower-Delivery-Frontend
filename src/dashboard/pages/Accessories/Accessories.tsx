import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp, Trash, Edit } from "lucide-react";
import { Button } from "../../components/button";
import { Card, CardContent, CardHeader } from "../../components/card";
import { Input } from "../../components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";
import AddPopup from "./components/AddPopup";
import EditPopup from "./components/EditPopup"; // Import the EditPopup component

interface Accessory {
  _id: number;
  title: string;
  image: string;
  stock: number;
  description: string;
  price: number;
}

export const Accessories: React.FC = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false); // Add state for EditPopup
  const [newAccessory, setNewAccessory] = useState<Accessory>({
    _id: 0,
    title: "",
    image: "",
    stock: 0,
    description: "",
    price: 0,
  });
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null); // Track selected accessory for editing
  
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/accessory?pageNumber=${currentPage}`
        );
        setAccessories(response.data.accessories);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, [currentPage, rowsPerPage]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/accessory/${id}`);
      setAccessories((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting accessory:", error);
    }
  };

  const handleEdit = (id: number) => {
    const accessoryToEdit = accessories.find((item) => item._id === id);
    if (accessoryToEdit) {
      setSelectedAccessory(accessoryToEdit);
      setEditPopupVisible(true); // Show the EditPopup
    }
  };

  const updateAccessory = (updatedAccessory: Accessory) => {
    setAccessories((prev) =>
      prev.map((item) =>
        item._id === updatedAccessory._id ? updatedAccessory : item
      )
    );
  };

  const columns: ColumnDef<Accessory>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Title
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.title}
          className="h-10 w-10 rounded-md object-cover"
        />
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Stock
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="relative group" title={row.original.description}>
          {row.original.description.length > 11
            ? `${row.original.description.substring(0, 11)}...`
            : row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Price
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => handleEdit(row.original._id)}>
            <Edit className="h-5 w-5 text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: accessories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-end gap-4 md:flex-row md:justify-between">
          <Input placeholder="Search by title..." className="max-w-md" />
          <Button variant="outline" onClick={() => setPopupVisible(true)}>
            Add New Accessory
          </Button>
        </CardHeader>
        <CardContent>
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
              {accessories.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
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
                  <TableCell colSpan={columns.length}>
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between py-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1 || totalPages === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 1}
            >
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
      {isPopupVisible && (
        <AddPopup
          setAccessories={setAccessories}
          setPopupVisible={setPopupVisible}
          newAccessory={newAccessory}
          setNewAccessory={setNewAccessory}
        />
      )}
      {isEditPopupVisible && selectedAccessory && (
        <EditPopup
          accessory={selectedAccessory}
          setPopupVisible={setEditPopupVisible}
          updateAccessory={updateAccessory}
        />
      )}
    </>
  );
};

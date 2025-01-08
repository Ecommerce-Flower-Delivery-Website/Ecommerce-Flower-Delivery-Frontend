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
import EditPopup from "./components/EditPopup";

interface Accessory {
  _id: number;
  title: string;
  image: string;
  stock: number;
  description: string;
  price: number;
  products_array: Product[];
}

export const Accessories: React.FC = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessory[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [currentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isEditPopupVisible, setEditPopupVisible] = useState(false);
  const [newAccessory, setNewAccessory] = useState<Accessory>({
    _id: 0,
    title: "",
    image: "",
    stock: 0,
    description: "",
    price: 0,
    products_array: [],
  });
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(
    null
  );

  useEffect(() => {
    setFilteredAccessories(accessories); // Initialize with all accessories
  }, [accessories]);

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

  useEffect(() => {
    const filtered = accessories.filter((accessory) =>
      accessory.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccessories(filtered);
  }, [accessories, searchTerm]);

  const handleEdit = (id: number) => {
    const accessoryToEdit = accessories.find((item) => item._id === id);
    if (accessoryToEdit) {
      setSelectedAccessory(accessoryToEdit);
      setEditPopupVisible(true);
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
      accessorKey: "products_array",
      header: "Products",
      cell: ({ row }) => (
        <div>
          {row.original.products_array.map((product) => (
            <span key={product._id} className="block">
              {product.title}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => handleEdit(row.original._id)}>
            <Edit className="h-5 w-5 text-blue-500" />
          </Button>
          <Button variant="ghost" onClick={() => console.log("Delete action")}>
            <Trash className="h-5 w-5 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredAccessories,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm">entries</span>
            <Input
              placeholder="Search by title..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
            />
          </div>
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
              {filteredAccessories.length > 0 ? (
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

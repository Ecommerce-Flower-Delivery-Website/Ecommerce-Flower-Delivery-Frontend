import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components/button";
import { Card, CardContent, CardHeader } from "../../components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/table";

const baseUrl = import.meta.env.VITE_PUBLIC_API_BASE_URL;
const apiVersion = import.meta.env.VITE_API_VERSION;

interface Contact {
  _id: number;
  name: string;
  isChecked: boolean;
  user_id?: {
    name?: string;
  };
}

export const ContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState<"all" | "checked" | "unchecked">("all");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/${apiVersion}/contact?pageNumber=${currentPage}`
        );
        const { contacts, pagination } = response.data.data;

        setContacts(contacts);
        setTotalPages(pagination?.totalPages || 1);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, [currentPage]);

  const filteredContacts = useMemo(() => {
    if (filter === "all") return contacts;
    return contacts.filter((contact) =>
      filter === "checked" ? contact.isChecked : !contact.isChecked
    );
  }, [contacts, filter]);

  const handleToggleChecked = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const contact = contacts.find((item) => item._id === id);
      if (contact) {
        const updatedContact = {
          ...contact,
          isChecked: !contact.isChecked,
        };

        await axios.put(
          `${baseUrl}/api/${apiVersion}/contact/${id}`,
          updatedContact,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        3;

        setContacts((prev) =>
          prev.map((item) => (item._id === id ? updatedContact : item))
        );
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          name
          {column.getIsSorted() === "asc" ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ChevronDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      ),
      cell: ({ row }) => row.original.user_id?.name || "Unknown",
    },
    {
      accessorKey: "isChecked",
      header: "Checked",
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => handleToggleChecked(row.original._id)}
        >
          {row.original.isChecked ? "True" : "False"}
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredContacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "outline" : "solid"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "checked" ? "outline" : "solid"}
              onClick={() => setFilter("checked")}
            >
              Checked
            </Button>
            <Button
              variant={filter === "unchecked" ? "outline" : "solid"}
              onClick={() => setFilter("unchecked")}
            >
              Unchecked
            </Button>
          </div>
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
              {filteredContacts?.length > 0 ? (
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
          <div className="flex items-center justify-between pt-4">
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
    </>
  );
};

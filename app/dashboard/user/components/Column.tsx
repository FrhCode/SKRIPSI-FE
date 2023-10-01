"use client";

import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import User from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const columns: ColumnDef<User>[] = [
  {
    id: "Nomor",
    header: "No",

    cell: ({ row }) => {
      const staticNumber = row.index + 1;
      return <>{staticNumber}</>;
    },
  },
  {
    id: "Nama",
    accessorKey: "name",
    header: "Nama",
  },
  {
    id: "Email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "No Handphone",
    accessorKey: "phoneNumber",
    header: "No Handphone",
  },
  {
    id: "Aksi",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-end">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

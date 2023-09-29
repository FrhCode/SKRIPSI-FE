"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Symptom from "@/types/Symptom";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export const columns: ColumnDef<Symptom>[] = [
  {
    id: "nomor",
    header: "No",

    cell: ({ row }) => {
      const staticNumber = row.index + 1;
      return <>{staticNumber}</>;
    },
  },
  {
    id: "kode",
    accessorKey: "code",
    header: "Kode",
  },
  {
    id: "nama",
    accessorKey: "name",
    header: "Nama",
  },
  {
    id: "keyakinan",
    accessorKey: "dsValue",
    header: "Keyakinan",
  },
  {
    id: "aksi",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
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

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useState } from "react";
import DataTableRowAction from "./DataTableRowAction";

export const columns: ColumnDef<Symptom>[] = [
  {
    id: "Nomor",
    header: "No",

    cell: ({ row }) => {
      const staticNumber = row.index + 1;
      return <>{staticNumber}</>;
    },
  },
  {
    id: "Kode",
    accessorKey: "code",
    header: "Kode",
  },
  {
    id: "Nama",
    accessorKey: "name",
    header: "Nama",
  },
  {
    id: "Keyakinan",
    accessorKey: "dsValue",
    header: "Keyakinan",
  },
  {
    id: "Aksi",
    cell: ({ row }) => {
      const symptom: Omit<Symptom, "id"> = {
        code: row.getValue("Kode"),
        dsValue: row.getValue("Keyakinan"),
        name: row.getValue("Nama"),
      };
      return <DataTableRowAction symptom={symptom} />;
    },
  },
];

"use client";

import User from "@/types/User";
import { ColumnDef } from "@tanstack/react-table";
import DataTableRowAction from "./DataTableRowAction";

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
      return <DataTableRowAction user={row.original} />;
    },
  },
];

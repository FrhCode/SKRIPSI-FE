"use client";

import Symptom from "@/types/Symptom";
import { ColumnDef } from "@tanstack/react-table";
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

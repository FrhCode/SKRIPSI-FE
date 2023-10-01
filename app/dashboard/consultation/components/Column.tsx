"use client";

import { Button } from "@/components/ui/button";
import Consultation from "@/types/Consultation";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Consultation>[] = [
  {
    id: "Nomor",
    header: "No",

    cell: ({ row }) => {
      const staticNumber = row.index + 1;
      return <>{staticNumber}</>;
    },
  },
  {
    id: "Tanggal Konsultasi",
    accessorKey: "invoiceDate",
    header: "Tanggal konsultasi",
    cell: ({ row }) => {
      const consultation = row.original;
      const formattedDate = format(
        new Date(consultation.invoiceDate),
        "yyyy-MM-dd HH:mm:ss"
      );

      return <>{formattedDate}</>;
    },
  },
  {
    id: "Nama pasien",
    accessorKey: "patientName",
    header: "Nama pasien",
  },
  {
    id: "Aksi",
    cell: ({ row }) => {
      const consultation = row.original;
      return (
        <div className="text-right">
          <Button variant={"dashboard"} size={"sm"} asChild>
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/consultations/${consultation.invoice}/download`}
            >
              Download
            </a>
          </Button>
        </div>
      );
    },
  },
];

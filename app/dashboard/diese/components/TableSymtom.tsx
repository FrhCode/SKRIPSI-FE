import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import React from "react";
import DialogAddSymptom from "./DialogAddSymptom";
import Symptom from "@/types/Symptom";
import { getDieseSolutions } from "@/service/diese/getDieseSolution";
import { Button } from "@/Components/ui/button";
import { ExtractContentType } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";

interface Props {
  diese: {
    symptoms: Symptom[];
    solutions: ExtractContentType<typeof getDieseSolutions>;
    id: number;
    code: string;
    name: string;
    description: string;
  };
}

export default function TableSymtom({ diese }: Props) {
  return (
    <Table>
      <TableCaption>
        <DialogAddSymptom symptomName={diese.name} dieseCode={diese.code} />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="">Nilai Keyakinan</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {diese.symptoms.map(({ code, dsValue, id, name }) => {
          return (
            <TableRow key={id}>
              <TableCell className="font-medium">{code}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell className="">{dsValue}</TableCell>
              <TableCell className="flex justify-end">
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

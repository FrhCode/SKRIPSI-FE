import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import Symptom from "@/types/Symptom";
import { getDieseSolutions } from "@/service/diese/getDieseSolution";
import DialogAddSolution from "./DialogAddSolution";
import { ExtractContentType } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
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
import DropDownSolutionTable from "./DropDownSolutionTable";

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

export default function TableSolution({ diese }: Props) {
  return (
    <Table>
      <TableCaption>
        <DialogAddSolution symptomName={diese.name} dieseCode={diese.code} />
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead></TableHead>
          {/* <TableHead className="text-right">Nilai Keyakinan</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {diese.solutions.map(({ id, name }) => {
          return (
            <TableRow key={id}>
              <TableCell className="">{name}</TableCell>
              <TableCell className="text-right">
                <DropDownSolutionTable id={id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

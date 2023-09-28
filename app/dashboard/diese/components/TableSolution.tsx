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
import DialogAddSymptom from "./DialogAddSymptom";
import Symptom from "@/types/Symptom";
import { getDieseSolutions } from "@/service/diese/getDieseSolution";
import { ExtractData } from "@/lib/utils";
import DialogAddSolution from "./DialogAddSolution";

interface Props {
  diese: {
    symptoms: Symptom[];
    solutions: ExtractData<typeof getDieseSolutions>;
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
        {diese.solutions.map(({ description, id, name }) => {
          return (
            <TableRow key={id}>
              <TableCell className="">{name}</TableCell>
              <TableCell className="text-right">Delete</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

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
import { ExtractContentType } from "@/lib/utils";
import DropDownSymptomTable from "./DropDownSymptomTable";

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
                <DropDownSymptomTable
                  dieseCode={diese.code}
                  symptomsCode={code}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

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
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";

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
              <TableCell className="flex items-end gap-3 text-right">
                <button>
                  <AiFillEdit size={19} />
                </button>
                <button>
                  <BsFillTrashFill size={21} color="var(--rose-700)" />
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

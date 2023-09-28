import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { paginateSymtom } from "@/service/symptom/paginateSymptom";
import { Button } from "@/components/ui/button";
import { FormAddSymtom } from "./FormAddSymtom";

interface Props {
  symptomName: string;
  dieseCode: string;
}

export default async function DialogAddSolution({
  symptomName,
  dieseCode,
}: Props) {
  const { jwtToken } = (await getServerSession(authOptions)) as Session;

  const page = await paginateSymtom({ token: jwtToken, size: 50 });

  const { content: symptoms } = page;

  return (
    <Dialog>
      <DialogTrigger>Tambah Solusi untuk penyakit {symptomName}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form menambahkan gejala</DialogTitle>
          <DialogDescription>
            Aksi ini akan menambahkan gejala terhadap penyakit, Aksi ini dapat
            mempengaruhi hasil perhitungan dari sistem.
          </DialogDescription>
        </DialogHeader>
        <FormAddSymtom
          symptoms={symptoms.map((symptom) => ({
            label: symptom.name,
            value: symptom.code,
          }))}
          dieseCode={dieseCode}
        />
        <DialogFooter className="hidden">
          <DialogClose asChild>
            <Button data-close-modal>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

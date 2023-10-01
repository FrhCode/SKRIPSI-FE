import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { paginateSymtom } from "@/service/symptom/paginateSymptom";
import { Button } from "@/Components/ui/button";
import { FormAddSymtom } from "./FormAddSymtom";
import InvalidSessionException from "@/exception/InvalidSessionException";

interface Props {
  symptomName: string;
  dieseCode: string;
}

export default async function DialogAddSymptom({
  symptomName,
  dieseCode,
}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new InvalidSessionException();
  }
  const { jwtToken } = session;
  const page = await paginateSymtom({ token: jwtToken, size: 50 });

  const { content: symptoms } = page;

  return (
    <Dialog>
      <DialogTrigger>Tambah gejala untuk penyakit {symptomName}</DialogTrigger>
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

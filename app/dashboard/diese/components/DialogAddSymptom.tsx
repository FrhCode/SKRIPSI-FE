import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { AddSymtomForm } from "./AddSymtomForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { paginateSymtom } from "@/service/symptom/paginateSymptom";

interface Props {
  symptomName: string;
}

export default async function DialogAddSymptom({ symptomName }: Props) {
  const { jwtToken } = (await getServerSession(authOptions)) as Session;

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
        <AddSymtomForm
          symptoms={symptoms.map((symptom) => ({
            label: symptom.name,
            value: symptom.code,
          }))}
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import React, { useState } from "react";
import DialogDeleteSymptom from "./DialogDeleteSymptom";
import Symptom from "@/types/Symptom";
import DialogEditSymptom from "./DialogEditSymptom";

type Props = {
  symptom: Omit<Symptom, "id">;
};

export default function DataTableRowAction({ symptom }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-end">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                setTimeout(() => {
                  setIsDeleteModalOpen(true);
                }, 1)
              }
            >
              Hapus
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                setTimeout(() => {
                  setIsUpdateModalOpen(true);
                }, 1)
              }
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogDeleteSymptom
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        symptomCode={symptom.code}
      />
      <DialogEditSymptom
        open={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        symptom={symptom}
      />
    </>
  );
}

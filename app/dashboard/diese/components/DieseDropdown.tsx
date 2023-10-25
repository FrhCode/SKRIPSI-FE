"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Diese from "@/types/Diese";
import { MoreHorizontalIcon } from "lucide-react";
import React, { useState } from "react";
import DialogDeleteDiese from "./DialogDeleteDiese";
import DialogEditDiese from "./DialogEditDiese";

type Props = {
  diese: Diese;
};

export default function DieseDropdown({ diese }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div>
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
                  setIsEditModalOpen(true);
                }, 1)
              }
            >
              Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogDeleteDiese
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        dieseCode={diese.code}
      />
      <DialogEditDiese
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        diese={diese}
      />
    </div>
  );
}

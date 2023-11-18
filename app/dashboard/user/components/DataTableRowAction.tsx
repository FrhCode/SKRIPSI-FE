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
import User from "@/types/User";
import DialogDeleteUser from "./DialogDeleteUser";
import DialogEditUser from "./DialogEditUser";
import DialogChangePassword from "./DialogChangePassword";

type Props = {
  user: User;
};

export default function DataTableRowAction({ user }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

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
            <DropdownMenuItem
              onClick={() =>
                setTimeout(() => {
                  setIsChangePasswordModalOpen(true);
                }, 1)
              }
            >
              Ubah Password
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DialogDeleteUser
        open={isDeleteModalOpen}
        setOpen={setIsDeleteModalOpen}
        // symptomCode={symptom.code}
        userId={user.id}
      />
      <DialogEditUser
        open={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
        user={user}
      />
      <DialogChangePassword
        open={isChangePasswordModalOpen}
        setIsOpen={setIsChangePasswordModalOpen}
        user={user}
      />
    </>
  );
}

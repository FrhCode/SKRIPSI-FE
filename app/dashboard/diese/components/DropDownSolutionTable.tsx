"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import deleteSolution from "@/service/solution/deleteSolution";
import { MoreHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import DialogAddSolution from "./DialogAddSolution";
import DialogEditSolution from "./DialogEditSolution";
import { Solution } from "@/types/Consultation";

interface Props {
  solution: Solution & { id: string };
}

export default function DropDownSolutionTable({
  solution: { description, name, id },
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();

  const deleteDialogTrigger = useRef<HTMLButtonElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                // deleteDialogTrigger.current?.click();
                setIsDeleteModalOpen(true);
              }, 1);
            }}
          >
            <button>Hapus</button>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setTimeout(() => {
                // deleteDialogTrigger.current?.click();
                setIsEditModalOpen(true);
              }, 1);
            }}
          >
            <button>Edit</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        {/* <AlertDialog> */}
        <AlertDialogTrigger ref={deleteDialogTrigger} className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda benar-benar yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak bisa dibatalkan. Tindakan ini akan menghapus
              solusi secara permanen dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </AlertDialogCancel> */}
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant={"destructive"}
              onClick={async () => {
                if (!session) return;

                await deleteSolution({ id, token: session.jwtToken });
                router.refresh();
                toast({
                  title: "Data Berhasil Dihapus",
                  description: "Data telah dihapus dari dalam aplikasi.",
                });

                setIsDeleteModalOpen(false);
              }}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DialogEditSolution
        solution={{ description, id, name }}
        open={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
      />
    </>
  );
}

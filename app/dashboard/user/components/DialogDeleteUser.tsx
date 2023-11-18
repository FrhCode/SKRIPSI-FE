import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import deleteUser from "@/service/user/deleteUser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

export default function DialogDeleteUser({ open, setOpen, userId }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus user ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus user.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          {/* <AlertDialogAction>Yakin</AlertDialogAction> */}
          <Button
            onClick={async () => {
              try {
                // await deleteDiese({ dieseCode, token: session!.jwtToken });
                await deleteUser({ userId, token: session!.jwtToken });
                router.refresh();
                toast({
                  title: "Berhasil menghapus data",
                  description:
                    "Data telah berhasil dihapus dari dalam aplikasi.",
                });
              } catch (error) {
                toast({
                  title: "Gagal menghapus data",
                  description: "Gagal menghapus data",
                  variant: "destructive",
                });
              } finally {
                setOpen(false);
              }
            }}
          >
            Yakin
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

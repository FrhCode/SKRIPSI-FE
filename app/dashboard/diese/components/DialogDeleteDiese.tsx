import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import deleteDiese from "@/service/diese/deleteDiese";
import deleteSymptom from "@/service/symptom/deleteSymptom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dieseCode: string;
};

export default function DialogDeleteDiese({ open, setOpen, dieseCode }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus penyakit ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menambahkan solusi terhadap penyakit, Aksi ini dapat
            mempengaruhi hasil diagnosa dari sistem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          {/* <AlertDialogAction>Yakin</AlertDialogAction> */}
          <Button
            onClick={async () => {
              try {
                await deleteDiese({ dieseCode, token: session!.jwtToken });
                router.refresh();
                toast({
                  title: "Berhasil menghapus data",
                  description:
                    "Data telah berhasil dihapus dari dalam aplikasi.",
                });
              } catch (error) {
                toast({
                  title: "Gagal menghapus data",
                  description:
                    "Gagal menghapus data, pastikan gejala tidak ter-asosiasi dengan penyakit manapun",
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

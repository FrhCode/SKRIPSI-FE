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
import deleteSymptom from "@/service/symptom/deleteSymptom";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  symptomCode: string;
};

export default function DialogDeleteSymptom({
  open,
  setOpen,
  symptomCode,
}: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus gejala ini?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Pastikan gejala ini tidak ter-asosiasi dengan dengan penyakit
            manapun, sebelum menghapus gejala ini.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          {/* <AlertDialogAction>Yakin</AlertDialogAction> */}
          <Button
            onClick={async () => {
              try {
                await deleteSymptom({ symptomCode, token: session!.jwtToken });

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

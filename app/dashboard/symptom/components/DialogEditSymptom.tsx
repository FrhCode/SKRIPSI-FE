import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UpdateSymptomSchema from "./schema/UpdateSymptomSchema";
import Symptom from "@/types/Symptom";
import editSymptom from "@/service/symptom/editSymptom";

interface Props {
  symptom: Omit<Symptom, "id">;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogEditSymptom({
  symptom: { code, dsValue, name },
  open,
  setIsOpen,
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateSymptomSchema>>({
    resolver: zodResolver(UpdateSymptomSchema),
    defaultValues: {
      name,
      dsValue,
    },
  });

  async function onSubmit({
    dsValue,
    name,
  }: z.infer<typeof UpdateSymptomSchema>) {
    await editSymptom({
      symptom: { code, dsValue, name },
      token: session!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Diubah",
      description: "Data telah berhasil diubah ke dalam aplikasi.",
    });

    setIsOpen(false);
  }

  useEffect(() => {
    form.reset({ dsValue, name });
  }, [dsValue, form, name]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form mengedit gejala</DialogTitle>
              <DialogDescription>
                Aksi ini akan mengubah gejala pada sistem, Aksi ini dapat
                mempengaruhi hasil diagnosa dari sistem.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="solusi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dsValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nilai DS</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="bilangan antara 0-1"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

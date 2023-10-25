import { Solution } from "@/types/Consultation";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import editSolution from "@/service/solution/editSolution";
import Diese from "@/types/Diese";
import EditDieseSchema from "./schema/editDieseSchema";
import editDiese from "@/service/diese/editDiese";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  diese: Diese;
}

export default function DialogEditDiese({
  open,
  setIsOpen,
  diese: { code, description, name },
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();
  const form = useForm<z.infer<typeof EditDieseSchema>>({
    resolver: zodResolver(EditDieseSchema),
    defaultValues: {
      description,
      name,
    },
  });

  async function onSubmit({
    description,
    name,
  }: z.infer<typeof EditDieseSchema>) {
    await editDiese({
      diese: { code, description, name },
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
    form.reset({ description, name });
  }, [description, form, name, open]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Dialog open={open} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form mengedit penyakit</DialogTitle>
              <DialogDescription>
                Aksi ini akan mengubah data penyakit, Aksi ini dapat
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi tentang solusi"
                      {...field}
                      rows={6}
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

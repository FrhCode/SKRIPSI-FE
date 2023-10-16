"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AddSolutionSchema from "./schema/AddSolutionSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import addSolution from "@/service/diese/addSolution";
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  symptomName: string;
  dieseCode: string;
}

export default function DialogAddSolution({ symptomName, dieseCode }: Props) {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof AddSolutionSchema>>({
    resolver: zodResolver(AddSolutionSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AddSolutionSchema>) {
    await addSolution({
      data,
      dieseCode,
      token: session!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Ditambahkan",
      description: "Data telah berhasil ditambahkan ke dalam aplikasi.",
    });

    setIsModalOpen(false);
  }

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger>
            Tambah Solusi untuk penyakit {symptomName}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan solusi</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan solusi terhadap penyakit, Aksi ini
                dapat mempengaruhi hasil diagnosa dari sistem.
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

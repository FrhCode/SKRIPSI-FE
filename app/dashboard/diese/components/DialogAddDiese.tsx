"use client";
import { AiOutlinePlus } from "react-icons/ai";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddSymptomSchema from "./schema/AddSymptomSchema";
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
import { Input } from "@/components/ui/input";
import createSymptoms from "@/service/symptom/createSymptoms";
import { useSession } from "next-auth/react";
import CreateDieseSchema from "./schema/CreateDieseSchema";
import { Textarea } from "@/components/ui/textarea";
import createDiese from "@/service/diese/createDiese";

export default function DialogAddSymptom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateDieseSchema>>({
    resolver: zodResolver(CreateDieseSchema),
    defaultValues: {
      description: "",
      name: "",
      code: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  async function onSubmit(data: z.infer<typeof CreateDieseSchema>) {
    try {
      await createDiese({
        token: session!.jwtToken,
        data,
      });

      router.refresh();

      toast({
        title: "Data Berhasil Ditambahkan",
        description: "Data telah berhasil ditambahkan ke dalam aplikasi.",
      });

      setIsModalOpen(false);
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            {/* <Button variant={"ghost"}>Buat gejala baru</Button> */}
            <Button className="fixed bottom-0 right-0 z-[99] h-auto w-auto -translate-x-10 -translate-y-10 rounded-full bg-blue-600 px-3 py-3 hover:bg-blue-600/90">
              <AiOutlinePlus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan penyakit</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan penyakit baru pada sistem.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: DC1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Susah makan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-10">
                  <div className="mb-3 flex justify-between">
                    <FormLabel className="">Deskripsi</FormLabel>
                    <FormMessage className="leading-6" />
                  </div>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      className="w-full rounded-lg px-4 py-4 text-black placeholder-slate-500 disabled:text-gray-400"
                    />
                  </FormControl>
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

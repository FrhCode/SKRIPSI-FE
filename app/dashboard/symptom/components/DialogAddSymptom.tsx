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

export default function DialogAddSymptom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof AddSymptomSchema>>({
    resolver: zodResolver(AddSymptomSchema),
    defaultValues: {
      code: "",
      dsValue: 0,
      name: "",
    },
  });


  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  async function onSubmit(data: z.infer<typeof AddSymptomSchema>) {
    try {
      await createSymptoms({
        code: data.code,
        dsValue: data.dsValue,
        name: data.name,
        token: session!.jwtToken,
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
            <Button variant={"ghost"}>Buat gejala baru</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan gejala</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan gejala baru pada sistem.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Contoh: SC01" {...field} />
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
                    <Input placeholder="Nama gejala" {...field} />
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

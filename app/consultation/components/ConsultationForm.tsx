"use client";

import Container from "@/components/container/Container";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  name: z.string().min(3, "nama minimal terdiri dari 3 karakter"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]*$/, "nomor telepon hanya bisa berisikan angka")
    .min(5, "nomor telepon minimal terdiri dari 5 karakter")
    .max(15, "nomor telepon maximal terdiri dari 15 karakter"),
  address: z
    .string()
    .min(5, "alamat minimal terdiri dari 5 karakter")
    .max(100, "alamat maximal terdiri dari 100 karakter"),
  symtoms: z.string().array(),
});

export default function ConsultationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Container.Root>
      <Container.Content>
        <p className="mb-5 border-b border-slate-200 pb-5 text-3xl font-light">
          Formulir Konsultasi
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              <div className="space-y-1 md:col-span-2 md:space-y-2">
                <p className="font-medium">Informasi pengguna</p>
                <p className="text-slate-400">
                  Data yang anda masukan akan terjamin keamanannya, ini akan
                  digunakan dalam pengumpulan informasi, demi kemajuan sistem
                  Dokter Lele
                </p>
              </div>
              <div className="md:col-span-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-10">
                      <div className="mb-3 flex justify-between">
                        <FormLabel className="">Nama</FormLabel>
                        <FormMessage className="leading-6" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-slate-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="mb-10">
                      <div className="mb-3 flex justify-between">
                        <FormLabel className="">Nomor Telepon</FormLabel>
                        <FormMessage className="leading-6" />
                      </div>
                      <FormControl>
                        <Input
                          placeholder="contoh: 083477284677"
                          {...field}
                          className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-slate-400"
                          inputMode="numeric"
                          pattern="[0-9]+"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="mb-10">
                      <div className="mb-3 flex justify-between">
                        <FormLabel className="">Alamat</FormLabel>
                        <FormMessage className="leading-6" />
                      </div>
                      <FormControl>
                        <Textarea
                          rows={10}
                          {...field}
                          className="w-full rounded-lg px-4 py-4 text-black placeholder-slate-500 disabled:text-slate-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </Container.Content>
    </Container.Root>
  );
}

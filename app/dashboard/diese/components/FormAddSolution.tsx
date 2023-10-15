"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import AddSolutionSchema from "./schema/AddSolutionSchema";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import addSolution from "@/service/diese/addSolution";

interface Props {
  dieseCode: string;
}

export default function FormAddSolution({ dieseCode }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof AddSolutionSchema>>({
    resolver: zodResolver(AddSolutionSchema),
  });

  async function onSubmit(data: z.infer<typeof AddSolutionSchema>) {
    await addSolution({
      data,
      dieseCode,
      token: session!.jwtToken,
    });

    router.refresh();

    console.log("FINISH");
    console.log();

    const el = document.querySelector(
      `[data-close-modal]`
    ) as HTMLButtonElement;

    el.click();

    // ".fixed.inset-0.z-50.bg-background\\/80.backdrop-blur-sm[data-state=open].animate-in[data-state=closed].animate-out[data-state=closed].fade-out-0[data-state=open].fade-in-0"
    toast({
      title: "Data Berhasil Ditambahkan",
      description: "Data telah berhasil ditambahkan ke dalam aplikasi.",
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

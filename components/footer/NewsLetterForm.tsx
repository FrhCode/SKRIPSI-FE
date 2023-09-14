"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { BsArrowRight } from "react-icons/bs";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "nama minimal terdiri dari 3 karakter",
  }),
  email: z.string().email({ message: "email tidak valid" }),
});

export default function NewsLetterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-10">
              <div className="mb-3 flex justify-between">
                <FormLabel className="text-lg font-normal leading-6 text-slate-500">
                  Nama
                </FormLabel>
                <FormMessage className="leading-6" />
              </div>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full rounded-lg bg-slate-100 px-11 py-8 font-medium text-black placeholder-slate-500 disabled:text-slate-400 dark:bg-slate-800 dark:text-white dark:disabled:text-slate-500"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-12">
              <div className="mb-3 flex justify-between">
                <FormLabel className="text-lg font-normal leading-6 text-slate-500">
                  Email
                </FormLabel>
                <FormMessage className="leading-6" />
              </div>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="w-full rounded-lg bg-slate-100 px-11 py-8 font-medium text-black placeholder-slate-500 disabled:text-slate-400 dark:bg-slate-800 dark:text-white dark:disabled:text-slate-500"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <motion.button
          className="group flex items-center gap-6 lg:mt-7"
          transition={{ duration: 0.1 }}
        >
          <p className="text-xl font-medium">Daftarkan Saya</p>
          <div className="rounded-full border-2 border-slate-200 p-3 transition group-hover:border-black">
            <BsArrowRight
              size={30}
              className="transition group-hover:translate-x-1"
            />
          </div>
        </motion.button>
      </form>
    </Form>
  );
}

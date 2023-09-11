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

const formSchema = z.object({
  name: z.string().min(3, {
    message: "name minimal terdiri dari 3 karakter",
  }),
  email: z.string().email({ message: "email tidak valid" }),
});

export default function NewsLetterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
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
                <FormLabel className="text-lg font-normal leading-6 text-gray-500">
                  Nama
                </FormLabel>
                <FormMessage className="leading-6" />
              </div>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="focus-ring text-md w-full rounded-lg bg-gray-100 px-11 py-8 font-medium text-black placeholder-gray-500 disabled:text-gray-400 dark:bg-gray-800 dark:text-white dark:disabled:text-slate-500"
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
                <FormLabel className="text-lg font-normal leading-6 text-gray-500">
                  Email
                </FormLabel>
                <FormMessage className="leading-6" />
              </div>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  className="focus-ring text-md w-full rounded-lg bg-gray-100 px-11 py-8 font-medium text-black placeholder-gray-500 disabled:text-gray-400 dark:bg-gray-800 dark:text-white dark:disabled:text-slate-500"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <motion.button
          className="rounded-full bg-black px-7 py-6 font-medium text-white lg:mt-7"
          whileTap={{ scale: 0.97, backgroundColor: "var(--slate-950)" }}
          transition={{ duration: 0.1 }}
        >
          Daftarkan Saya
        </motion.button>
      </form>
    </Form>
  );
}

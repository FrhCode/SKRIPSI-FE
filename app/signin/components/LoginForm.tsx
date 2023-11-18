"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "./schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [showInvalidCredentialError, setShowInvalidCredentialError] =
    useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "farhan7534031b@gmail.com",
      password: "indonesia123B",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl || "/dashboard",
      redirect: false,
    }).then(({ ok, error }: any) => {
      if (ok) {
        router.push("/dashboard");
      } else {
        console.log(error);
        setShowInvalidCredentialError(true);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat email</FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showInvalidCredentialError && (
          <p className="text-[0.8rem] font-medium text-destructive">
            Invalid Credentials
          </p>
        )}
        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import addSymptoms from "@/service/diese/addSymptoms";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import AddSymptomSchema from "./schema/AddSymptomSchema";

interface Props {
  symptoms: Array<{ label: string; value: string }>;
  dieseCode: string;
}

export function FormAddSymtom({ symptoms, dieseCode }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof AddSymptomSchema>>({
    resolver: zodResolver(AddSymptomSchema),
    defaultValues: {
      // symptomCode: "SC17",
    },
  });

  async function onSubmit(data: z.infer<typeof AddSymptomSchema>) {
    console.log(data);
    return;
    await addSymptoms({
      dieseCode,
      symptomsCode: [data.symptomCode],
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="symptomCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gejala</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-left [&>span:first-child]:line-clamp-1">
                    <SelectValue placeholder="Pilih Gejala" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <ScrollArea className="h-[200px] rounded-md">
                    {symptoms.map(({ label, value }) => {
                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      );
                    })}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

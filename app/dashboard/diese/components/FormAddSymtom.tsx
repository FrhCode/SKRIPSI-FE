"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/Components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";
import FormSchema from "./schema/formSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { useSession } from "next-auth/react";
import addSymptoms from "@/service/diese/addSymptoms";
import { useRouter } from "next/navigation";
import { toast } from "@/Components/ui/use-toast";

interface Props {
  symptoms: Array<{ label: string; value: string }>;
  dieseCode: string;
}

export function FormAddSymtom({ symptoms, dieseCode }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
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
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
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
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="text-left [&>span:first-child]:line-clamp-1">
                    <SelectValue placeholder="Select a verified email to display" />
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

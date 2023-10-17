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
import { paginateSymtom } from "@/service/symptom/paginateSymptom";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AddSymptomSchema from "./schema/AddSymptomSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import addSymptoms from "@/service/diese/addSymptoms";
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

interface Props {
  symptomName: string;
  dieseCode: string;
}

export default function DialogAddSymptom({ symptomName, dieseCode }: Props) {
  const { data: session } = useSession();

  const selectRef = useRef<HTMLButtonElement>(null);

  const [symptoms, setSymptoms] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof AddSymptomSchema>>({
    resolver: zodResolver(AddSymptomSchema),
    defaultValues: {},
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (session?.jwtToken) {
      paginateSymtom({ token: session.jwtToken || "", size: 50 }).then(
        (res) => {
          const symptoms = res.content.map((symptom) => ({
            label: symptom.name,
            value: symptom.code,
          }));

          setSymptoms(symptoms);
        }
      );
    }
  }, [session?.jwtToken]);

  useEffect(() => {
    form.reset();
  }, [form, isModalOpen]);

  async function onSubmit(data: z.infer<typeof AddSymptomSchema>) {
    await addSymptoms({
      dieseCode,
      symptomsCode: [data.symptomCode],
      token: session!.jwtToken,
    });

    router.refresh();

    toast({
      title: "Data Berhasil Ditambahkan",
      description: "Data telah berhasil ditambahkan ke dalam aplikasi.",
    });

    setIsModalOpen(false);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger>
            Tambah gejala untuk penyakit {symptomName}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Form menambahkan gejala</DialogTitle>
              <DialogDescription>
                Aksi ini akan menambahkan gejala terhadap penyakit, Aksi ini
                dapat mempengaruhi hasil diagnosa dari sistem.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="symptomCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gejala</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        ref={selectRef}
                        className="text-left [&>span:first-child]:line-clamp-1"
                      >
                        <SelectValue placeholder="Pilih Gejala" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <ScrollArea className="h-[200px] rounded-md">
                        {symptoms.map(({ label, value }) => {
                          return (
                            <SelectItem
                              key={value}
                              value={value}
                              style={{
                                width: selectRef.current?.offsetWidth,
                              }}
                            >
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

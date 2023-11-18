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
import formSchema from "./schema/formSchema";
import Symptom from "@/types/Symptom";
import { Button } from "@/components/ui/button";
import SymptomCheckBox from "./SymptomCheckBox";
import { useState } from "react";
import { ArrayElement, containsSubstringIgnoreCase } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

interface Props {
  symptoms: Symptom[];
}

export default function ConsultationForm({ symptoms }: Props) {
  const [filterdSymptoms, setFilterdSymptoms] = useState(
    symptoms.map((symptom) => {
      return { ...symptom, show: true, checked: false };
    })
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Mohammad Farhan",
      phoneNumber: "082188513499",
      address: "Jl Pelita",
      symptoms: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res: {
      invoice: string;
    } = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/consultations", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    router.push(`/result/${res.invoice}`);
  }

  const handleSymtomClick = (symptom: ArrayElement<typeof filterdSymptoms>) => {
    const symtoms = filterdSymptoms.map((value) => {
      if (value.code === symptom.code) {
        return { ...value, checked: !value.checked };
      }
      return { ...value };
    });

    setFilterdSymptoms(symtoms);
  };

  return (
    <Container.Root>
      <Container.Content>
        <p className="border-b border-gray-200 pb-5 text-3xl font-light">
          Formulir Konsultasi
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 gap-6 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none md:grid-cols-5">
              <div className="space-y-1 md:col-span-2 md:space-y-2">
                <p className="font-medium">Informasi pengguna</p>
                <p className="text-gray-400">
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
                          className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-gray-400"
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
                          className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-gray-400"
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
                          className="w-full rounded-lg px-4 py-4 text-black placeholder-slate-500 disabled:text-gray-400"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 border-b border-gray-200 py-5 last:pb-0 last-of-type:border-none md:grid-cols-5">
              <FormField
                control={form.control}
                name="symptoms"
                render={() => (
                  <>
                    <div className="space-y-1 md:col-span-2 md:space-y-2">
                      <div>
                        <FormLabel className="font-medium">
                          Data gejala
                        </FormLabel>
                        <FormMessage />
                      </div>
                      <p className="text-gray-400">
                        Centang gejala yang terlihat pada ikan lele anda, agar
                        sistem Dokter Lele dapat melakukan diagnosa penyakit
                        terhadap gejala yang ikan anda alami
                      </p>
                    </div>
                    <div className="space-y-4 md:col-span-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <Input
                          type="text"
                          placeholder="Search"
                          className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-gray-400"
                          onChange={(e) => {
                            const symtoms = filterdSymptoms.map((symtom) => {
                              const inputContainSymtomCode =
                                containsSubstringIgnoreCase(
                                  symtom.code,
                                  e.target.value
                                );
                              const inputContainSymtomName =
                                containsSubstringIgnoreCase(
                                  symtom.name,
                                  e.target.value
                                );

                              if (
                                inputContainSymtomCode ||
                                inputContainSymtomName
                              ) {
                                return { ...symtom, show: true };
                              }

                              return { ...symtom, show: false };
                            });

                            setFilterdSymptoms(symtoms);
                          }}
                        />
                      </div>
                      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filterdSymptoms
                          .filter((symptom) => symptom.show)
                          .map((symptom) => (
                            <FormField
                              control={form.control}
                              name="symptoms"
                              key={symptom.code}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        symptom.code
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              symptom.code,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== symptom.code
                                              )
                                            );
                                      }}
                                      hidden
                                    />
                                  </FormControl>
                                  <FormLabel>
                                    <SymptomCheckBox
                                      symptom={symptom}
                                      checked={symptom.checked}
                                      onClick={() => {
                                        handleSymtomClick(symptom);
                                      }}
                                    />
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                      </div>
                    </div>
                  </>
                )}
              />
            </div>

            <Button className="mt-14 rounded-full bg-black px-7 py-6 font-medium text-white lg:mt-7">
              Sumit
            </Button>
          </form>
        </Form>
      </Container.Content>
    </Container.Root>
  );
}

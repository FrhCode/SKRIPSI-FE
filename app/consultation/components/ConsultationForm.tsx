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

interface Props {
  symptoms: Symptom[];
}

export default function ConsultationForm({ symptoms }: Props) {
  const [filterdSymptoms, setFilterdSymptoms] = useState(
    symptoms.map((symptom) => {
      return { ...symptom, show: true, selected: false };
    })
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleSymtomClick = (symptom: ArrayElement<typeof filterdSymptoms>) => {
    const symtoms = filterdSymptoms.map((value) => {
      if (value.code === symptom.code) {
        return { ...value, selected: !value.selected };
      }
      return { ...value };
    });

    setFilterdSymptoms(symtoms);
  };
  return (
    <Container.Root>
      <Container.Content>
        <p className="border-b border-slate-200 pb-5 text-3xl font-light">
          Formulir Konsultasi
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 gap-6 border-b border-slate-200 py-5 last:pb-0 last-of-type:border-none md:grid-cols-5">
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
            <div className="grid grid-cols-1 gap-6 border-b border-slate-200 py-5 last:pb-0 last-of-type:border-none md:grid-cols-5">
              <div className="space-y-1 md:col-span-2 md:space-y-2">
                <p className="font-medium">Data gejala</p>
                <p className="text-slate-400">
                  Centang gejala yang terlihat pada ikan lele anda, agar sistem
                  Dokter Lele dapat melakukan diagnosa penyakit terhadap gejala
                  yang ikan anda alami
                </p>
              </div>
              <div className="space-y-4 md:col-span-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <Input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-lg px-4 py-8 text-black placeholder-slate-500 disabled:text-slate-400"
                    onChange={(e) => {
                      console.log(e.target.value);
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
                        console.log({
                          code: symtom.code,
                          name: symtom.name,
                          inputContainSymtomCode,
                          inputContainSymtomName,
                          input: e.target.value,
                        });

                        if (inputContainSymtomCode || inputContainSymtomName) {
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
                      <SymptomCheckBox
                        symptom={symptom}
                        selected={symptom.selected}
                        key={symptom.code}
                        onClick={() => handleSymtomClick(symptom)}
                      />
                    ))}
                </div>
              </div>
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

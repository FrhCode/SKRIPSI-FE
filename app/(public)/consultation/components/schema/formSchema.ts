import { z } from "zod";

const formSchema = z.object({
  name: z
    .string({ required_error: "kolom nama wajib diisi" })
    .min(3, "kolom nama minimal terdiri dari 3 karakter"),
  phoneNumber: z
    .string({ required_error: "kolom nomor telepon wajib diisi" })
    .regex(/^\+?[0-9]*$/, "kolom nomor telepon hanya bisa berisikan angka")
    .min(5, "kolom nomor telepon minimal terdiri dari 5 karakter")
    .max(15, "kolom nomor telepon maximal terdiri dari 15 karakter"),
  address: z
    .string({ required_error: "kolom a wajib diisi" })
    .min(5, "kolom alamat minimal terdiri dari 5 karakter")
    .max(100, "kolom alamat maximal terdiri dari 100 karakter"),
  symtoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Harap centang setidaknya satu gejala",
  }),
});

export default formSchema;

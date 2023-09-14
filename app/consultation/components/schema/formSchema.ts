import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "nama minimal terdiri dari 3 karakter"),
  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]*$/, "nomor telepon hanya bisa berisikan angka")
    .min(5, "nomor telepon minimal terdiri dari 5 karakter")
    .max(15, "nomor telepon maximal terdiri dari 15 karakter"),
  address: z
    .string()
    .min(5, "alamat minimal terdiri dari 5 karakter")
    .max(100, "alamat maximal terdiri dari 100 karakter"),
  symtoms: z.string().array(),
});

export default formSchema;

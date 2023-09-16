import { z } from "zod";

const formSchema = z.object({
  name: z.string({ required_error: "kolom nama wajib diisi" }).min(3, {
    message: "kolom nama minimal terdiri dari 3 karakter",
  }),
  email: z
    .string({ required_error: "kolom email wajib diisi" })
    .email({ message: "kolom email tidak valid" }),
});

export default formSchema;

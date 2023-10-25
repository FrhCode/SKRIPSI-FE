import { z } from "zod";

const CreateDieseSchema = z.object({
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(2, { message: "Nama harus memiliki setidaknya 2 karakter" }),
  code: z
    .string({ required_error: "Code harus disi" })
    .min(2, { message: "Code harus memiliki setidaknya 2 karakter" }),
  description: z
    .string({ required_error: "Deskripsi harus disi" })
    .min(10, { message: "Deskripsi harus memiliki setidaknya 10 karakter" }),
});

export default CreateDieseSchema;

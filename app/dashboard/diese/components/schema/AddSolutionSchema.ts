import { z } from "zod";

const AddSolutionSchema = z.object({
  name: z
    .string({ required_error: "Nama harus disi" })
    .min(2, { message: "Nama harus memiliki setidaknya 2 karakter" }),
  description: z
    .string({ required_error: "Deskripsi harus disi" })
    .min(10, { message: "Deskripsi harus memiliki setidaknya 10 karakter" }),
});

export default AddSolutionSchema;

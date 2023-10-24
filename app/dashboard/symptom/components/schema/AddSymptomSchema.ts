import { z } from "zod";

const AddSymptomSchema = z.object({
  code: z.string({ required_error: "Kolom code wajib diisi" }).min(1).max(10), // Code should be a string between 1 and 10 characters
  name: z.string({ required_error: "Kolom nama wajib diisi" }).min(1),
  dsValue: z
    .string()
    .transform((input) => parseFloat(input))
    .pipe(
      z
        .number({
          required_error: "Kolom Nilai DS wajib diisi",
          invalid_type_error: "Kolom Nilai DS harus bernilai desimal",
        })
        .min(0)
        .max(1)
    ),
});

export default AddSymptomSchema;

import { z } from "zod";

const UpdateSymptomSchema = z.object({
  name: z.string({ required_error: "Kolom nama wajib diisi" }).min(1),
  dsValue: z
    .number({
      required_error: "Kolom Nilai DS wajib diisi",
      invalid_type_error: "Kolom Nilai DS harus bernilai desimal",
    })
    .min(0)
    .max(1),
});

export default UpdateSymptomSchema;

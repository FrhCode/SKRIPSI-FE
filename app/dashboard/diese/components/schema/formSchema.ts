import { z } from "zod";

const FormSchema = z.object({
  symptomCode: z.string({
    required_error: "Please select a language.",
  }),
});

export default FormSchema;

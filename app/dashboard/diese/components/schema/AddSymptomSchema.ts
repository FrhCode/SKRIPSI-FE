import { z } from "zod";

const AddSymptomSchema = z.object({
  symptomCode: z.string({
    required_error: "Please select a symptom.",
  }),
});

export default AddSymptomSchema;

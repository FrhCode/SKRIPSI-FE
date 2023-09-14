import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "nama minimal terdiri dari 3 karakter",
  }),
  email: z.string().email({ message: "email tidak valid" }),
});

export default formSchema;

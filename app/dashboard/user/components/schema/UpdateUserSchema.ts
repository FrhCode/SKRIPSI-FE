import { z } from "zod";

const UpdateUserSchema = z.object({
  name: z.string({
    required_error: "Please enter your name.",
  }),

  phoneNumber: z.string({
    required_error: "Please enter your phone number.",
  }),
});

export default UpdateUserSchema;

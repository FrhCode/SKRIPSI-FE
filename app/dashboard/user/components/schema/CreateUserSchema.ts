import { z } from "zod";

const CreateUserSchema = z.object({
  name: z.string({
    required_error: "Please enter your name.",
  }),
  email: z.string({
    required_error: "Please enter your email.",
  }),
  phoneNumber: z.string({
    required_error: "Please enter your phone number.",
  }),
  password: z.string({
    required_error: "Please enter your password.",
  }),
});

export default CreateUserSchema;

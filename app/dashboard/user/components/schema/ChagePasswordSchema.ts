import { z } from "zod";

const ChangePasswordSchema = z.object({
  password: z.string({
    required_error: "Please enter your password.",
  }),
});

export default ChangePasswordSchema;

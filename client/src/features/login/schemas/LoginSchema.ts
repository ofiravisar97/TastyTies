import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Email field required." }),
  password: z.string({ message: "Password field required." }),
});

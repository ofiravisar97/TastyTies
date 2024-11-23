import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field required." })
    .email({ message: "Invalid email." }),
  displayName: z.string().min(1, { message: "Display name field required." }),
  password: z
    .string({ message: "Password field required." })
    .min(8, { message: "8 characters required for password field." }),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email field required." })
      .email({ message: "Invalid email." }),
    displayName: z.string().min(1, { message: "Display name field required." }),
    password: z
      .string({ message: "Password field required." })
      .min(8, { message: "8 characters required for password field." }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Password confirm field required." }),
  })
  .refine((data) => data.passwordConfirm === data.password, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

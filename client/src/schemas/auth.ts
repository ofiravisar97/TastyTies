import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    displayName: z
      .string()
      .min(3, { message: "Display name must be at least 3 characters" }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    { message: "Passwords doesn't match", path: ["confirmPassword"] }
  );

export type RegisterDataType = z.infer<typeof registerSchema>;

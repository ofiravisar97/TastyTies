import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email({ message: "Invalid Email" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must contain atleast 8 characters." }),
  displayName: z.string().min(1, { message: "Name cannot be empty" }),
});

export const loginSchema = z.object({
  email: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

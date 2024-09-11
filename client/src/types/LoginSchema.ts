import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email cannot be empty."),
  password: z.string().min(1, "Password cannot be empty."),
});

export type LoginType = z.infer<typeof LoginSchema>;

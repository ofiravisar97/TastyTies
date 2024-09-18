import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Atleast 8 characters required."),
  confirm: z.string().min(8, "Atleast 8 characters required."),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

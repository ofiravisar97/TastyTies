import { z } from "zod";

export const getUserSchema = z.object({
  userId: z.string().uuid("Not valid user id"),
  connectedUserId: z.string().uuid("Not valid user id"),
});

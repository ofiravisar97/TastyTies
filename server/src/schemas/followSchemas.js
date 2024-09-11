import { z } from "zod";

export const followSchema = z.object({
  followerId: z.string().uuid("Not valid id"),
  followingId: z.string().uuid("Not valid id"),
});

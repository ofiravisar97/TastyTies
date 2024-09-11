import { z } from "zod";

export const likeSchema = z.object({
  recipeId: z.string().uuid("Not a valid recipeId"),
  userId: z.string().uuid("Not a valid userId"),
});

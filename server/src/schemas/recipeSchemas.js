import { z } from "zod";

const ingredientSchema = z.object({
  amount: z
    .number()
    .min(1, "Amount cannot be lower than 1.")
    .max(999, "Amount is too high"),
  type: z.enum([" ", "Kg", "G", "L", "Ml"]),
  name: z.string(),
});

const instructionSchema = z.object({
  instruction: z.string(),
});

export const addRecipeScehma = z.object({
  userId: z.string(),
  imageUrl: z.string().trim(),
  title: z.string(),
  description: z.string(),
  ingredients: z.array(ingredientSchema),
  instructions: z.array(instructionSchema),
});

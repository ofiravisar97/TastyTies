import { z } from "zod";

const IngredientScehma = z.object({
  name: z.string(),
  amount: z.number().int().positive(),
  type: z.enum([" ", "Kg", "G", "L", "Ml"]),
});

const InstructionsSchema = z.object({
  instruction: z.string(),
});

export const RecipeSchema = z.object({
  title: z.string().min(1, "title required."),
  description: z.string().min(1, "description required"),
  imageUrl: z.string().url("Invalid Url"),
  ingredients: z.array(IngredientScehma),
  instructions: z.array(InstructionsSchema),
});

export type RecipeSchemaType = z.infer<typeof RecipeSchema>;

export type RecipePostType = {
  recipeId: string;
  imageURL: string;
  title: string;
  description: string;
  avatarURL: string;
  username: string;
  userId: string;
  likesCount: number;
  createdAt: Date;
};

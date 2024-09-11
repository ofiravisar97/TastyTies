import catchAsync from "../utils/catchAsync.js";
import db from "../db/db.js";
import {
  RecipeSchema,
  IngredientSchema,
  InstructionSchema,
} from "../db/schemas.js";
import AppError from "../utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../utils/cloudinary.js";

export const addRecipe = catchAsync(async (req, res) => {
  const { imageUrl, title, description, userId } = req.body;
  let { instructions, ingredients } = req.body;

  const image = await cloudinary.uploader.upload(imageUrl, {
    folder: "Recipe",
  });
  const url = image.secure_url;

  await db.transaction(async (tx) => {
    const result = await tx
      .insert(RecipeSchema)
      .values({ imageUrl: url, title, description, userId })
      .returning({ id: RecipeSchema.id });
    if (!result || result.length === 0) {
      tx.rollback();
      throw new AppError("Couldnt add recipe.", StatusCodes.BAD_REQUEST);
    }
    const id = result[0].id;

    ingredients = ingredients.map((ingredient) => ({
      ...ingredient,
      recipeId: id,
    }));
    instructions = instructions.map((instruction) => ({
      ...instruction,
      recipeId: id,
    }));

    await tx.insert(IngredientSchema).values(ingredients);
    await tx.insert(InstructionSchema).values(instructions);
  });
  res.status(StatusCodes.OK).json({ message: "Recipe created." });
});

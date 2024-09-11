import db from "../db/db.js";
import catchAsync from "../utils/catchAsync.js";
import { RecipeSchema, UserSchema } from "../db/schemas.js";
import { eq } from "drizzle-orm";
import AppError from "../utils/AppError.js";
import { StatusCodes } from "http-status-codes";

export const like = catchAsync(async (req, res) => {
  const { recipeId, userId } = req.body;

  const user = await db
    .select()
    .from(UserSchema)
    .where(eq(UserSchema.id, userId));
  if (!user || user.length === 0) {
    throw new AppError("No User found", StatusCodes.BAD_REQUEST);
  }
  await db.transaction(async (tx) => {});
});

export const unlike = catchAsync(async (req, res) => {});

import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { addRecipe } from "../controllers/recipeController.js";
import { validateData } from "../middlewares/validateData.js";
import { addRecipeScehma } from "../schemas/recipeSchemas.js";
const router = express.Router();

router.post("/addRecipe", isAuth, validateData(addRecipeScehma), addRecipe);

export default router;

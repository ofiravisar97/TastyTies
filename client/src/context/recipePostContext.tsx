import { createContext, useContext } from "react";
import { RecipePostType } from "../types/RecipeSchema";

export const recipePostContext = createContext<RecipePostType | null>(null);

export const useRecipePostContext = () => {
  const context = useContext(recipePostContext);
  if (!context) {
    throw new Error("No recipe found.");
  }
  return context;
};

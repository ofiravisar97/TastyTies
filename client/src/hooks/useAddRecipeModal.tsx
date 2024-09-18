import { Dispatch, SetStateAction, useContext } from "react";
import { AddRecipeModalContext } from "../context/addRecipeModalContext";
import { RecipeSchemaType } from "../types/RecipeSchema";

type AddRecipeContextType = {
  addRecipeStatus: RecipeSchemaType;
  setAddRecipeStatus: Dispatch<SetStateAction<RecipeSchemaType>>;
};

const useAddRecipeModal = () => {
  return useContext(AddRecipeModalContext) as AddRecipeContextType;
};

export default useAddRecipeModal;

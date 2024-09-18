import { createContext, PropsWithChildren, useState } from "react";
import { RecipeSchemaType } from "../types/RecipeSchema";

export const AddRecipeModalContext = createContext({});

export const AddRecipeModalProvider = ({ children }: PropsWithChildren) => {
  const [addRecipeStatus, setAddRecipeStatus] = useState<RecipeSchemaType>();
  return (
    <AddRecipeModalContext.Provider
      value={{ addRecipeStatus, setAddRecipeStatus }}
    >
      {children}
    </AddRecipeModalContext.Provider>
  );
};

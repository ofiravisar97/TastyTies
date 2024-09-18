import { RecipePostType } from "../../../../types/RecipeSchema";
import { recipePostContext } from "../../../../context/recipePostContext";
import { ReactNode } from "react";
import RecipePostHeader from "./RecipePostHeader";
import RecipePostImage from "./RecipePostImage";
import RecipePostButtons from "./RecipePostButtons";
import RecipePostFooter from "./RecipePostFooter";

type RecipePostProps = {
  recipe: RecipePostType;
  header?: ReactNode;
  image?: ReactNode;
  buttons?: ReactNode;
  footer?: ReactNode;
};

const Recipe = ({
  recipe,
  header,
  image,
  footer,
  buttons,
}: RecipePostProps) => {
  return (
    <recipePostContext.Provider value={recipe}>
      <article className="bg-white mt-8 rounded-md shadow-lg flex flex-col sm:w-[90%] md:w-[65%] xl:w-[100%] mx-auto">
        {header}
        {image}
        {buttons}
        {footer}
      </article>
    </recipePostContext.Provider>
  );
};

Recipe.Header = RecipePostHeader;
Recipe.Image = RecipePostImage;
Recipe.Buttons = RecipePostButtons;
Recipe.Footer = RecipePostFooter;

export default Recipe;

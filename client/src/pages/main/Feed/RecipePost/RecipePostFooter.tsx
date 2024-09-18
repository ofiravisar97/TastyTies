import { useRecipePostContext } from "../../../../context/recipePostContext";
import moment from "moment";

const RecipePostFooter = () => {
  const recipe = useRecipePostContext();
  return (
    <div className="flex px-2 py-2 justify-between">
      <p>{recipe.likesCount} Likes</p>
      <p> {moment(recipe.createdAt).fromNow()}</p>
    </div>
  );
};

export default RecipePostFooter;

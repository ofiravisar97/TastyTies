import { useRecipePostContext } from "../../../../context/recipePostContext";

const RecipePostImage = () => {
  const recipe = useRecipePostContext();

  return (
    <img
      loading="lazy"
      src={recipe.imageURL}
      alt="Recipe Image"
      className="object-cover object-center"
    />
  );
};

export default RecipePostImage;

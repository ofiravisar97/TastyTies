import UserAvatar from "../../../../components/UI/UserAvatar";
import { useRecipePostContext } from "../../../../context/recipePostContext";

const RecipePostHeader = () => {
  const recipe = useRecipePostContext();

  return (
    <div className="flex gap-4 items-center p-2">
      <UserAvatar
        src={recipe.avatarURL}
        onClick={() => {}}
        width={40}
        height={40}
      />
      <div className="flex flex-col">
        <h1 className="font-semibold text-md">{recipe.title}</h1>
        <h4 className="text-gray-600 font-semibold">@{recipe.username}</h4>
      </div>
    </div>
  );
};

export default RecipePostHeader;

import { Bookmark01Icon, FavouriteIcon, Message01Icon } from "hugeicons-react";

const RecipePostButtons = () => {
  return (
    <ul className="flex gap-4 px-1 py-3 w-full">
      <li>
        <FavouriteIcon size={36} />
      </li>
      <li>
        <Message01Icon size={36} />
      </li>
      <li className="ml-auto">
        <Bookmark01Icon size={36} />
      </li>
    </ul>
  );
};

export default RecipePostButtons;

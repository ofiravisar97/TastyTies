import {
  AddSquareIcon,
  Bookmark01Icon,
  FavouriteIcon,
  Home11Icon,
} from "hugeicons-react";

const Menu = () => {
  return (
    <div className="flex gap-4">
      <Home11Icon className="size-8 cursor-pointer" />
      <AddSquareIcon className="size-8 cursor-pointer" />
      <FavouriteIcon className="size-8 cursor-pointer" />
      <Bookmark01Icon className="size-8 cursor-pointer" />
    </div>
  );
};

export default Menu;

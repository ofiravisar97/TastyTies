import {
  AddSquareIcon,
  Bookmark01Icon,
  FavouriteIcon,
  Home11Icon,
} from "hugeicons-react";
import UserAvatar from "../../UI/UserAvatar";
import useAuth from "../../../hooks/useAuth";
import ProfileMenu from "./ProfileMenu";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { addRecipeModalContext } from "../../../pages/AppLayout";

const Menu = () => {
  const { auth } = useAuth();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { setAddRecipeModalOpen } = useContext(addRecipeModalContext) as {
    setAddRecipeModalOpen: Dispatch<SetStateAction<boolean>>;
  };

  return (
    <nav className="flex gap-8 h-full items-center">
      <NavLink
        to="/"
        className="h-full flex items-center px-4"
        style={({ isActive }) => {
          return {
            color: isActive ? "#CA054D" : "black",
            borderBottom: isActive ? "2px solid #CA054D" : "none",
          };
        }}
      >
        <Home11Icon className={"size-8 cursor-pointer"} />
      </NavLink>
      <AddSquareIcon
        className="size-8 cursor-pointer"
        onClick={() => setAddRecipeModalOpen(true)}
      />
      <FavouriteIcon className="size-8 cursor-pointer" />
      <Bookmark01Icon className="size-8 cursor-pointer" />
      <div className="relative">
        <UserAvatar
          src={auth?.avatar}
          onClick={() => setProfileOpen(!isProfileOpen)}
          width={40}
          height={40}
        />
        {isProfileOpen && (
          <ProfileMenu
            displayName={auth?.displayName}
            userId={auth?.userId}
            close={() => setProfileOpen(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default Menu;

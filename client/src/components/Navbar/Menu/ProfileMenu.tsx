import { Logout01Icon, UserAccountIcon } from "hugeicons-react";
import useLogout from "../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

type Props = {
  displayName: string;
  userId: string;
  close: () => void;
};

const ProfileMenu = ({ displayName, userId, close }: Props) => {
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <nav className="absolute w-fit bg-white right-[10%] top-[4rem] p-2 space-y-4 rounded-md shadow-md z-5">
      <p className="whitespace-nowrap font-semibold">
        Logged in as @{displayName}
      </p>
      <ul>
        <li
          className="flex gap-2 hover:bg-gray-50 p-2 cursor-pointer"
          onClick={() => {
            navigate(`/profile/${userId}`);
            close();
          }}
        >
          <UserAccountIcon />
          My Profile
        </li>
        <li
          className="flex gap-2 hover:bg-gray-50 p-2 cursor-pointer"
          onClick={logout}
        >
          <Logout01Icon />
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default ProfileMenu;

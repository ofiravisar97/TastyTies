import { useNavigate } from "react-router-dom";
import { UserRowType } from "../../types/userRow";
import UserAvatar from "./UserAvatar";

const UserRow = ({ user }: { user: UserRowType }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-2 items-center h-fit hover:bg-gray-50 p-2 cursor-pointer"
      onClick={() => navigate(`/profile/${user.id}`)}
    >
      <UserAvatar src={user?.avatarUrl} />
      <p className="font-semibold">@{user.displayName}</p>
    </div>
  );
};

export default UserRow;

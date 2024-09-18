import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useProfileData from "../../../hooks/useProfileData";
import EditableUserAvatar from "./EditableUserAvatar";
import UserInfo from "./UserInfo";

const FollowButtonSection = ({
  isMe,
  isFollowing,
}: {
  isMe?: boolean;
  isFollowing?: boolean;
}) => {
  const label = isMe ? "Edit" : isFollowing ? "Unfollow" : "Follow";
  return (
    <div className="w-full flex justify-between items-center text-xl font-semibold p-2 border-b-2 border-borderColor">
      About Me
      <button className="bg-primary p-2 text-white font-semibold rounded-md shadow-md">
        {label}
      </button>
    </div>
  );
};

const UserProfileInfo = ({ id }: { id: string | undefined }) => {
  const { auth } = useAuth();
  const { data: user } = useProfileData({
    connectedUserId: auth.userId,
    userId: id,
  });

  useEffect(() => {
    document.title = `${user?.displayName} | TastyTies`;
  }, [user?.displayName]);

  return (
    <section className=" grid grid-rows-2">
      <section className="flex flex-col items-center space-y-8">
        <div className="w-full h-fit flex">
          <EditableUserAvatar src={user?.avatarUrl} id={id} />
          <UserInfo
            displayName={user?.displayName}
            followersCount={user?.followersCount}
          />
        </div>
        <FollowButtonSection
          isMe={user?.isMe}
          isFollowing={user?.isFollowing}
        />
      </section>
      <section>User Bio</section>
    </section>
  );
};

export default UserProfileInfo;

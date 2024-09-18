import { useParams } from "react-router-dom";
import UserProfileInfo from "./UserProfileInfo";
import ImageGrid from "./ImageGrid";

const Profile = () => {
  const { id } = useParams();
  return (
    <main className="grid grid-cols-1 gap-2 lg:grid-cols-2 p-4 h-[calc(100%-4rem)]">
      <UserProfileInfo id={id} />
      <ImageGrid />
    </main>
  );
};

export default Profile;

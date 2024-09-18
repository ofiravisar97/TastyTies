import { useQuery } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import { UserProfileSchema, UserProfileType } from "../types/UserDataSchema";

type Props = {
  connectedUserId?: string;
  userId?: string;
};

const useProfileData = ({ connectedUserId, userId }: Props) => {
  const axios = useAxiosPrivate();
  const fetchUser = async () => {
    try {
      const user = await axios.post("/getUser", {
        connectedUserId,
        userId,
      });
      await UserProfileSchema.parse(user.data);
      return user.data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery<UserProfileType>(["userData"], {
    queryFn: fetchUser,
    enabled: !!userId && !!connectedUserId,
  });
};

export default useProfileData;

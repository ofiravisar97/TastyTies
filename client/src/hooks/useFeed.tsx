import { useQuery } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useFeed = () => {
  const axios = useAxiosPrivate();
  const fetchFeed = async () => {
    try {
      const response = await axios.get("/feed");
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  return useQuery("feed", fetchFeed);
};

export default useFeed;

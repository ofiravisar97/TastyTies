import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Feed = () => {
  const axios = useAxiosPrivate();
  useEffect(() => {
    const test = async () => {
      await axios.get("/search", { params: { query: "123" } });
    };
    test();
  }, []);
  return <div className="h-[screen-4rem] w-screen">Feed</div>;
};

export default Feed;

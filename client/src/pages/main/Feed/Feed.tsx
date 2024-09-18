import { useEffect } from "react";
import Recipes from "./Recipes";

const Feed = () => {
  useEffect(() => {
    document.title = "TastyTies";
  }, []);

  return (
    <div className="h-[calc(100%-4rem)] w-screen bg-neutral-200 grid-cols-1 grid xl:grid-cols-3">
      <span className="bg-blue-900 hidden xl:block"></span>
      <Recipes />
      <span className="bg-green-600 hidden xl:block"></span>
    </div>
  );
};

export default Feed;

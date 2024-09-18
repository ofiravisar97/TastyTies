import { Virtuoso } from "react-virtuoso";
import useFeed from "../../../hooks/useFeed";
import Recipe from "./RecipePost/Recipe";

const Recipes = () => {
  const { data: feed } = useFeed();

  console.log(feed);

  return (
    <main className=" w-[full]">
      <Virtuoso
        className="h-full"
        data={feed}
        itemContent={(_, recipe) => {
          return (
            <Recipe
              recipe={recipe}
              header={<Recipe.Header />}
              image={<Recipe.Image />}
              buttons={<Recipe.Buttons />}
              footer={<Recipe.Footer />}
            />
          );
        }}
      />
    </main>
  );
};

export default Recipes;

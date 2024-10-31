<template>
  <div></div>
</template>

<script lang="ts" setup>
import type { RecipesData } from "~/types/RecipesType";

const { data, error } = useFetch<RecipesData | null>(
  "https://dummyjson.com/recipes"
);

const recipes = data.value ? data.value.recipes : [];

const { list, containerProps, wrapperProps } = useVirtualList(recipes, {
  itemHeight: 96,
});
</script>

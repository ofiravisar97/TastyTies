<template>
  <section class="flex-grow">
    <UITabsMenu>
      <UITabsItem icon_name="lucide:book" label="Recipes" />
      <UITabsItem icon_name="lucide:bookmark" label="Bookmarks" />
    </UITabsMenu>
    <div class="grid">
      <img v-for="img in data" :src="img.url" />
    </div>
  </section>
</template>

<script lang="ts" setup>
type imageType = {
  url: string;
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
};

const { data, status } = useFetch<imageType>(
  "https://jsonplaceholder.typicode.com/photos",
  { lazy: true }
);
</script>

<template>
  <header class="py-8 flex gap-4">
    <UIAvatar width="160" height="160" />
    <div class=" p-2 gap-4 flex flex-col items-center w-full">
      <strong
        ><h1 class="text-xl">
          <span class="text-primary">@</span>Ofir Avisar
        </h1></strong
      >
      <div class="flex gap-4">
        <UIProfileLabelCount label="Followers" count="5"/>
        <UIProfileLabelCount label="Recipes" count="3"/>
        <UIProfileLabelCount label="Bookmarks" count="10"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { user } = defineProps(["user"]);
</script>

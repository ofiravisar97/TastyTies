<template>
  <main class="flex h-full">
    <section class="w-[40%] bg-green-400 h-full p-2">
      <ProfileHeaderInfo />
    </section>
    <ProfileImageGrid />
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "navbar",
});
</script>

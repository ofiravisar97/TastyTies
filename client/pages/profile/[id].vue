<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "navbar",
});
</script>

<template>
  <main class="flex h-full p-4">
    <section class="w-[40%] h-full p-2">
      <ProfileHeaderInfo />
      <div
        class="border-b-2 py-2 border-neutral-200 flex justify-between items-center"
      >
        <h3 class="font-semibold text-lg">About Me</h3>
        <UIButton variant="primary">Follow</UIButton>
      </div>
    </section>
    <ProfileImageGrid />
  </main>
</template>

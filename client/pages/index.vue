<template>
  <div><Feed /></div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
  layout: "navbar",
});
useHead({
  title: "TastyTies",
});
</script>

<template>
  <header class="py-8 flex gap-4">
    <UIAvatar width="160" height="160" />
    <div>
      <strong
        ><h1 class="text-xl">
          <span class="text-primary">@</span>Ofir Avisar
        </h1></strong
      >
    </div>
  </header>
</template>

<script lang="ts" setup>
const { user } = defineProps(["user"]);
</script>

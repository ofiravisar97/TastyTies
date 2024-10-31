<template>
  <li class="cursor-pointer p-2 flex gap-2">
    <Icon :name="iconName" size="28" />
    <slot />
  </li>
</template>

<script lang="ts" setup>
const { iconName } = defineProps(["iconName"]);
</script>

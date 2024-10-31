<template>
  <li
    class="flex items-center justify-center gap-2 py-2 cursor-pointer border-b-2 border-neutral-300 flex-grow"
  >
    <Icon :name="icon_name" size="32" />
    <p>{{ label }}</p>
  </li>
</template>

<script lang="ts" setup>
const { icon_name, label } = defineProps(["icon_name", "label"]);
</script>

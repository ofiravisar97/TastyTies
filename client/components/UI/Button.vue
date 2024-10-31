<template>
  <button
    class="bg-primary text-white font-semibold rounded-md shadow-md p-2 w-[100%] flex items-center justify-center gap-2"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
type Props = {
  variant: "outline" | "primary";
};

defineProps<Props>();
</script>

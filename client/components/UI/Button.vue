<template>
  <button :class="button({ variant })">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { cva, type VariantProps } from "class-variance-authority";

const { variant } = defineProps(["variant"]);

const button = cva(["p-2 font-semibold rounded-md"], {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      outline: "bg-white text-primary border-2 border-primary",
    },
  },
});
</script>

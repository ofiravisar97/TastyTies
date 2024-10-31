<template>
  <nuxt-img
    placeholder="/images/user.png"
    :placeholder-class="clickable ? 'cursor-pointer' : 'cursor-default'"
    alt="User avatar profile image"
  />
</template>

<script lang="ts" setup>
const { clickable } = defineProps(["clickable"]);
</script>

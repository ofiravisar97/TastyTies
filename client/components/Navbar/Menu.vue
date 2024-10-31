<template>
  <ul class="flex gap-4 items-center h-full w-fit">
    <NavbarMenuItem icon-name="lucide:home" />
    <NavbarMenuItem icon-name="lucide:square-plus" />
    <NavbarMenuItem icon-name="lucide:bookmark" />
    <NavbarMenuItem icon-name="lucide:heart" />
    <UIAvatar width="40" height="40" clickable="true" @click="handleClick" />
    <Transition mode="default" name="pop">
      <NavbarProfileMenu v-if="isMenuOpen" />
    </Transition>
  </ul>
</template>

<script lang="ts" setup>
let isMenuOpen = ref(false);

function handleClick() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style scoped>
.pop-enter-to,
.pop-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s ease;
}
</style>

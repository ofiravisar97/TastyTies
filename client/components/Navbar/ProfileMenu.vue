<template>
  <li
    class="h-fit bg-white border border-neutral-300 shadow-md right-20 rounded-md w-[15%] absolute top-[5rem]"
  >
    <ul>
      <li class="flex items-center p-2 justify-center">
        <p>
          Logged in as
          <strong
            ><span class="text-primary">@</span
            >{{ authStore.user?.displayName }}</strong
          >
        </p>
      </li>
      <NavbarMenuItem icon-name="lucide:circle-user" @click="handleProfileClick"
        >My Profile</NavbarMenuItem
      >
      <NavbarMenuItem @click="handleLogout" icon-name="lucide:log-out"
        >Logout</NavbarMenuItem
      >
    </ul>
  </li>
</template>

<script lang="ts" setup>
const authStore = useAuthStore();
const { handleLogout } = useAuthActions();
function handleProfileClick() {
  navigateTo(`/profile/${authStore.user?.id}`);
}
</script>

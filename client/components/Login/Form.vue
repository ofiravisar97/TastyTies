<template>
  <form
    class="bg-white w-[90%] lg:w-[35%] min-h-fit rounded-md shadow-md px-4 py-8 space-y-4"
    @submit.prevent="handleLoginSubmit"
  >
    <header class="mb-8">
      <h1>
        <strong>Login</strong>
      </h1>
      <h4>Login to your account.</h4>
    </header>
    <UIFormInput label="Email" placeholder="Email" v-model="formData.email" />
    <UIFormInput
      label="Password"
      placeholder="Password"
      type="password"
      v-model="formData.password"
    />
    <UIButton variant="primary">
      <Icon
        v-show="isLoading"
        name="svg-spinners:tadpole"
        style="color: white"
      />
      Login</UIButton
    >
    <div class="w-full flex justify-center items-center">
      <NuxtLink to="/register" class="hover:underline"
        >Not a member yet?
        <strong class="text-primary">Register.</strong></NuxtLink
      >
    </div>
  </form>
</template>

<script lang="ts" setup>
import { toast } from "vue3-toastify";
const { handleLogin } = useAuthActions();

const formData = reactive({
  email: "",
  password: "",
});

let isLoading = ref(false);

async function handleLoginSubmit() {
  isLoading.value = true;
  handleLogin(formData.email, formData.password);
  isLoading.value = false;
}
</script>

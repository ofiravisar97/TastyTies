<template>
  <form
    class="bg-white w-[90%] lg:w-[35%] min-h-fit rounded-md shadow-md px-4 py-8 space-y-4"
    @submit.prevent="handleSubmit"
  >
    <header class="mb-8">
      <h1>
        <strong>Register</strong>
      </h1>
      <h4>Create your account.</h4>
    </header>
    <UIFormInput
      label="Display Name"
      placeholder="Display Name"
      v-model="formData.displayName"
    />
    <UIFormInput label="Email" placeholder="Email" v-model="formData.email" />
    <UIFormInput
      label="Password"
      placeholder="Password"
      type="password"
      v-model="formData.password"
    />
    <UIFormInput
      label="Password Confirm"
      placeholder="Password Confirm"
      type="password"
      v-model="formData.password_confirmation"
    />
    <UIButton variant="primary">
      <Icon
        v-show="isLoading"
        name="svg-spinners:tadpole"
        style="color: white"
      />
      Register</UIButton
    >
    <div class="w-full flex justify-center items-center">
      <NuxtLink to="/login" class="hover:underline"
        >Already a member?
        <strong class="text-primary">Login.</strong></NuxtLink
      >
    </div>
  </form>
</template>

<script lang="ts" setup>
let isLoading = ref(false);
const { handleRegister } = useAuthActions();

const formData = reactive({
  email: "",
  password: "",
  displayName: "",
  password_confirmation: "",
});

function handleSubmit() {
  isLoading.value = true;

  handleRegister(
    formData.displayName,
    formData.email,
    formData.password,
    formData.password_confirmation
  );

  isLoading.value = false;
}
</script>

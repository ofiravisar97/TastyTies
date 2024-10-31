type UserResponseType = {
  avatarURL: string | null;
  created_at: Date;
  displayName: string;
  email: string;
  email_verified_at: Date | string;
  id: string;
  updated_at: Date;
};

export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = useCookie("Token");
  const authStore = useAuthStore();
  const { privateApi } = useAPI();

  if (authStore.user?.id != "") {
    return;
  }

  if (!cookie.value) {
    return navigateTo("/login");
  } else {
    privateApi<UserResponseType>("/user")
      .then((res) => {
        const user: userData = {
          email: res.email,
          displayName: res.displayName,
          id: res.id,
          avatarURL: res.avatarURL,
        };
        authStore.setUser(user);
      })
      .catch((err) => {
        console.log(err);
        navigateTo("/login");
      });
  }
});

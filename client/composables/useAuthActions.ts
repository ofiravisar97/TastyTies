import { toast } from "vue3-toastify";

type AuthResponse = {
  access_token: string;
  user: userData;
  message: string;
};

export const useAuthActions = () => {
  const { api } = useAPI();
  const authStore = useAuthStore();

  async function handleLogin(email: string, password: string) {
    try {
      // Validation
      const response: AuthResponse = await api("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const token = useCookie("Token");
      token.value = response.access_token;
      authStore.setUser(response.user);
      toast.success("User successfully logged in");
      navigateTo("/");
    } catch (err) {
      console.log(err);
      toast.error(err);
    }
  }

  const handleRegister = async (
    displayName: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response: AuthResponse = await api("/register", {
        method: "POST",
        body: JSON.stringify({
          displayName,
          email,
          password,
          password_confirmation,
        }),
      });
      toast.success("User successfully signed in");
      const token = useCookie("Token");
      token.value = response.access_token;
      authStore.setUser(response.user);
      navigateTo("/");
    } catch (err) {
      console.log(err);
    }
  };

  function handleLogout() {
    authStore.setUser(null);
    const token = useCookie("Token");
    token.value = null;
    navigateTo("/login");
  }

  return { handleLogin, handleLogout, handleRegister };
};

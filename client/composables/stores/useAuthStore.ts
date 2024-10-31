import { defineStore } from "pinia";

export type userData = {
  email: string;
  displayName: string;
  avatarURL: string | null;
  id: string;
};

export default defineStore("auth", {
  state: () => {
    const user: userData = {
      email: "",
      id: "",
      displayName: "",
      avatarURL: null,
    };
    return { user: user } as { user: userData | null };
  },
  actions: {
    setUser(user: userData | null) {
      this.user = user;
    },
  },
});

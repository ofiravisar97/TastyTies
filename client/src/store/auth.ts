import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

// Define SetState manually
type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set: SetState<AuthState>) => ({
  accessToken: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  logout: async () => {
    await SecureStore.deleteItemAsync("refreshToken");
    set({ accessToken: null });
  },
}));

export default useAuthStore;

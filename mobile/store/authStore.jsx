import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: "Samuel",
  token: null,
  loading: false,

  register: async (username, email, password) => {
    set({ loading: true });
    const API_URL = "http://192.168.0.117:3001/api/auth/register";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        isLoggedIn: true,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      set({ loading: false });
      console.error("Error during signup:", error.message);
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    const API_URL = "http://192.168.0.117:3001/api/auth/login";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        isLoggedIn: true,
        loading: false,
      });

      return { success: true };
    } catch (error) {
      set({ loading: false });
      console.error("Error during login:", error.message);
      return { success: false, message: error.message };
    }
  },


}));

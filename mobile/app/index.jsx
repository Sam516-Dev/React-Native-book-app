import { Link, router } from "expo-router";
import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

export default function Index() {
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [user]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <View>
          <Text style={{ marginBottom: 20 }}>
            Welcome back, {user.username}!
          </Text>
          <Link href="/HomeScreen">Go to Home</Link>
        </View>
      ) : (
        <View>
          <Link href="/(auth)" style={{ marginBottom: 20 }}>
            Login
          </Link>
          <Link href="/(auth)/signup">Signup</Link>
        </View>
      )}
    </View>
  );
}

import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Link href="/(auth)"> Login</Link>
        <Link href="/(auth)/signup"> signup</Link>
      </View>
    </View>
  );
}

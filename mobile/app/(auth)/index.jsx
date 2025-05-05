import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/login.styles";
import myPic from "../../assets/images/reading.png";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    console.log("Logging in with:", email, password);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      console.log("Login successful!");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image style={styles.illustrationImage} source={myPic} />
      </View>

      <View style={styles.card}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={24}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                style={styles.input}
                onChange={(e) => setEmail(e.target.value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={showPassword}
                style={styles.input}
                onChange={(e) => setPassword(e.target.value)}
                autoCapitalize="none"
              />
              <TouchableOpacity>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  onPress={() => setShowPassword(!showPassword)}
                  size={24}
                  color={COLORS.primary}
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

{
  /* <View>
            <Text style={styles.subtitle}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              style={styles.label}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity> */
}

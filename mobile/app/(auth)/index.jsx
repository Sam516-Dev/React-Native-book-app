import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../../assets/styles/login.styles";
import myPic from "../../assets/images/reading.png";
import emailIcon from "../../assets/images/mail.png"; 

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
        <View>
          <Text style={styles.subtitle}>Email</Text>
          <View>
            <Image source={emailIcon} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              style={styles.label}
            />
          </View>
        </View>

        <View>
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

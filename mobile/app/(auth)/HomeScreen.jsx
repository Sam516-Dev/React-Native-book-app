import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/authStore";

const HomeScreen = () => {
  const { logout, user, checkAuth } = useAuthStore();



  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: user?.profileImage }}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Hello, <Text style={styles.username}>{user?.username}</Text> 👋</Text>
        <Text style={styles.email}>📧 {user?.email}</Text>
      </View>

      <Text style={styles.header}>Welcome to My App</Text>
      <Text style={styles.subText}>This is the home page</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f4",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    width: "90%",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#4a90e2",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  username: {
    color: "#4a90e2",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

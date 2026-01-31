import { Stack, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Signin from "@/app/(auth)/signin";

export default function HomeLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F2F2F2" },
        headerTintColor: "#0A0A0A",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="sitter" options={{ headerShown: false }} />
      <Stack.Screen name="owner" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

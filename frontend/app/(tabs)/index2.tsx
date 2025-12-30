import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function Index() {
  async function clearAuthData() {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      // You can delete other keys similarly
      await SecureStore.deleteItemAsync("firstname");
      await SecureStore.deleteItemAsync("lastname");
      await SecureStore.deleteItemAsync("email");
      console.log("Auth data cleared");
      router.push("/(auth)/signin");
    } catch (error) {
      console.error("Failed to clear auth data:", error);
    }
  }

  return (
    <SafeAreaView className="home-auth flex-1 ">
      <View className="flex flex-col flex-1 w-full p-10 items-center">
        <Text className="text-[#0A0A0A] text-5xl self-start">Welcome</Text>
        <Image
          source={require("../../assets/images/heroImage.png")}
          alt="logo"
          className="w-full h-64 mt-12"
          resizeMode="contain"
        />
        <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
          Homepage 2
        </Text>
        <TouchableOpacity onPress={clearAuthData}>
          <Text>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

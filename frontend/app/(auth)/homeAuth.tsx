import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { backendPath } from "@/config/backConfig";

const HomeAuth = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const fname: string | null = await SecureStore.getItemAsync("firstname");
      setName(fname as string);
    };
    getName();
  }, []);
  return (
    <SafeAreaView className="home-auth flex-1">
      <View className="flex flex-col flex-1 w-full p-10 items-center">
        <Text className="text-[#0A0A0A] text-5xl self-start">Hi, {name}</Text>
        <Image
          source={require("../../assets/images/heroImage.png")}
          alt="logo"
          className="w-full h-64 mt-12"
          resizeMode="contain"
        />
        <Text className="text-[#0A0A0A] text-lg mt-5 font-bold">
          Continue as
        </Text>
        <TouchableOpacity
          className="w-[75%] bg-[#3944D5] h-16 rounded-full flex flex-row items-center justify-center my-5"
          onPress={async () => {
            try {
              const accessToken = await SecureStore.getItemAsync("accessToken");
              const res = await axios.post(
                `${backendPath}/auth/switch-role`,
                { role: "OWNER" },
                { headers: { Authorization: `Bearer ${accessToken}` } }
              );
              await SecureStore.setItemAsync("accessToken", res.data.accessToken);
              await SecureStore.setItemAsync("role", "owner");
              router.push("/(tabs)/(home)");
            } catch (error) {
              Alert.alert("Error", "Failed to switch role. Please try again.");
            }
          }}
        >
          <Image
            source={require("../../assets/icons/house-filled.png")}
            alt="logo"
            className="w-6 h-6 mr-3"
          />
          <Text className="text-white text-lg font-bold">Pet Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[75%] bg-[#0F1998] h-16 rounded-full flex flex-row items-center justify-center"
          onPress={async () => {
            try {
              const accessToken = await SecureStore.getItemAsync("accessToken");
              const res = await axios.post(
                `${backendPath}/auth/switch-role`,
                { role: "SITTER" },
                { headers: { Authorization: `Bearer ${accessToken}` } }
              );
              await SecureStore.setItemAsync("accessToken", res.data.accessToken);
              await SecureStore.setItemAsync("role", "sitter");
              router.push("/(tabs)/(home)");
            } catch (error) {
              Alert.alert("Error", "Failed to switch role. Please try again.");
            }
          }}
        >
          <Image
            source={require("../../assets/icons/paw.png")}
            alt="logo"
            className="w-6 h-6 mr-3"
          />
          <Text className="text-white text-lg font-bold">Pet Sitter</Text>
        </TouchableOpacity>

        <View className="flex-grow" />

        <View className="flex flex-col items-center justify-center">
          <Text className="text-text-gray-600 text-sm">Need help?</Text>
          <Link href={"/(auth)/contactPage"}>
            <Text className="text-[#0A0A0A] text-lg font-bold">Contact us</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeAuth;

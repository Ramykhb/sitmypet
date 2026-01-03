import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import {backendPath} from "@/config/backConfig";
import api from "@/config/api";

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
            await SecureStore.setItemAsync("role", "owner");
            try {
                await api.post(`/auth/switch-role`, {
                    role: "OWNER"
                })
            } catch (error) {
                console.error(error);
            }
            router.push("/(tabs)/(home)");
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
            await SecureStore.setItemAsync("role", "sitter");
              // try {
              //     await api.post(`/auth/switch-role`, {
              //         role: "SITTER"
              //     })
              // } catch (error) {
              //     console.error(error);
              // }
            router.push("/(tabs)/(home)");
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
